import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ThemeSettings from '@/models/ThemeSettings';
import { requireAdmin } from '@/utils/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    let themeSettings = await ThemeSettings.findOne({ isActive: true });

    // Create default theme settings if none exist
    if (!themeSettings) {
      themeSettings = new ThemeSettings({
        primaryColor: '#2D1B4E',
        secondaryColor: '#FEF0F8',
        accentColor: '#C2185B',
        roseColor: '#E91E8C',
        burgundyColor: '#880E4F',
        champagneColor: '#F8BBD9',
        ivoryColor: '#FFF5FA',
        buttonColor: '#C2185B',
        isActive: true
      });
      await themeSettings.save();
    } else {
      // Auto-migrate old gold/warm-brown colors to new pink/purple palette
      const migrations: Record<string, string> = {
        '#C9A96E': '#C2185B', '#B8925A': '#A0154D', '#EDD9A3': '#F8BBD9',
        '#f59e0b': '#C2185B', '#1f2937': '#2D1B4E', '#1C1410': '#2D1B4E',
        '#FDF6EE': '#FEF0F8', '#FFFCF5': '#FFF5FA', '#C0737A': '#E91E8C',
        '#7B2D42': '#880E4F', '#F2D7D5': '#FCE4EC', '#f3f4f6': '#FEF0F8',
      };
      let changed = false;
      for (const [old, next] of Object.entries(migrations)) {
        if (themeSettings.primaryColor === old)   { themeSettings.primaryColor = next;   changed = true; }
        if (themeSettings.secondaryColor === old)  { themeSettings.secondaryColor = next;  changed = true; }
        if (themeSettings.accentColor === old)     { themeSettings.accentColor = next;     changed = true; }
        if (themeSettings.roseColor === old)       { themeSettings.roseColor = next;       changed = true; }
        if (themeSettings.burgundyColor === old)   { themeSettings.burgundyColor = next;   changed = true; }
        if (themeSettings.champagneColor === old)  { themeSettings.champagneColor = next;  changed = true; }
        if (themeSettings.ivoryColor === old)      { themeSettings.ivoryColor = next;      changed = true; }
        if (themeSettings.buttonColor === old)     { themeSettings.buttonColor = next;     changed = true; }
      }
      if (changed) await themeSettings.save();
    }

    return NextResponse.json(themeSettings);
  } catch (error) {
    console.error('Error fetching theme settings:', error);
    return NextResponse.json({ error: 'Failed to fetch theme settings' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const denied = requireAdmin(request);
    if (denied) return denied;
    await connectDB();
    const body = await request.json();
    
    let themeSettings = await ThemeSettings.findOne({ isActive: true });
    
    if (!themeSettings) {
      themeSettings = new ThemeSettings({
        ...body,
        isActive: true
      });
    } else {
      Object.assign(themeSettings, body);
    }
    
    await themeSettings.save();
    return NextResponse.json(themeSettings);
  } catch (error) {
    console.error('Error updating theme settings:', error);
    return NextResponse.json({ error: 'Failed to update theme settings' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const denied = requireAdmin(request);
    if (denied) return denied;
    await connectDB();
    const { action } = await request.json();
    
    if (action === 'reset') {
      let themeSettings = await ThemeSettings.findOne({ isActive: true });
      
      if (!themeSettings) {
        themeSettings = new ThemeSettings();
      } else {
        themeSettings.primaryColor = '#2D1B4E';
        themeSettings.secondaryColor = '#FEF0F8';
        themeSettings.accentColor = '#C2185B';
        themeSettings.roseColor = '#E91E8C';
        themeSettings.burgundyColor = '#880E4F';
        themeSettings.champagneColor = '#F8BBD9';
        themeSettings.ivoryColor = '#FFF5FA';
        themeSettings.buttonColor = '#C2185B';
      }
      
      await themeSettings.save();
      return NextResponse.json(themeSettings);
    }
    
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Error resetting theme settings:', error);
    return NextResponse.json({ error: 'Failed to reset theme settings' }, { status: 500 });
  }
}