import mongoose from 'mongoose';
import { projectsData } from '../data/projectsData.js';

const projectSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  categoryTag: { type: String },
  tags: [String],
  description: { type: String, required: true },
  longDescription: { type: String },
  client: { type: String },
  year: { type: String },
  link: { type: String },
  youtubeId: { type: String },
  youtubeUrl: { type: String },
  image: { type: String },
  featured: { type: Boolean, default: false },
  isExternal: { type: Boolean, default: false },
  isMockup: { type: Boolean, default: false },
  highlights: [String],
  createdAt: { type: Date, default: Date.now }
});

let ProjectModel;
try {
  ProjectModel = mongoose.model('Project', projectSchema);
} catch (e) {
  ProjectModel = mongoose.model('Project');
}

export async function fetchProjects(filterCategory = 'All') {
  const isMongoConnected = mongoose.connection.readyState === 1;

  if (isMongoConnected) {
    const query = filterCategory && filterCategory !== 'All' ? { category: filterCategory } : {};
    return await ProjectModel.find(query);
  } else {
    // Return seeded projects data directly
    if (!filterCategory || filterCategory === 'All') {
      return projectsData;
    }
    return projectsData.filter(p => p.category.toLowerCase() === filterCategory.toLowerCase());
  }
}

export async function fetchProjectById(id) {
  const isMongoConnected = mongoose.connection.readyState === 1;

  if (isMongoConnected) {
    return await ProjectModel.findOne({ id });
  } else {
    return projectsData.find(p => p.id === id) || null;
  }
}

export default ProjectModel;

