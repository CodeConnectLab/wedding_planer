import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Slider from '@/models/Slider';
import { verifyToken, wantsAdminView } from '@/utils/auth';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const query = wantsAdminView(request) ? {} : { isActive: { $ne: false } };
    const sliders = await Slider.find(query).sort({ order: 1, createdAt: 1 });
    return NextResponse.json(sliders);
  } catch (error) {
    console.error('Error fetching sliders:', error);
    return NextResponse.json({ error: 'Failed to fetch sliders' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const data = await request.json();
    const slider = await Slider.create(data);
    
    return NextResponse.json(slider, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create slider' }, { status: 500 });
  }
}
