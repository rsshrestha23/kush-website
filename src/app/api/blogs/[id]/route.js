import { NextResponse } from 'next/server';
import clientPromise from '../../../../../lib/mongodb';
import { verifyToken, createSlug } from '../../../../../lib/auth';
import { ObjectId } from 'mongodb';

// GET - Fetch single blog by ID or slug
export async function GET(
  request,
  { params }
) {
  try {
    const client = await clientPromise;
    const db = client.db('kushtechnepal');
    const blogsCollection = db.collection('blogs');

    let blog;

    // Check if it's an ObjectId
    if (ObjectId.isValid(params.id)) {
      blog = await blogsCollection.findOne({
        _id: new ObjectId(params.id),
        published: true
      });
    } else {
      // Treat as slug
      blog = await blogsCollection.findOne({
        slug: params.id,
        published: true
      });
    }

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error('Fetch blog error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update blog (admin only)
export async function PUT(
  request,
  { params }
) {
  try {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const blogData = await request.json();

    if (!blogData.title || !blogData.content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('kushtechnepal');
    const blogsCollection = db.collection('blogs');

    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { error: 'Invalid blog ID' },
        { status: 400 }
      );
    }

    const existingBlog = await blogsCollection.findOne({
      _id: new ObjectId(params.id)
    });

    if (!existingBlog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    // Check if new slug conflicts with other blogs
    const newSlug = createSlug(blogData.title);
    if (newSlug !== existingBlog.slug) {
      const slugConflict = await blogsCollection.findOne({
        slug: newSlug,
        _id: { $ne: new ObjectId(params.id) }
      });

      if (slugConflict) {
        return NextResponse.json(
          { error: 'A blog with this title already exists' },
          { status: 400 }
        );
      }
    }

    const updateData = {
      ...blogData,
      slug: newSlug,
      publishedAt: blogData.published && !existingBlog.published ? new Date() : existingBlog.publishedAt,
      updatedAt: new Date(),
    };

    // Remove _id from updateData to avoid MongoDB immutable field error
    const { _id, ...updateDataWithoutId } = updateData;

    const result = await blogsCollection.updateOne(
      { _id: new ObjectId(params.id) },
      { $set: updateDataWithoutId }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: 'Blog updated successfully',
        blog: { ...updateData, _id: params.id }
      }
    );
  } catch (error) {
    console.error('Update blog error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete blog (admin only)
export async function DELETE(
  request,
  { params }
) {
  try {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { error: 'Invalid blog ID' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('kushtechnepal');
    const blogsCollection = db.collection('blogs');

    const result = await blogsCollection.deleteOne({
      _id: new ObjectId(params.id)
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Blog deleted successfully' }
    );
  } catch (error) {
    console.error('Delete blog error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 