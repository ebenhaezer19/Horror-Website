import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { path: directoryPath } = await request.json();
    
    // Remove leading slash and create full path
    const fullPath = path.join(process.cwd(), 'public', directoryPath.replace(/^\//, ''));
    
    console.log('Creating directory at:', fullPath);

    // Create directory if it doesn't exist
    if (!fs.existsSync(fullPath)) {
      console.log('Directory does not exist, creating...');
      fs.mkdirSync(fullPath, { recursive: true });
      console.log('Directory created successfully');
    } else {
      console.log('Directory already exists');
    }

    return NextResponse.json({ 
      success: true,
      path: fullPath
    });
  } catch (error) {
    console.error('Error creating directory:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create directory',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
} 