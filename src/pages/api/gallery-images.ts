import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

type ImageData = {
  id: number;
  filename: string;
  path: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ images: ImageData[] }>
) {
  try {

    const publicDir = path.join(process.cwd(), 'public');
    const galleryDir = path.join(publicDir, 'galleryShowcase');
    

    const files = fs.readdirSync(galleryDir);
    
    const imageFiles = files
      .filter(file => 
        /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
      )
      .map((filename, index) => ({
        id: index + 1,
        filename,
        path: `/galleryShowcase/${filename}`
      }));
    
    res.status(200).json({ images: imageFiles });
  } catch (error) {
    console.error('Error reading gallery directory:', error);
    res.status(500).json({ images: [] });
  }
} 