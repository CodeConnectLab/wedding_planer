// Shared option lists used by the mongoose models and the admin forms.

export const BLOG_CATEGORIES = [
  'Planning Tips',
  'Décor & Design',
  'Destination Weddings',
  'Bridal Beauty & Fashion',
  'Rituals & Traditions',
  'Real Weddings',
] as const;

export const VIDEO_CATEGORIES = [
  'Wedding Films',
  'Highlights',
  'Pre-Wedding',
  'Couple Testimonials',
  'Behind the Scenes',
] as const;

export const TESTIMONIAL_SERVICE_TYPES = [
  'All',
  'Full Wedding Planning',
  'Destination Wedding',
  'Wedding Décor',
  'Photography & Film',
  'Mehndi & Sangeet',
  'Corporate Event',
] as const;

export const SERVICE_CATEGORIES = ['wedding', 'event'] as const;

export const FAQ_CATEGORIES = ['General', 'Services', 'Pricing', 'Process', 'Support'] as const;

export const BUDGET_RANGES = [
  'Under ₹10 Lakhs',
  '₹10–25 Lakhs',
  '₹25–50 Lakhs',
  '₹50 Lakhs–1 Crore',
  '₹1 Crore+',
  'Let us suggest',
] as const;
