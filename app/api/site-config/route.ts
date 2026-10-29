import { NextResponse } from 'next/server';
import { getServices, getSiteSettings } from '@/lib/data';
import { serviceHref, type NavService } from '@/lib/siteDefaults';

export const dynamic = 'force-dynamic';

// Everything the shared chrome (navbar, footer, WhatsApp button, contact page) needs in one call.
export async function GET() {
  const [settings, services] = await Promise.all([getSiteSettings(), getServices()]);

  const navServices: NavService[] = services.map((s: any) => ({
    title: s.title,
    href: serviceHref(s),
    icon: s.icon || '💍',
    category: s.category === 'event' ? 'event' : 'wedding',
  }));

  return NextResponse.json(
    { settings, services: navServices },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}
