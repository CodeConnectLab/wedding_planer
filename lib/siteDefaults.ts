// Fallback values used until the admin-managed site settings load (or if the DB is unreachable).

export interface SiteLink {
  label: string;
  href: string;
}

export interface SiteSettings {
  companyName: string;
  companyDescription: string;
  logo: string;
  phone: string;
  email: string;
  address: string;
  facebookUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  youtubeUrl: string;
  pinterestUrl: string;
  whatsappNumber: string;
  copyrightText: string;
  weddingsTitle: string;
  weddingLinks: SiteLink[];
  eventsTitle: string;
  eventLinks: SiteLink[];
}

export interface NavService {
  title: string;
  href: string;
  icon: string;
  category: 'wedding' | 'event';
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  companyName: 'WAH Momentz',
  companyDescription:
    "India's premier luxury wedding planning studio. We craft bespoke celebrations that honour your love story — from intimate ceremonies to grand royal weddings.",
  logo: '/logo.svg',
  phone: '+91 98911 06761',
  email: 'wahmomentz@gmail.com',
  address: 'H5-16, Sector 11, Rohini\nNew Delhi — 110085',
  facebookUrl: 'https://facebook.com/wahmomentz',
  instagramUrl: 'https://instagram.com/wahmomentz',
  linkedinUrl: '',
  youtubeUrl: '',
  pinterestUrl: '',
  whatsappNumber: '919891106761',
  copyrightText: 'WAH Momentz. All Rights Reserved.',
  weddingsTitle: 'Weddings',
  weddingLinks: [
    { label: 'Destination Weddings', href: '/destination-weddings' },
    { label: 'Wedding Décor', href: '/services/wedding-decor' },
    { label: 'Photography & Film', href: '/services/photography' },
    { label: 'Mehndi & Beauty', href: '/services/mehndi' },
    { label: 'Bachelor Party', href: '/bachelor-party' },
    { label: 'Honeymoon Packages', href: '/services/honeymoon' },
  ],
  eventsTitle: 'Events',
  eventLinks: [
    { label: 'Corporate Events', href: '/services/corporate-events' },
    { label: 'Award Nights', href: '/services/award-nights' },
    { label: 'Fashion Shows', href: '/services/fashion-shows' },
    { label: 'Conference & Expo', href: '/services/conference' },
  ],
};

export const DEFAULT_NAV_SERVICES: NavService[] = [
  { title: 'Destination Weddings', href: '/destination-weddings', icon: '✈️', category: 'wedding' },
  { title: 'Wedding Décor', href: '/services/wedding-decor', icon: '🌸', category: 'wedding' },
  { title: 'Photography & Film', href: '/services/photography', icon: '📸', category: 'wedding' },
  { title: 'Mehndi & Beauty', href: '/services/mehndi', icon: '🌿', category: 'wedding' },
  { title: 'Catering', href: '/services/catering', icon: '🍽️', category: 'wedding' },
  { title: 'Entertainment', href: '/services/entertainment', icon: '🎵', category: 'wedding' },
  { title: 'Venue Management', href: '/services/venue-management', icon: '🏛️', category: 'wedding' },
  { title: 'Invitation Design', href: '/services/invitations', icon: '✉️', category: 'wedding' },
  { title: 'Bachelor Party', href: '/bachelor-party', icon: '🥂', category: 'wedding' },
  { title: 'Honeymoon Packages', href: '/services/honeymoon', icon: '🌅', category: 'wedding' },
  { title: 'Anniversary Party', href: '/services/anniversary', icon: '💍', category: 'wedding' },
  { title: 'Corporate Events', href: '/services/corporate-events', icon: '🎯', category: 'event' },
  { title: 'Fashion Shows', href: '/services/fashion-shows', icon: '👗', category: 'event' },
  { title: 'Award Nights', href: '/services/award-nights', icon: '🏆', category: 'event' },
  { title: 'Conference & Expo', href: '/services/conference', icon: '📊', category: 'event' },
];

/** Link target for a service card: explicit href wins, otherwise /services/<slug>. */
export function serviceHref(service: { href?: string; slug?: string }): string {
  if (service.href) return service.href;
  return service.slug ? `/services/${service.slug}` : '/services';
}

/** Strips everything but digits so a display phone can be used in tel: links. */
function intlDigits(phone: string): string {
  const digits = phone.replace(/\D/g, '').replace(/^0+/, '');
  // Bare 10-digit Indian mobile numbers get the +91 country code.
  return digits.length === 10 ? `91${digits}` : digits;
}

export function telHref(phone: string): string {
  return `tel:+${intlDigits(phone)}`;
}

export function whatsappHref(number: string, text?: string): string {
  return `https://wa.me/${intlDigits(number)}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
}

/** Merge a stored settings document over the defaults, ignoring empty values. */
export function mergeSiteSettings(stored: Partial<SiteSettings> | null | undefined): SiteSettings {
  const s = { ...DEFAULT_SITE_SETTINGS };
  if (!stored) return s;
  for (const key of Object.keys(s) as (keyof SiteSettings)[]) {
    const v = stored[key];
    if (Array.isArray(v) ? v.length > 0 : v !== undefined && v !== null && v !== '') {
      (s as any)[key] = v;
    }
  }
  // Social links may be intentionally cleared by the admin.
  for (const key of ['facebookUrl', 'instagramUrl', 'linkedinUrl', 'youtubeUrl', 'pinterestUrl'] as const) {
    if (stored[key] !== undefined) s[key] = stored[key] || '';
  }
  if (s.logo === '/logo.png') s.logo = '/logo.svg';
  return s;
}
