import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';
import { requireAdmin, wantsAdminView } from '@/utils/auth';
import { slugify } from '@/utils/slugify';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const services = await Service.find(wantsAdminView(request) ? {} : { isActive: true }).sort({ order: 1, createdAt: -1 });
    return NextResponse.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const denied = requireAdmin(request);
    if (denied) return denied;
    await connectDB();
    const body = await request.json();
    body.slug = slugify(body.slug || body.title || '');
    const service = new Service(body);
    await service.save();
    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error('Error creating service:', error);
    if ((error as any)?.code === 11000) {
      return NextResponse.json({ error: 'A service with this slug already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}