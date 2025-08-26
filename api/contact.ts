import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, institution, inquiry, message } = req.body;
    
    // In a real application, you would send an email or store the message
    console.log('Contact form submission:', { name, email, institution, inquiry, message });
    
    res.json({ message: 'Thank you for your message! I will get back to you soon.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send message' });
  }
}