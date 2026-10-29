import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ProcessStep from '@/models/ProcessStep';
import { requireAdmin, wantsAdminView } from '@/utils/auth';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const processSteps = await ProcessStep.find(wantsAdminView(request) ? {} : { isActive: true }).sort({ order: 1, stepNumber: 1 });
    return NextResponse.json(processSteps);
  } catch (error) {
    console.error('Error fetching process steps:', error);
    return NextResponse.json({ error: 'Failed to fetch process steps' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const denied = requireAdmin(request);
    if (denied) return denied;
    await connectDB();
    const body = await request.json();
    const processStep = new ProcessStep(body);
    await processStep.save();
    return NextResponse.json(processStep, { status: 201 });
  } catch (error) {
    console.error('Error creating process step:', error);
    return NextResponse.json({ error: 'Failed to create process step' }, { status: 500 });
  }
}