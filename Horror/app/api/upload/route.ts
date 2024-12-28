import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const gallery = formData.get('gallery') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const timestamp = Date.now();
    const filename = `superai-image-${timestamp}${path.extname(file.name)}`;
    
    // Create the full path
    const relativePath = `/images/gallery/${gallery}/${filename}`;
    const fullPath = path.join(process.cwd(), 'public', relativePath.replace(/^\//, ''));

    // Write the file
    await writeFile(fullPath, buffer);

    return NextResponse.json({ 
      success: true,
      path: relativePath
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}; 