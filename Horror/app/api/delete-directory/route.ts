import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { path: directoryPath } = await request.json();
    
    // Get the full path by joining with process.cwd()
    const fullPath = path.join(process.cwd(), directoryPath);
    
    console.log('Attempting to delete directory at:', fullPath);
    
    if (fs.existsSync(fullPath)) {
      fs.rmSync(fullPath, { recursive: true, force: true });
      return NextResponse.json({ 
        success: true, 
        message: `Successfully deleted directory at ${fullPath}` 
      });
    } else {
      console.log('Directory not found at:', fullPath);
      return NextResponse.json({ 
        error: 'Directory does not exist',
        path: fullPath 
      }, { 
        status: 404 
      });
    }
  } catch (error) {
    console.error('Error deleting directory:', error);
    return NextResponse.json({ 
      error: 'Failed to delete directory', 
      details: error instanceof Error ? error.message : String(error) 
    }, { 
      status: 500 
    });
  }
} 