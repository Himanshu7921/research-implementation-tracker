import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../../server/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { id } = req.query;
    if (typeof id !== 'string') {
      return res.status(400).json({ message: 'Invalid paper ID' });
    }

    const paper = await storage.getResearchPaper(id);
    if (!paper) {
      return res.status(404).json({ message: 'Research paper not found' });
    }

    // Increment views
    await storage.updateResearchPaperViews(id);
    res.json(paper);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch research paper' });
  }
}