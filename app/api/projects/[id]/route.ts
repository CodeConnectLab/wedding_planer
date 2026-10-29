import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import '@/models/Category';
import { requireAdmin } from '@/utils/auth';
import { slugify } from '@/utils/slugify';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const project = await Project.findById(params.id).populate('category');
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const denied = requireAdmin(request);
    if (denied) return denied;

    await dbConnect();
    const data = await request.json();

    if (data.title) {
      let slug = slugify(data.title);
      const clash = await Project.findOne({ slug, _id: { $ne: params.id } });
      if (clash) slug = `${slug}-${Date.now()}`;
      data.slug = slug;
    }

    const project = await Project.findByIdAndUpdate(params.id, data, { new: true, runValidators: true });
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error: any) {
    console.error('Failed to update project:', error);
    return NextResponse.json({ error: 'Failed to update project', details: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const denied = requireAdmin(request);
    if (denied) return denied;

    await dbConnect();
    const project = await Project.findByIdAndDelete(params.id);
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
