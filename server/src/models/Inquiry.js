import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STORAGE_FILE = path.join(__dirname, '../../inquiries.json');

// Mongoose Schema
const inquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true
  },
  projectType: {
    type: String,
    required: true,
    enum: [
      'UI/UX Design',
      'Web Design & Development',
      'WordPress Solutions',
      'Video Editing',
      'Full Digital Package',
      'Other'
    ],
    default: 'Web Design & Development'
  },
  budget: {
    type: String,
    default: 'Flexible'
  },
  timeline: {
    type: String,
    default: 'Within 1 month'
  },
  message: {
    type: String,
    required: [true, 'Message is required']
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'in_progress', 'completed'],
    default: 'new'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

let InquiryModel;
try {
  InquiryModel = mongoose.model('Inquiry', inquirySchema);
} catch (e) {
  InquiryModel = mongoose.model('Inquiry');
}

// Resilient helper to save inquiry whether Mongo is online or fallback
export async function saveInquiry(data) {
  const isMongoConnected = mongoose.connection.readyState === 1;

  if (isMongoConnected) {
    const inquiry = new InquiryModel(data);
    return await inquiry.save();
  } else {
    // Resilient local file fallback
    const record = {
      _id: 'inq_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
      ...data,
      status: 'new',
      createdAt: new Date().toISOString()
    };

    let existing = [];
    if (fs.existsSync(STORAGE_FILE)) {
      try {
        existing = JSON.parse(fs.readFileSync(STORAGE_FILE, 'utf8'));
      } catch (err) {
        existing = [];
      }
    }
    existing.unshift(record);
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(existing, null, 2), 'utf8');
    return record;
  }
}

export async function getInquiries() {
  const isMongoConnected = mongoose.connection.readyState === 1;

  if (isMongoConnected) {
    return await InquiryModel.find().sort({ createdAt: -1 });
  } else {
    if (fs.existsSync(STORAGE_FILE)) {
      try {
        return JSON.parse(fs.readFileSync(STORAGE_FILE, 'utf8'));
      } catch (err) {
        return [];
      }
    }
    return [];
  }
}

export default InquiryModel;

