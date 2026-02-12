import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import { verifyToken, createSlug } from '../../../lib/auth';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('kushtechnepal');
    const blogsCollection = db.collection('blogs');

    const blogs = await blogsCollection
      .find({ published: true })
      .sort({ publishedAt: -1 })
      .toArray();

    const formattedBlogs = blogs.map(blog => ({
      ...blog,
      _id: blog._id.toString(),
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
      publishedAt: blog.publishedAt
    }));

    return NextResponse.json(formattedBlogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    // Verify admin authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid authentication token' },
        { status: 401 }
      );
    }

    const blogData = await request.json();

    // Validate required fields
    if (!blogData.title || !blogData.content || !blogData.author) {
      return NextResponse.json(
        { error: 'Title, content, and author are required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('kushtechnepal');
    const blogsCollection = db.collection('blogs');

    // Generate slug from title
    const slug = createSlug(blogData.title);

    // Check if slug already exists
    const existingBlog = await blogsCollection.findOne({ slug });
    if (existingBlog) {
      return NextResponse.json(
        { error: 'A blog with this title already exists. Please use a different title.' },
        { status: 400 }
      );
    }

    // Prepare blog document
    const now = new Date();
    const newBlog = {
      title: blogData.title.trim(),
      slug,
      content: blogData.content,
      excerpt: blogData.excerpt?.trim() || '',
      featuredImage: blogData.featuredImage || null,
      author: blogData.author.trim(),
      tags: Array.isArray(blogData.tags) ? blogData.tags.filter(tag => tag.trim()) : [],
      published: Boolean(blogData.published),
      publishedAt: blogData.published ? now : null,
      createdAt: now,
      updatedAt: now,
    };

    // Insert blog into database
    const result = await blogsCollection.insertOne(newBlog);

    return NextResponse.json(
      {
        message: 'Blog created successfully',
        blogId: result.insertedId.toString(),
        slug: slug,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Blog creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 