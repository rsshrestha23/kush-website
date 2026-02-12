import { NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';
import { verifyToken } from '../../../../lib/auth';
import { cookies } from 'next/headers';

export async function GET(request) {
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

    const client = await clientPromise;
    const db = client.db('kushtechnepal');
    const contactsCollection = db.collection('contacts');

    // Get query parameters for pagination and filtering
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const filter = searchParams.get('filter') || 'all'; // all, read, unread
    const search = searchParams.get('search') || '';

    // Build query object
    // Build query object
    let query = {};

    if (filter === 'read') {
      query.isRead = true;
    } else if (filter === 'unread') {
      query.isRead = false;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ];
    }

    // Get total count for pagination
    const totalContacts = await contactsCollection.countDocuments(query);
    const totalPages = Math.ceil(totalContacts / limit);

    // Get contacts with pagination
    const contacts = await contactsCollection
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    // Format contacts
    const formattedContacts = contacts.map(contact => ({
      ...contact,
      _id: contact._id.toString(),
    }));

    // Get statistics
    const stats = {
      total: await contactsCollection.countDocuments(),
      unread: await contactsCollection.countDocuments({ isRead: false }),
      read: await contactsCollection.countDocuments({ isRead: true }),
    };

    return NextResponse.json({
      contacts: formattedContacts,
      pagination: {
        currentPage: page,
        totalPages,
        totalContacts,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      stats,
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 