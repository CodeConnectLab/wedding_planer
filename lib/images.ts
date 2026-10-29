import siteImages from './site-images.json';

// Curated Indian-wedding photography hosted on Cloudinary (see scripts/upload-site-images.js).
export type SiteImageKey = keyof typeof siteImages;

/** Cloudinary URL for a curated site image, capped at `width` pixels. */
export function img(key: SiteImageKey, width = 1600): string {
  return siteImages[key].replace('/upload/', `/upload/c_limit,w_${width},q_auto/`);
}

// Default hero + gallery photography per service slug, used when the admin hasn't set images.
export const SERVICE_IMAGES: Record<string, { hero: SiteImageKey; gallery: SiteImageKey[] }> = {
  'destination-weddings': { hero: 'venue-udaipur-palace', gallery: ['venue-lake-palace-night', 'venue-jal-mahal', 'venue-kerala', 'venue-goa'] },
  'wedding-decor': { hero: 'hero-grand-decor', gallery: ['decor-floral-stage', 'decor-chandelier-lawn', 'decor-aisle', 'decor-mehndi-setup'] },
  photography: { hero: 'couple-celebration', gallery: ['couple-river', 'bride-portrait', 'couple-woods', 'couple-varmala'] },
  catering: { hero: 'catering-thalis', gallery: ['catering-thali', 'catering-platter', 'catering-cuisines', 'catering-silver-thali'] },
  mehndi: { hero: 'mehndi-closeup', gallery: ['mehndi-couple-hands', 'mehndi-marigold', 'mehndi-arm', 'haldi-bride'] },
  entertainment: { hero: 'sangeet-ladies', gallery: ['baraat-dance', 'couple-varmala', 'baraat-carriage', 'punjabi-groomsmen'] },
  'venue-management': { hero: 'venue-lake-palace', gallery: ['decor-reception-canopy', 'decor-outdoor-setup', 'venue-udaipur-golden', 'ritual-ballroom'] },
  invitations: { hero: 'invitation-suite', gallery: ['invitation-cards', 'decor-attire-florals', 'marigolds', 'decor-marigold-garlands'] },
  honeymoon: { hero: 'honeymoon-beach', gallery: ['honeymoon-sunset', 'honeymoon-maldives', 'venue-kerala-river', 'venue-goa-sunset'] },
  anniversary: { hero: 'anniversary-dinner', gallery: ['anniversary-table', 'couple-embrace', 'party-toast', 'decor-hanging'] },
  bachelorette: { hero: 'party-sparklers', gallery: ['party-sparklers-beach', 'party-toast', 'party-confetti', 'venue-goa'] },
  'bachelor-party': { hero: 'party-sparklers-beach', gallery: ['party-sparklers', 'party-toast', 'party-confetti', 'venue-goa'] },
  'corporate-events': { hero: 'event-corporate', gallery: ['event-corporate-stage', 'event-gala', 'event-conference', 'event-expo'] },
  'fashion-shows': { hero: 'event-fashion', gallery: ['event-fashion-runway', 'bride-golden', 'decor-attire-florals', 'event-corporate-stage'] },
  'award-nights': { hero: 'event-gala', gallery: ['event-awards', 'event-gala-dinner', 'event-corporate-stage', 'party-toast'] },
  conference: { hero: 'event-conference-panel', gallery: ['event-conference', 'event-expo', 'event-corporate', 'event-gala-dinner'] },
};

/** Card/hero image for a service: admin-uploaded image first, curated default second. */
export function serviceImage(service: { image?: string; slug?: string }, width = 1200): string {
  if (service.image) return service.image;
  const preset = service.slug ? SERVICE_IMAGES[service.slug] : undefined;
  return img(preset?.hero ?? 'hero-mandap', width);
}
