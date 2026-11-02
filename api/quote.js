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
    const { serviceType, scope, urgency, email, name, notes } = req.body || {};

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

    // Save to Atlas if configured
    if (process.env.MONGODB_URI && email && email.includes('@')) {
      try {
        const mongoose = await import('mongoose');
        if (mongoose.default.connection.readyState === 0) {
          await mongoose.default.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 2000
          });
        }
        const collection = mongoose.default.connection.collection('inquiries');
        await collection.insertOne({
          name: name || 'Quote Request User',
          email,
          projectType: serviceType || 'General Quote',
          budget: `$${baseEstimate}`,
          timeline: durationEstimate,
          notes: notes || '',
          createdAt: new Date().toISOString()
        });
      } catch (err) {}
    }

    return res.status(200).json({
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
    return res.status(500).json({ success: false, error: error.message });
  }
}
