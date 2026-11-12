import express from 'express';
import { fetchProjects, fetchProjectById } from '../models/Project.js';
import { saveInquiry, getInquiries } from '../models/Inquiry.js';
import { servicesData, studioStats, studioValues } from '../data/servicesData.js';

const router = express.Router();

// Health Check
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Shivera Portfolio API'
  });
});

// Projects
router.get('/projects', async (req, res) => {
  try {
    const { category } = req.query;
    const projects = await fetchProjects(category);
    res.json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/projects/:id', async (req, res) => {
  try {
    const project = await fetchProjectById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Services & Studio Stats
router.get('/services', (req, res) => {
  res.json({
    success: true,
    data: servicesData
  });
});

router.get('/studio-meta', (req, res) => {
  res.json({
    success: true,
    stats: studioStats,
    values: studioValues
  });
});

// Submit Contact Inquiry
router.post('/contact', async (req, res) => {
  try {
    const { name, email, projectType, budget, timeline, message } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, error: 'Please enter your name.' });
    }
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, error: 'Please provide a valid email address.' });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, error: 'Please include a message describing your project.' });
    }

    const saved = await saveInquiry({
      name: name.trim(),
      email: email.trim(),
      projectType: projectType || 'Web Design & Development',
      budget: budget || 'Flexible',
      timeline: timeline || 'Within 1 month',
      message: message.trim()
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received. We will get back to you within 24 hours.',
      data: saved
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Quote Calculator & Request
router.post('/quote', async (req, res) => {
  try {
    const { serviceType, scope, pagesOrDuration, urgency, email, name, notes } = req.body;

    let baseEstimate = 450;
    let durationEstimate = "2 weeks";

    if (serviceType === 'UI/UX Design') {
      baseEstimate = (scope === 'Large' ? 950 : scope === 'Medium' ? 650 : 450);
      durationEstimate = (scope === 'Large' ? '3 weeks' : '1-2 weeks');
    } else if (serviceType === 'Web Design & Development') {
      baseEstimate = (scope === 'Large' ? 1400 : scope === 'Medium' ? 900 : 650);
      durationEstimate = (scope === 'Large' ? '3-4 weeks' : '2 weeks');
    } else if (serviceType === 'WordPress Solutions') {
      baseEstimate = (scope === 'Large' ? 850 : scope === 'Medium' ? 600 : 400);
      durationEstimate = (scope === 'Large' ? '2-3 weeks' : '1-2 weeks');
    } else if (serviceType === 'Video Editing') {
      baseEstimate = (scope === 'Large' ? 450 : scope === 'Medium' ? 250 : 150);
      durationEstimate = (urgency === 'Rush' ? '24-48 hours' : '3-5 days');
    }

    // Optional save if contact details supplied
    if (email && email.includes('@')) {
      await saveInquiry({
        name: name || 'Quote Request User',
        email: email,
        projectType: serviceType,
        budget: `$${baseEstimate}`,
        timeline: durationEstimate,
        message: `Automated Quote Request. Scope: ${scope}. Details: ${notes || 'None'}. Urgency: ${urgency || 'Normal'}.`
      });
    }

    res.json({
      success: true,
      estimate: {
        estimatedCost: baseEstimate,
        currency: 'USD',
        estimatedTurnaround: durationEstimate,
        serviceType,
        scope
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// List Inquiries (for portfolio owner / dashboard)
router.get('/inquiries', async (req, res) => {
  try {
    const inquiries = await getInquiries();
    res.json({
      success: true,
      count: inquiries.length,
      data: inquiries
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;

