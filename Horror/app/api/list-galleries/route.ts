import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const galleryPath = path.join(process.cwd(), 'public', 'images', 'gallery');
    
    // Check if directory exists
    if (!fs.existsSync(galleryPath)) {
      return NextResponse.json({ error: 'Gallery directory not found' }, { status: 404 });
    }

    // Get all directories in the gallery folder
    const galleries = fs.readdirSync(galleryPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    return NextResponse.json(galleries);
  } catch (error) {
    console.error('Error listing galleries:', error);
    return NextResponse.json(
      { error: 'Failed to list galleries', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 