import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ContactFormData } from '@/types/blog';

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('kushtechnepal');
    const contactsCollection = db.collection('contacts');

    const contactData = {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone?.trim() || null,
      company: body.company?.trim() || null,
      service: body.service || null,
      message: body.message.trim(),
      isRead: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await contactsCollection.insertOne(contactData);

    return NextResponse.json(
      { 
        message: 'Contact form submitted successfully',
        contactId: result.insertedId.toString()
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 