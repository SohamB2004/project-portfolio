import { fallbackProjects } from '../src/data/portfolioData.js';

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { category } = req.query || {};
  let list = fallbackProjects;

  if (category && category !== 'All') {
    list = fallbackProjects.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  return res.status(200).json({
    success: true,
    count: list.length,
    data: list
  });
}

