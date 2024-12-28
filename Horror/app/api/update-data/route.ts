import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { gallery, artwork } = await request.json();
    
    // Path to data.ts file
    const dataFilePath = path.join(process.cwd(), 'lib', 'data.ts');
    
    // Read current data.ts content
    let content = fs.readFileSync(dataFilePath, 'utf-8');

    // Find the artworks array closing bracket
    const artworksEndIndex = content.indexOf('];');
    if (artworksEndIndex === -1) {
      throw new Error('Could not find artworks array in data.ts');
    }

    // Check if we need to add a comma (if there are existing entries)
    const needsComma = content.slice(0, artworksEndIndex).trim().endsWith('}');
    
    // Add new artwork to artworks array with proper formatting
    const artworkString = `${needsComma ? ',' : ''}\n  {
    title: "${artwork.title}",
    description: "${artwork.description}",
    image: "${artwork.image}",
    iconName: "${artwork.iconName}",
    category: "${artwork.category}",
    link: "${artwork.link}"
  }`;

    // Insert new artwork before the closing bracket
    content = content.slice(0, artworksEndIndex) + artworkString + content.slice(artworksEndIndex);

    // Write updated content back to file
    fs.writeFileSync(dataFilePath, content, 'utf-8');

    return NextResponse.json({ 
      success: true,
      message: 'Data file updated successfully'
    });
  } catch (error) {
    console.error('Error updating data file:', error);
    return NextResponse.json(
      { 
        error: 'Failed to update data file',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
} 