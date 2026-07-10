import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import FooterSettings from '@/models/FooterSettings';

export async function GET() {
  try {
    await connectDB();
    let footerSettings = await FooterSettings.findOne();
    
    if (!footerSettings) {
      footerSettings = new FooterSettings({});
      await footerSettings.save();
    }

    // Auto-migrate stale values
    let changed = false;
    if (footerSettings.logo === '/logo.png') { footerSettings.logo = '/logo.svg'; changed = true; }
    if (footerSettings.phone === '+91 97111 48175' || footerSettings.phone === '97111 48175') {
      footerSettings.phone = '+91 98911 06761'; changed = true;
    }
    if (footerSettings.email === 'hello@wahmomentz.com') {
      footerSettings.email = 'wahmomentz@gmail.com'; changed = true;
    }
    if (footerSettings.whatsappNumber === '919711148175' || footerSettings.whatsappNumber === '9711148175') {
      footerSettings.whatsappNumber = '919891106761'; changed = true;
    }
    if (footerSettings.address && footerSettings.address.includes('South Delhi')) {
      footerSettings.address = 'H5-16, Sector 11, Rohini\nNew Delhi — 110085'; changed = true;
    }
    if (changed) await footerSettings.save();

    return NextResponse.json(footerSettings);
  } catch (error) {
    console.error('Error fetching footer settings:', error);
    return NextResponse.json({ error: 'Failed to fetch footer settings' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    let footerSettings = await FooterSettings.findOne();
    
    if (!footerSettings) {
      footerSettings = new FooterSettings(body);
    } else {
      Object.assign(footerSettings, body);
    }
    
    await footerSettings.save();
    return NextResponse.json(footerSettings);
  } catch (error) {
    console.error('Error updating footer settings:', error);
    return NextResponse.json({ error: 'Failed to update footer settings' }, { status: 500 });
  }
}