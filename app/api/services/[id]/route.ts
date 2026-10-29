import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';
import { requireAdmin } from '@/utils/auth';
import { slugify } from '@/utils/slugify';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const service = await Service.findById(params.id);
    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }
    return NextResponse.json(service);
  } catch (error) {
    console.error('Error fetching service:', error);
    return NextResponse.json({ error: 'Failed to fetch service' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const denied = requireAdmin(request);
    if (denied) return denied;
    await connectDB();
    const body = await request.json();
    if (body.slug !== undefined || body.title) body.slug = slugify(body.slug || body.title);
    const service = await Service.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }
    return NextResponse.json(service);
  } catch (error) {
    console.error('Error updating service:', error);
    if ((error as any)?.code === 11000) {
      return NextResponse.json({ error: 'A service with this slug already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const denied = requireAdmin(request);
    if (denied) return denied;
    await connectDB();
    const service = await Service.findByIdAndDelete(params.id);
    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const denied = requireAdmin(request);
    if (denied) return denied;
    await connectDB();
    const body = await request.json();
    
    // Handle reordering
    if (body.hasOwnProperty('order')) {
      const service = await Service.findByIdAndUpdate(
        params.id, 
        { order: body.order }, 
        { new: true }
      );
      if (!service) {
        return NextResponse.json({ error: 'Service not found' }, { status: 404 });
      }
      return NextResponse.json(service);
    }
    
    // Handle other partial updates
    const service = await Service.findByIdAndUpdate(params.id, body, { new: true });
    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }
    return NextResponse.json(service);
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}