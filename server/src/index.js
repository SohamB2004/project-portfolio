import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import apiRouter from './routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/genui_portfolio';

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger for visibility
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// Middleware to ensure DB connection before handling request (for both serverless and standard server)
let isConnecting = false;
app.use(async (req, res, next) => {
  if (mongoose.connection.readyState === 0 && !isConnecting && process.env.MONGODB_URI) {
    isConnecting = true;
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 2500
      });
      console.log('✅ Connected to MongoDB Atlas successfully.');
    } catch (err) {
      console.log('ℹ️ MongoDB not available, continuing with fallback mode:', err.message);
    } finally {
      isConnecting = false;
    }
  }
  next();
});

// API Routes
app.use('/api', apiRouter);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Shivera Digital Studio API',
    endpoints: {
      health: '/api/health',
      projects: '/api/projects',
      services: '/api/services',
      studioMeta: '/api/studio-meta',
      contact: 'POST /api/contact',
      quote: 'POST /api/quote',
      inquiries: '/api/inquiries'
    }
  });
});

// Start standalone listener when running locally or on Render
if (!process.env.VERCEL) {
  async function startServer() {
    try {
      console.log('Attempting MongoDB connection...');
      await mongoose.connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 2000
      });
      console.log('✅ Connected to MongoDB successfully.');
    } catch (err) {
      console.log('ℹ️ Local MongoDB server not reachable (' + err.message + ').');
      console.log('⚡ Server running seamlessly in resilient fallback mode.');
    }

    app.listen(PORT, () => {
      console.log(`🚀 Shivera Portfolio Server listening on http://localhost:${PORT}`);
    });
  }
  startServer();
}

export default app;
