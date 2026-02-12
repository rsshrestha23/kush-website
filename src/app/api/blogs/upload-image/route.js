import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { verifyToken } from '../../../../lib/auth';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    // Verify admin authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (!token) {
      return NextResponse.json({ error: { message: 'Authentication required' } }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: { message: 'Invalid authentication token' } }, { status: 401 });
    }

    const data = await request.formData();
    const file = data.get('upload');

    if (!file) {
      return NextResponse.json({
        error: { message: 'No file uploaded.' }
      }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({
        error: { message: 'Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.' }
      }, { status: 400 });
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({
        error: { message: 'File size too large. Maximum size is 5MB.' }
      }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure uploads directory exists
    const uploadsDir = join(process.cwd(), 'public/uploads');
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // Create a unique filename with proper extension
    const fileExtension = file.name.split('.').pop() || 'jpg';
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExtension}`;
    const path = join(uploadsDir, filename);

    await writeFile(path, buffer);
    console.log(`File saved to ${path}`);

    // Return response in CKEditor 5 expected format
    return NextResponse.json({
      url: `/uploads/${filename}`,
      // Additional metadata for CKEditor
      width: undefined, // CKEditor will determine this
      height: undefined, // CKEditor will determine this
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({
      error: { message: 'Failed to upload file.' }
    }, { status: 500 });
  }
} 