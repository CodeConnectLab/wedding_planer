import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Contact from '@/models/Contact';
import { requireAdmin } from '@/utils/auth';

const clean = (v: unknown, max = 2000) => (typeof v === 'string' ? v.trim().slice(0, max) : undefined);

export async function GET(request: NextRequest) {
  try {
    const denied = requireAdmin(request);
    if (denied) return denied;

    await dbConnect();
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json(contacts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const name = clean(data.name, 200)?.replace(/^&\s*|\s*&$/g, '').trim();
    const phone = clean(data.phone, 30);
    const email = clean(data.email, 200);

    // Validate required fields
    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 });
    }
    if (phone.replace(/\D/g, '').length < 7) {
      return NextResponse.json({ error: 'Please enter a valid phone number' }, { status: 400 });
    }

    // Validate email if provided
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
      }
    }

    await dbConnect();
    const contact = await Contact.create({
      name,
      phone,
      email: email || undefined,
      service: clean(data.service, 200) || undefined,
      subService: clean(data.subService, 200) || undefined,
      message: clean(data.message) || undefined,
      weddingDate: clean(data.weddingDate, 40) || undefined,
      venue: clean(data.venue, 200) || undefined,
      guestCount: clean(String(data.guestCount ?? ''), 20) || undefined,
      budget: clean(data.budget, 100) || undefined,
    });
    return NextResponse.json({ success: true, id: contact._id }, { status: 201 });
  } catch (error) {
    console.error('Failed to create contact:', error);
    return NextResponse.json({ error: 'Failed to send your enquiry. Please try again.' }, { status: 500 });
  }
}
