export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { name, email, projectType, budget, message } = req.body || {};

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, error: 'Please enter your name.' });
    }
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, error: 'Please provide a valid email.' });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, error: 'Please enter a message.' });
    }

    const inquiryRecord = {
      id: 'inq_' + Date.now(),
      name: name.trim(),
      email: email.trim(),
      projectType: projectType || 'Web Design & Development',
      budget: budget || 'Flexible',
      message: message.trim(),
      createdAt: new Date().toISOString()
    };

    // If MongoDB Atlas connection string is provided in Vercel environment variables:
    if (process.env.MONGODB_URI) {
      try {
        const mongoose = await import('mongoose');
        if (mongoose.default.connection.readyState === 0) {
          await mongoose.default.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 2000
          });
        }
        const collection = mongoose.default.connection.collection('inquiries');
        await collection.insertOne(inquiryRecord);
        console.log('Saved inquiry to MongoDB Atlas');
      } catch (dbErr) {
        console.log('MongoDB Atlas insert notice:', dbErr.message);
      }
    }

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received. We will get back to you within 24 hours.',
      data: inquiryRecord
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

