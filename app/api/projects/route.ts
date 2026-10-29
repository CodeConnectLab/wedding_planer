import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import '@/models/Category';
import { requireAdmin, wantsAdminView } from '@/utils/auth';
import { slugify } from '@/utils/slugify';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const query = wantsAdminView(request) ? {} : { isPublished: { $ne: false } };
    const projects = await Project.find(query).populate('category').sort({ isFeatured: -1, createdAt: -1 });
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const denied = requireAdmin(request);
    if (denied) return denied;

    await dbConnect();
    const data = await request.json();

    let slug = slugify(data.title);

    // Check if slug already exists and make it unique
    const existingProject = await Project.findOne({ slug });
    if (existingProject) {
      slug = `${slug}-${Date.now()}`;
    }

    const project = await Project.create({ ...data, slug });
    return NextResponse.json(project, { status: 201 });
  } catch (error: any) {
    console.error('Failed to create project:', error);
    return NextResponse.json(
      { error: 'Failed to create project', details: error.message },
      { status: error.name === 'ValidationError' ? 400 : 500 }
    );
  }
}
