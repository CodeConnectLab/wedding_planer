import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

interface ServiceDetail {
  slug: string;
  title: string;
  subtitle: string;
  heroTagline: string;
  description: string;
  heroImage: string;
  features: string[];
  process: { step: string; title: string; desc: string }[];
  packages: { name: string; price: string; features: string[] }[];
  gallery: string[];
  relatedServices: { slug: string; label: string }[];
  metaTitle: string;
  metaDescription: string;
}

const services: Record<string, ServiceDetail> = {
  'wedding-decor': {
    slug: 'wedding-decor',
    title: 'Wedding Décor',
    subtitle: 'Where Visions Become Reality',
    heroTagline: 'Transforming venues into breathtaking dreamscapes — each detail chosen with intention.',
    description: 'Our wedding décor philosophy begins with your story. Whether you dream of opulent floral canopies dripping with roses, minimalist ivory elegance, or a Rajasthani-inspired riot of colour, our décor team translates your vision into a living, breathing environment. We handle everything — from entrance arches and mandap design to centrepieces, lighting, drapery, and the final finishing touches that make a venue unmistakably yours.',
    heroImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1400&h=800&fit=crop',
    features: [
      'Full venue décor concept and mood boarding',
      'Floral design — fresh, dried, and silk arrangements',
      'Mandap and ceremony space design',
      'Lighting design: ambient, fairy lights, chandeliers',
      'Table centrepieces and linen selection',
      'Entrance and photo booth installations',
      'Ceiling drapery and canopy structures',
      'Post-event clear-up and venue restoration',
    ],
    process: [
      { step: '01', title: 'Vision Consultation', desc: 'We meet to understand your aesthetic, colour preferences, cultural style, and venue — then develop a mood board.' },
      { step: '02', title: 'Design Proposal', desc: 'Our team presents a detailed visual proposal with sample florals, fabric swatches, and 3D renders of key spaces.' },
      { step: '03', title: 'Vendor Coordination', desc: 'We liaise with florists, lighting specialists, and fabricators to source, produce, and deliver every element.' },
      { step: '04', title: 'Setup & Styling', desc: 'On the day, our on-ground team sets up, styles, and inspects every detail — your only job is to arrive and be amazed.' },
    ],
    packages: [
      { name: 'Essentials', price: '₹2.5L+', features: ['Ceremony décor', 'Entrance arch', 'Mandap styling', 'Basic centrepieces', 'Day-of styling team'] },
      { name: 'Signature', price: '₹5L+', features: ['Full ceremony + reception décor', 'Floral design', 'Ambient lighting', 'Photo booth', 'Bridal suite styling', 'Full on-day team'] },
      { name: 'Royal', price: 'Custom', features: ['All Signature inclusions', '3D venue visualisation', 'Custom fabrication', 'Ceiling installations', 'International florals', 'Multiple event spaces'] },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop',
    ],
    relatedServices: [
      { slug: 'venue-management', label: 'Venue Management' },
      { slug: 'photography', label: 'Photography & Film' },
      { slug: 'catering', label: 'Catering' },
    ],
    metaTitle: 'Wedding Décor Services — Royal Affairs Wedding Planners',
    metaDescription: 'Breathtaking wedding décor from mandap design to floral installations. Royal Affairs transforms venues into unforgettable dreamscapes.',
  },

  'photography': {
    slug: 'photography',
    title: 'Photography & Film',
    subtitle: 'Moments Preserved Forever',
    heroTagline: 'Cinematic storytelling that captures the emotion, movement, and poetry of your day.',
    description: 'Your wedding day unfolds in a series of irreplaceable moments — the catch of breath as the doors open, the laughter-soaked chaos of the baraat, the stillness of a vow exchanged. Our photography and cinematography partners are masters of capturing what words cannot. From editorial-style couple portraits to emotional documentary coverage, every frame is composed with artistic intention and technical excellence.',
    heroImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1400&h=800&fit=crop',
    features: [
      'Pre-wedding engagement shoots',
      'Full wedding day documentary coverage',
      'Editorial couple portraits',
      'Drone aerial footage',
      'Cinematic highlight film (3–5 minutes)',
      'Full-length ceremony film',
      'Same-day edit for reception screening',
      'Premium album design and printing',
    ],
    process: [
      { step: '01', title: 'Creative Brief', desc: 'We discuss your preferred aesthetic — from moody and editorial to bright and joyful — and match you with photographers whose style resonates.' },
      { step: '02', title: 'Pre-Wedding Shoot', desc: 'An engagement shoot helps you get comfortable in front of the camera and build rapport with your photographers before the big day.' },
      { step: '03', title: 'Wedding Day Coverage', desc: 'Your dedicated photography and film team follows the natural story of your day — candid, quiet, dramatic — capturing it all without direction.' },
      { step: '04', title: 'Delivery & Albums', desc: 'Edited gallery delivered within 4–6 weeks. Cinematic film within 8 weeks. Premium flush-mount albums available to order.' },
    ],
    packages: [
      { name: 'Story', price: '₹1.5L+', features: ['1 photographer', '8 hours coverage', 'Online gallery', '500+ edited images', 'Highlight reel'] },
      { name: 'Cinema', price: '₹3L+', features: ['2 photographers', '1 videographer', 'Full day coverage', 'Drone footage', 'Highlight film', 'Full ceremony film', 'Pre-wedding shoot'] },
      { name: 'Heirloom', price: 'Custom', features: ['Lead photographer + 2 associates', 'Full film team', 'All events coverage', 'Same-day edit', 'Premium album', 'International travel possible'] },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=600&h=400&fit=crop',
    ],
    relatedServices: [
      { slug: 'wedding-decor', label: 'Wedding Décor' },
      { slug: 'destination-weddings', label: 'Destination Weddings' },
      { slug: 'entertainment', label: 'Entertainment' },
    ],
    metaTitle: 'Wedding Photography & Cinematography — Royal Affairs',
    metaDescription: 'Cinematic wedding photography and film by India\'s finest storytellers. Pre-wedding shoots, editorial portraits, full-day coverage and premium albums.',
  },

  'catering': {
    slug: 'catering',
    title: 'Catering & Cuisine',
    subtitle: 'A Feast for Every Sense',
    heroTagline: 'Curated menus that celebrate culinary heritage and delight every guest.',
    description: 'Food is at the heart of every great Indian celebration — a reflection of family, region, and generosity. Our catering partners include India\'s finest caterers across pan-Indian, Mughlai, South Indian, Continental, and fusion cuisine, as well as specialist chefs for dietary requirements. We design menus that balance tradition with innovation, presentation with abundance, and flavour with flair.',
    heroImage: 'https://images.unsplash.com/photo-1528495612343-9ca9f4a4de28?w=1400&h=800&fit=crop',
    features: [
      'Bespoke menu design for each event',
      'Live cooking stations (chaat, kebab, pasta, dessert)',
      'Traditional regional cuisine specialists',
      'Continental, fusion, and international cuisine',
      'Jain, vegan, gluten-free, and allergy-aware menus',
      'Beverage service and mocktail counters',
      'Elegant presentation and crockery styling',
      'Professional service staff',
    ],
    process: [
      { step: '01', title: 'Menu Consultation', desc: 'We explore your culinary preferences, regional specialities, dietary requirements, and the style of service you envision.' },
      { step: '02', title: 'Tasting Session', desc: 'A private tasting event where you and your family sample proposed menu items and provide feedback before finalising.' },
      { step: '03', title: 'Vendor Coordination', desc: 'We manage all logistics — kitchen planning, vendor agreements, service timelines, and allergen management.' },
      { step: '04', title: 'Event Execution', desc: 'Our catering managers oversee setup, live stations, service, and quality throughout every moment of your event.' },
    ],
    packages: [
      { name: 'Classic', price: '₹800–₹1,200/plate', features: ['Indian cuisine', 'Buffet service', '2 live stations', 'Soft beverages', 'Service staff'] },
      { name: 'Grand', price: '₹1,500–₹2,500/plate', features: ['Pan-Indian + Continental', 'Plated + buffet', '4 live stations', 'Mocktail counter', 'Dessert display', 'Premium crockery'] },
      { name: 'Royal', price: 'Custom', features: ['Multi-cuisine', 'Celebrity chef option', 'Custom live stations', 'Beverage service', 'International menu items', 'Complete F&B management'] },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1528495612343-9ca9f4a4de28?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop',
    ],
    relatedServices: [
      { slug: 'venue-management', label: 'Venue Management' },
      { slug: 'wedding-decor', label: 'Wedding Décor' },
      { slug: 'entertainment', label: 'Entertainment' },
    ],
    metaTitle: 'Wedding Catering Services — Royal Affairs Wedding Planners',
    metaDescription: 'Exceptional wedding catering — from traditional Indian feasts to modern fusion menus. Curated dining experiences for every celebration.',
  },

  'mehndi': {
    slug: 'mehndi',
    title: 'Mehndi & Beauty',
    subtitle: 'The Art of the Bride',
    heroTagline: 'Intricate artistry that tells your story through every line and bloom.',
    description: 'The Mehndi ceremony is one of the most intimate and joyful rituals of the Indian wedding. Our curated roster of mehndi artists ranges from masters of traditional Rajasthani and Mughal patterns to contemporary artists who blend cultural motifs with fine-line minimalism. We also coordinate all bridal and bridesmaid beauty services — makeup artists, hairstylists, and nail artists — ensuring every member of your bridal party feels their most radiant.',
    heroImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1400&h=800&fit=crop',
    features: [
      'Bridal mehndi — both hands and feet',
      'Bridesmaids\' and family mehndi',
      'Traditional and contemporary mehndi styles',
      'Hidden name motif for the groom to find',
      'Bridal makeup — traditional and HD airbrush',
      'Hairstyling for all pre-wedding events',
      'Nail art and extensions',
      'Touch-up team for wedding day',
    ],
    process: [
      { step: '01', title: 'Design Consultation', desc: 'Browse our portfolio and select the style and motifs that speak to you. Share any specific elements — your love story, significant symbols — to incorporate.' },
      { step: '02', title: 'Artist Matching', desc: 'We match you with the right artist based on style, scale, and ceremony type — and arrange a trial session.' },
      { step: '03', title: 'Mehndi Day', desc: 'Your artist arrives at your venue with all materials. We handle timing, setting, and ambience — you simply sit and enjoy the process.' },
      { step: '04', title: 'Aftercare Guidance', desc: 'Detailed aftercare instructions to maximise colour depth and longevity for your wedding day.' },
    ],
    packages: [
      { name: 'Bridal', price: '₹12,000+', features: ['Both hands (full arm)', 'Both feet', '3–5 hour session', '1 lead artist'] },
      { name: 'Bridal + Bridal Party', price: '₹35,000+', features: ['Bride (full mehndi)', '4–6 bridesmaid/family mehndi', '2 artists', 'Event setting'] },
      { name: 'Full Mehndi Ceremony', price: 'Custom', features: ['Bridal + bridal party mehndi', 'Additional guest mehndi artists', 'Ceremony coordination', 'Setup and ambience', 'Beauty services'] },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop',
    ],
    relatedServices: [
      { slug: 'wedding-decor', label: 'Wedding Décor' },
      { slug: 'entertainment', label: 'Entertainment' },
      { slug: 'photography', label: 'Photography & Film' },
    ],
    metaTitle: 'Wedding Mehndi & Beauty Services — Royal Affairs',
    metaDescription: 'Expert mehndi artists and bridal beauty services for Indian weddings. Traditional and contemporary designs, makeup, hairstyling, and more.',
  },

  'entertainment': {
    slug: 'entertainment',
    title: 'Entertainment',
    subtitle: 'The Heartbeat of Celebration',
    heroTagline: 'Performances, beats, and spectacles that keep your celebration alive long after midnight.',
    description: 'A great wedding has a rhythm — the DJ who reads the dance floor, the live band that makes aunties forget their age, the surprise act that no one saw coming. Royal Affairs curates premium entertainment — from Bollywood DJs and live classical ensembles to celebrity performers, dhol players, fireworks, laser shows, and custom choreography — to create a celebration that your guests will talk about for years.',
    heroImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1400&h=800&fit=crop',
    features: [
      'Premium Bollywood and EDM DJs',
      'Live wedding bands — Sufi, jazz, folk, fusion',
      'Celebrity performer bookings',
      'Dhol tasha and band baja',
      'Fireworks and pyrotechnic displays',
      'Laser and LED light shows',
      'Choreographed baraat processions',
      'Sangeet performance coordination',
    ],
    process: [
      { step: '01', title: 'Entertainment Brief', desc: 'We discuss the vibe of each event — from the intimate mehendi to the high-energy reception — and build a bespoke entertainment plan.' },
      { step: '02', title: 'Vendor Presentation', desc: 'We present curated options at each tier with video reels, setlists, and pricing — so you can choose with confidence.' },
      { step: '03', title: 'Logistics & Rehearsal', desc: 'We manage all technical requirements, sound checks, stage design, and coordinate run-throughs for performances.' },
      { step: '04', title: 'Night-of Management', desc: 'Our entertainment coordinator manages all performers on the night — timing, transitions, and surprises — so you can simply enjoy.' },
    ],
    packages: [
      { name: 'Essential', price: '₹80,000+', features: ['Premium DJ', 'Sound system', 'Basic lighting rig', 'Dhol artists', 'MC services'] },
      { name: 'Spectacular', price: '₹2.5L+', features: ['DJ + live band', 'Full LED light show', 'Fireworks display', 'Baraat choreography', 'Sound + staging', 'Entertainment coordinator'] },
      { name: 'Royal', price: 'Custom', features: ['Celebrity performer', 'Full production', 'Custom LED stage', 'Pyrotechnics', 'Drone light show', 'Multi-event entertainment planning'] },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1468359601543-843bfaef291a?w=600&h=400&fit=crop',
    ],
    relatedServices: [
      { slug: 'wedding-decor', label: 'Wedding Décor' },
      { slug: 'catering', label: 'Catering' },
      { slug: 'photography', label: 'Photography & Film' },
    ],
    metaTitle: 'Wedding Entertainment Services — Royal Affairs Wedding Planners',
    metaDescription: 'Premium wedding entertainment from Bollywood DJs and live bands to celebrity performers and fireworks. Memorable celebrations for Indian weddings.',
  },

  'venue-management': {
    slug: 'venue-management',
    title: 'Venue Management',
    subtitle: 'The Perfect Setting Awaits',
    heroTagline: 'Finding and flawlessly running your ideal venue — from palace to poolside.',
    description: 'The right venue sets the entire tone. Whether you envision a grand heritage haveli in Rajasthan, a lush garden in the Nilgiris, a ballroom in a five-star city hotel, or a beachside celebration in Goa, our venue specialists have the relationships and expertise to find and secure the ideal space. We also provide complete venue operations management — staffing, logistics, permits, and day-of coordination — so everything runs seamlessly.',
    heroImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1400&h=800&fit=crop',
    features: [
      'Venue search and shortlisting across India',
      'Site visits and venue assessment',
      'Negotiation and contract review',
      'Venue layout planning and flow design',
      'Permits, licenses, and compliance',
      'Vendor access coordination',
      'On-day venue management team',
      'Post-event venue restoration',
    ],
    process: [
      { step: '01', title: 'Needs Analysis', desc: 'We discuss guest count, preferred region, aesthetic, indoor/outdoor preference, and budget to define the search parameters.' },
      { step: '02', title: 'Shortlist & Site Visits', desc: 'We present a curated shortlist and accompany you on site visits — helping you evaluate each space with expert eyes.' },
      { step: '03', title: 'Contract & Logistics', desc: 'We review and negotiate venue contracts, manage deposits, and coordinate all logistics with venue management teams.' },
      { step: '04', title: 'Day-of Operations', desc: 'A senior Royal Affairs venue manager is on-site throughout your event, managing every operational detail.' },
    ],
    packages: [
      { name: 'Search & Secure', price: '₹50,000+', features: ['Venue research', 'Shortlist presentation', 'Site visits', 'Contract review', 'Booking management'] },
      { name: 'Full Operations', price: '₹1.5L+', features: ['All Search & Secure', 'Layout planning', 'Vendor coordination', 'Permit management', 'Day-of operations team'] },
      { name: 'Destination Package', price: 'Custom', features: ['Multi-venue management', 'Destination logistics', 'Guest accommodation coordination', 'Transport management', 'Full operations team'] },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop',
    ],
    relatedServices: [
      { slug: 'wedding-decor', label: 'Wedding Décor' },
      { slug: 'catering', label: 'Catering' },
      { slug: 'destination-weddings', label: 'Destination Weddings' },
    ],
    metaTitle: 'Wedding Venue Management — Royal Affairs Wedding Planners',
    metaDescription: 'Expert venue sourcing and management for Indian weddings. From palace heritage haveli to beachside celebrations — we find and run your perfect venue.',
  },

  'honeymoon': {
    slug: 'honeymoon',
    title: 'Honeymoon Planning',
    subtitle: 'Your First Adventure Together',
    heroTagline: 'Seamlessly planned journeys to the world\'s most romantic destinations.',
    description: 'Your honeymoon is the first chapter of your married life — and it deserves to be extraordinary. Our honeymoon planning service designs personalised itineraries for couples who want their post-wedding escape to be as thoughtfully curated as their wedding. From Maldivian overwater villas and European château stays to backpacker-chic Bali and safari adventures in Kenya, we handle every booking, transfer, and surprise so you can simply be present with each other.',
    heroImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1400&h=800&fit=crop',
    features: [
      'Personalised destination consultation',
      'Bespoke itinerary design',
      'Luxury hotel and resort bookings',
      'International flight coordination',
      'Private transfers and chauffeur services',
      'Romantic experiences and surprises',
      'Visa assistance',
      'Travel insurance guidance',
    ],
    process: [
      { step: '01', title: 'Dream Destination Session', desc: 'We explore your travel style, favourite experiences, and budget to recommend destinations you\'ll both fall in love with.' },
      { step: '02', title: 'Itinerary Design', desc: 'We craft a day-by-day itinerary balancing romance, adventure, rest, and discovery — with thoughtful touches throughout.' },
      { step: '03', title: 'All Bookings Managed', desc: 'We handle every booking — hotels, flights, transfers, experiences, and surprise elements — so you have nothing to arrange.' },
      { step: '04', title: 'Travel Support', desc: 'A dedicated point of contact available throughout your trip for any questions, changes, or emergencies.' },
    ],
    packages: [
      { name: 'Escape', price: '₹1.5L+', features: ['5–7 nights', 'Hotel bookings', 'Airport transfers', 'Romantic dinner arrangement', 'Welcome amenity'] },
      { name: 'Journey', price: '₹3L+', features: ['10–14 nights', 'Multi-destination', 'Flights + hotels', 'Private transfers', 'Curated experiences', 'Surprise elements'] },
      { name: 'Grand Voyage', price: 'Custom', features: ['Custom duration', 'Luxury properties only', 'Full concierge service', 'Private jet option', 'Daily experiences', 'Dedicated travel host'] },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop',
    ],
    relatedServices: [
      { slug: 'destination-weddings', label: 'Destination Weddings' },
      { slug: 'anniversary', label: 'Anniversary Celebrations' },
      { slug: 'photography', label: 'Photography & Film' },
    ],
    metaTitle: 'Honeymoon Planning — Royal Affairs Wedding Planners',
    metaDescription: 'Bespoke honeymoon itineraries for newlyweds. From Maldives to Tuscany — personalised, seamlessly planned, and utterly romantic.',
  },

  'anniversary': {
    slug: 'anniversary',
    title: 'Anniversary Celebrations',
    subtitle: 'Celebrate the Journey Continued',
    heroTagline: 'From intimate dinners to grand vow renewals — honouring love that grows.',
    description: 'Every anniversary is a milestone worth marking — whether it\'s your first year together or your twenty-fifth. Royal Affairs designs anniversary celebrations that reflect how your relationship has evolved: intimate candlelit dinners in extraordinary settings, surprise birthday and anniversary parties, and grand vow renewal ceremonies with all the people who matter most. We take care of every detail so you can be fully present.',
    heroImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1400&h=800&fit=crop',
    features: [
      'Intimate private dining arrangements',
      'Surprise party planning and execution',
      'Vow renewal ceremonies',
      'Venue sourcing and décor',
      'Photography for the occasion',
      'Guest management and invitations',
      'Personalised gifts and keepsakes',
      'Honeymoon or getaway planning',
    ],
    process: [
      { step: '01', title: 'Story Consultation', desc: 'We learn your love story and what this anniversary means — then design an experience that feels completely personal.' },
      { step: '02', title: 'Experience Design', desc: 'From the venue to the menu to the final surprise — every element is chosen to reflect your relationship\'s unique character.' },
      { step: '03', title: 'Coordination', desc: 'We manage all vendors, bookings, and logistics — including keeping surprises secret if that\'s the plan.' },
      { step: '04', title: 'Execution & Memory Making', desc: 'On the day, our team is invisible — you simply arrive to something extraordinary.' },
    ],
    packages: [
      { name: 'Intimate', price: '₹30,000+', features: ['Private dining setup', 'Florals and candles', 'Photography (2 hours)', 'Personalised menu', 'Welcome gift'] },
      { name: 'Celebration', price: '₹1L+', features: ['Venue sourcing', 'Décor and florals', 'Guest coordination (10–30)', 'Photography + film', 'Catering'] },
      { name: 'Grand Vow Renewal', price: 'Custom', features: ['Full ceremony planning', 'Venue + décor', 'All guests managed', 'Photography + film', 'Reception dinner', 'Surprise elements'] },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop',
    ],
    relatedServices: [
      { slug: 'honeymoon', label: 'Honeymoon Planning' },
      { slug: 'photography', label: 'Photography & Film' },
      { slug: 'wedding-decor', label: 'Wedding Décor' },
    ],
    metaTitle: 'Anniversary Celebrations — Royal Affairs Wedding Planners',
    metaDescription: 'Intimate anniversary dinners, surprise parties, and grand vow renewals. Royal Affairs creates unforgettable anniversary moments.',
  },

  'bachelorette': {
    slug: 'bachelorette',
    title: 'Bachelorette Party',
    subtitle: 'A Night Just for Her',
    heroTagline: 'Glamorous, intimate, and completely unforgettable — the perfect send-off for the bride-to-be.',
    description: 'The bachelorette is the bride\'s night to be celebrated in exactly the way she dreams — whether that means a luxurious spa day with her closest girlfriends, a cocktail-filled evening in a rooftop suite, a weekend getaway to Goa, or a private dinner with dancing and personalised surprises. Royal Affairs designs bachelorette experiences that feel personal, playful, and completely hers.',
    heroImage: 'https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=1400&h=800&fit=crop',
    features: [
      'Personalised theme and concept design',
      'Venue sourcing — suites, rooftops, beach clubs, spas',
      'Custom decorations and bridal accessories',
      'Activity curation — spa, cooking class, wine tasting, dance workshop',
      'Personalised gift bags and party favours',
      'Gourmet catering and signature cocktails',
      'Photography for the occasion',
      'Weekend getaway coordination',
    ],
    process: [
      { step: '01', title: 'Bride\'s Brief', desc: 'We discover how the bride-to-be wants to celebrate — from energy level and aesthetic to guest count and preferred activities.' },
      { step: '02', title: 'Concept Design', desc: 'We design a themed experience — from invitations to final surprise — that feels completely personal to the bride.' },
      { step: '03', title: 'All Logistics Handled', desc: 'Every booking, vendor, and coordination detail is managed so the Maid of Honour can be a guest, not an event planner.' },
      { step: '04', title: 'The Celebration', desc: 'We arrive, set up, and manage the event so everything is perfect when the girls arrive. Pure celebration from start to finish.' },
    ],
    packages: [
      { name: 'Girls Night', price: '₹25,000+', features: ['Private venue setup', 'Décor and florals', 'Gift bags', 'Catering for 8–12', 'Photo corner setup'] },
      { name: 'Weekend Getaway', price: '₹80,000+', features: ['Accommodation booking', 'Activity curation', 'Catering', 'Transport', 'Personalised itinerary', 'Surprise elements'] },
      { name: 'Luxury Affair', price: 'Custom', features: ['Destination bachelorette', 'Hotel takeover option', 'Celebrity styling', 'Spa and wellness', 'Photography team', 'Full coordination'] },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1528495612343-9ca9f4a4de28?w=600&h=400&fit=crop',
    ],
    relatedServices: [
      { slug: 'bachelor-party', label: 'Bachelor Party' },
      { slug: 'photography', label: 'Photography & Film' },
      { slug: 'entertainment', label: 'Entertainment' },
    ],
    metaTitle: 'Bachelorette Party Planning — Royal Affairs Wedding Planners',
    metaDescription: 'Glamorous bachelorette parties tailored for the bride-to-be. From rooftop soirées to weekend getaways — Royal Affairs plans the perfect send-off.',
  },

  'invitations': {
    slug: 'invitations',
    title: 'Invitation Design',
    subtitle: 'The First Glimpse of Your Wedding',
    heroTagline: 'Exquisite invitations that set the tone before a single decoration is placed.',
    description: 'Your wedding invitation is the first experience your guests have of your celebration — a preview of the beauty and thoughtfulness to come. Our invitation design service creates bespoke stationery suites that reflect your personal aesthetic, from ultra-luxurious boxed invitations with wax seals and hand-tied ribbons to elegant minimalist cards with foil letterpress typography. We handle design, production, and dispatch.',
    heroImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1400&h=800&fit=crop',
    features: [
      'Bespoke invitation suite design',
      'Boxed luxury invitation packages',
      'Digital invitation design',
      'Save-the-date cards',
      'Ceremony and reception programmes',
      'Mehndi, Sangeet, and event cards',
      'Menu cards and table stationery',
      'Guest addressing and dispatch coordination',
    ],
    process: [
      { step: '01', title: 'Design Consultation', desc: 'We explore your wedding aesthetic, colour palette, and cultural elements to define the visual language of your invitation suite.' },
      { step: '02', title: 'Design Presentation', desc: 'Our team presents 2–3 concept directions with typography, illustration, and material samples for your review.' },
      { step: '03', title: 'Production', desc: 'Once approved, we manage the full production — letterpress, foiling, digital printing, or hand-calligraphy — at premium print houses.' },
      { step: '04', title: 'Dispatch', desc: 'We coordinate guest addressing (hand-lettered or digital), packaging, and dispatch — even internationally.' },
    ],
    packages: [
      { name: 'Elegant', price: '₹150/card+', features: ['Single event card', 'Printed envelope', 'Custom design', 'Digital proof', 'Min 50 cards'] },
      { name: 'Suite', price: '₹600/set+', features: ['Invitation + 3 event cards', 'Foil or letterpress', 'Custom box or envelope', 'Wax seal', 'Hand-lettered addressing'] },
      { name: 'Royal Box', price: 'Custom', features: ['Full stationery suite', 'Bespoke keepsake box', 'Premium materials', 'Hand-calligraphy', 'Dispatch management', 'Digital version'] },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=600&h=400&fit=crop',
    ],
    relatedServices: [
      { slug: 'wedding-decor', label: 'Wedding Décor' },
      { slug: 'photography', label: 'Photography & Film' },
    ],
    metaTitle: 'Wedding Invitation Design — Royal Affairs Wedding Planners',
    metaDescription: 'Bespoke luxury wedding invitation suites — from foil letterpress cards to handcrafted keepsake boxes. Royal Affairs sets the tone from the very first card.',
  },

  'fashion-shows': {
    slug: 'fashion-shows',
    title: 'Fashion Shows',
    subtitle: 'Where Style Takes Centre Stage',
    heroTagline: 'Professionally produced fashion and trousseau events that celebrate your brand or bridal style.',
    description: 'Royal Affairs produces fashion shows and trousseau events for designer brands, couture houses, jewellery brands, and private clients. Whether you\'re launching a bridal collection, hosting a trousseau preview for family, or producing a gala fashion evening at your wedding celebration, our production team brings the runway to life with professional staging, lighting, choreography, and model coordination.',
    heroImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1400&h=800&fit=crop',
    features: [
      'Full runway production and staging',
      'Lighting design and technical production',
      'Model sourcing and choreography',
      'Backstage management and styling support',
      'Hair and makeup artist coordination',
      'Guest seating and experience design',
      'Photography and videography',
      'Brand activation and social media integration',
    ],
    process: [
      { step: '01', title: 'Creative Direction Brief', desc: 'We understand the collection, brand identity, and experience you want to create — from intimate atelier showing to grand runway event.' },
      { step: '02', title: 'Production Design', desc: 'Our team develops the production concept — runway design, lighting storyboard, music direction, and guest experience.' },
      { step: '03', title: 'Coordination', desc: 'We manage models, hair/makeup teams, backstage logistics, rehearsals, and all technical elements.' },
      { step: '04', title: 'Show Day', desc: 'Our production manager runs the show floor — timing, cues, and flow — so you can focus on your collection and guests.' },
    ],
    packages: [
      { name: 'Trousseau Preview', price: '₹1.5L+', features: ['Intimate venue setup', 'Styling and presentation', 'Photography', 'Guest coordination'] },
      { name: 'Brand Show', price: '₹5L+', features: ['Full runway staging', 'Professional lighting', '8–12 models', 'Choreographer', 'Photography + film', 'Guest management'] },
      { name: 'Gala Production', price: 'Custom', features: ['Premium venue', 'Custom staging', 'Celebrity guests option', 'Full media coordination', 'Live streaming', 'Post-show dinner'] },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop',
    ],
    relatedServices: [
      { slug: 'entertainment', label: 'Entertainment' },
      { slug: 'corporate-events', label: 'Corporate Events' },
      { slug: 'award-nights', label: 'Award Nights' },
    ],
    metaTitle: 'Fashion Show Production — Royal Affairs Event Management',
    metaDescription: 'Professional fashion show and trousseau event production. Runway staging, model coordination, lighting design and full event management.',
  },

  'award-nights': {
    slug: 'award-nights',
    title: 'Award Nights & Galas',
    subtitle: 'Celebrating Excellence, Brilliantly',
    heroTagline: 'Memorable award ceremonies and gala dinners that honour achievement in unforgettable style.',
    description: 'An award night is more than a ceremony — it\'s a moment of recognition, celebration, and brand prestige. Royal Affairs produces award nights and gala dinners that leave recipients and guests genuinely moved. From intimate industry awards with 50 guests to grand national galas for 500+, we handle every element — concept, staging, entertainment, production, and the seamless execution that makes your event a landmark occasion.',
    heroImage: 'https://images.unsplash.com/photo-1528495612343-9ca9f4a4de28?w=1400&h=800&fit=crop',
    features: [
      'Award ceremony concept and design',
      'Trophy and award design',
      'Stage and A/V production',
      'Celebrity host or emcee booking',
      'Entertainment and performances',
      'Gala dinner planning and catering',
      'Guest management and seating',
      'Photography and live streaming',
    ],
    process: [
      { step: '01', title: 'Awards Brief', desc: 'We understand your awards programme, brand, category list, expected guests, and the tone you want — formal, glamorous, intimate, or high-energy.' },
      { step: '02', title: 'Production Design', desc: 'We develop the full event concept — stage design, show flow, entertainment, and dinner experience — and present for approval.' },
      { step: '03', title: 'Coordination', desc: 'We manage all vendors, trophy production, emcee briefing, stage rehearsals, and guest management logistics.' },
      { step: '04', title: 'Night-of Production', desc: 'Our production director runs the event backstage — cueing every moment, managing the programme, and ensuring a seamless evening.' },
    ],
    packages: [
      { name: 'Intimate Gala', price: '₹3L+', features: ['Up to 80 guests', 'Stage + podium', 'A/V production', 'MC services', 'Gala dinner', 'Photography'] },
      { name: 'Industry Awards', price: '₹8L+', features: ['Up to 250 guests', 'Custom stage design', 'Entertainment', 'Celebrity host option', 'Full dinner service', 'Live streaming', 'Trophy design'] },
      { name: 'National Gala', price: 'Custom', features: ['500+ guests', 'Premium venue', 'Full production', 'Multi-act entertainment', 'Red carpet setup', 'Press coordination', 'Broadcast-quality production'] },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1528495612343-9ca9f4a4de28?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=600&h=400&fit=crop',
    ],
    relatedServices: [
      { slug: 'corporate-events', label: 'Corporate Events' },
      { slug: 'entertainment', label: 'Entertainment' },
      { slug: 'fashion-shows', label: 'Fashion Shows' },
    ],
    metaTitle: 'Award Nights & Gala Events — Royal Affairs Event Management',
    metaDescription: 'Prestigious award ceremonies and gala dinners produced by Royal Affairs. Concept to execution — events that celebrate excellence in unforgettable style.',
  },

  'conference': {
    slug: 'conference',
    title: 'Conferences & Summits',
    subtitle: 'Ideas That Resonate, Events That Inspire',
    heroTagline: 'Meticulously planned conferences that create meaningful connections and lasting impact.',
    description: 'A well-executed conference or summit is a powerful platform — for ideas, for networking, and for your brand. Royal Affairs manages corporate conferences, leadership summits, industry panels, product launch events, and multi-day conventions with the same attention to detail and quality standards we bring to every event. From intimate 30-person offsites to 1,000-delegate conventions, we plan and execute with precision.',
    heroImage: 'https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=1400&h=800&fit=crop',
    features: [
      'Conference concept and theme development',
      'Venue sourcing and management',
      'Speaker management and logistics',
      'A/V production — stage, screens, sound',
      'Delegate registration systems',
      'Breakout session planning',
      'Conference catering and hospitality',
      'Post-conference networking event',
    ],
    process: [
      { step: '01', title: 'Goals & Audience', desc: 'We define the conference\'s objectives, target audience, format, and the experience you want delegates to have.' },
      { step: '02', title: 'Programme Design', desc: 'We develop the agenda, speaker runsheet, session formats, and the overall experience design for the event.' },
      { step: '03', title: 'Production Management', desc: 'Full logistics management — venue, A/V, catering, registration, accommodation, and transport — all coordinated seamlessly.' },
      { step: '04', title: 'On-Day Delivery', desc: 'Our event operations team manages every moment — speaker timing, technical production, and delegate experience throughout the event.' },
    ],
    packages: [
      { name: 'Offsite & Retreat', price: '₹2L+', features: ['Up to 50 delegates', 'Venue sourcing', 'Programme coordination', 'Catering', 'Team activities', 'Accommodation management'] },
      { name: 'Corporate Summit', price: '₹8L+', features: ['100–300 delegates', 'Full A/V production', 'Speaker coordination', 'Multi-session programme', 'Exhibition space', 'Gala dinner'] },
      { name: 'Convention', price: 'Custom', features: ['300+ delegates', 'Multi-day format', 'Full delegate management', 'Media coordination', 'Sponsor management', 'Live streaming', 'App or digital programme'] },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1528495612343-9ca9f4a4de28?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop',
    ],
    relatedServices: [
      { slug: 'corporate-events', label: 'Corporate Events' },
      { slug: 'award-nights', label: 'Award Nights' },
      { slug: 'venue-management', label: 'Venue Management' },
    ],
    metaTitle: 'Conference & Summit Management — Royal Affairs Event Management',
    metaDescription: 'Professional conference and summit planning for 30 to 1,000+ delegates. Royal Affairs delivers precision-managed corporate events with impact.',
  },

  'corporate-events': {
    slug: 'corporate-events',
    title: 'Corporate Events',
    subtitle: 'Experiences That Inspire',
    heroTagline: 'Precision-planned corporate events with a luxury touch that leaves a lasting impression.',
    description: 'Corporate events are a powerful expression of brand identity and team culture. Royal Affairs brings the same meticulous attention to detail and creative excellence we apply to weddings to conferences, product launches, dealer meets, award nights, and team celebrations. We understand that a successful corporate event delivers measurable results — engagement, brand recall, and inspiration — alongside a seamless experience.',
    heroImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1400&h=800&fit=crop',
    features: [
      'Conference and seminar management',
      'Product launch events',
      'Award nights and gala dinners',
      'Dealer and partner meets',
      'Team offsites and incentive programmes',
      'Brand activation events',
      'A/V production and staging',
      'Guest management and RSVP systems',
    ],
    process: [
      { step: '01', title: 'Brief & Objectives', desc: 'We understand your event goals, audience, brand guidelines, and success metrics before designing any concept.' },
      { step: '02', title: 'Concept Development', desc: 'Our creative team develops an event concept aligned with your brand — from theme and décor to programme flow and entertainment.' },
      { step: '03', title: 'Production Management', desc: 'We manage all vendors, A/V teams, staging, registration, catering, and travel logistics for a seamless delivery.' },
      { step: '04', title: 'On-Day Execution', desc: 'Our experienced event managers run every aspect of the day — allowing your team to focus on your guests and goals.' },
    ],
    packages: [
      { name: 'Conference', price: 'Custom', features: ['Venue management', 'A/V production', 'Catering', 'Registration', 'Speaker management', 'Event kit'] },
      { name: 'Gala & Awards', price: 'Custom', features: ['Premium venue', 'Full décor', 'Entertainment', 'Award design', 'MC and production', 'Dinner service'] },
      { name: 'Brand Activation', price: 'Custom', features: ['Concept + creative', 'Experiential design', 'Full production', 'Social media integration', 'Measurement framework'] },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1528495612343-9ca9f4a4de28?w=600&h=400&fit=crop',
    ],
    relatedServices: [
      { slug: 'entertainment', label: 'Entertainment' },
      { slug: 'venue-management', label: 'Venue Management' },
      { slug: 'catering', label: 'Catering' },
    ],
    metaTitle: 'Corporate Event Management — Royal Affairs',
    metaDescription: 'Precision-planned corporate events, conferences, award nights, and product launches. Royal Affairs delivers brand-aligned experiences with luxury execution.',
  },
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = services[params.slug];
  if (!service) return { title: 'Service Not Found' };
  return {
    title: service.metaTitle,
    description: service.metaDescription,
  };
}

export async function generateStaticParams() {
  return Object.keys(services).map((slug) => ({ slug }));
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = services[params.slug];
  if (!service) notFound();

  return (
    <>
      <Navbar />
      <main className="pt-24 bg-ivory min-h-screen">
        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="relative min-h-[70vh] flex items-end overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${service.heroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
          <div className="relative z-10 container-custom pb-16 pt-40">
            <div className="eyebrow text-champagne/80 mb-4">Our Services</div>
            <h1 className="font-cormorant text-5xl sm:text-6xl lg:text-7xl font-[300] italic text-white mb-3 leading-tight">
              {service.title}
            </h1>
            <p className="font-sans text-champagne/90 text-lg max-w-xl mb-6">{service.subtitle}</p>
            <div className="divider-gold mb-6"><div className="divider-gold-diamond" /></div>
            <p className="font-cormorant text-xl italic text-white/80 max-w-lg">{service.heroTagline}</p>
          </div>
        </section>

        {/* ── DESCRIPTION ──────────────────────────────────── */}
        <section className="py-section">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              <div data-aos="fade-right">
                <div className="eyebrow mb-4">What We Do</div>
                <h2 className="font-cormorant text-4xl sm:text-5xl font-[300] italic text-primary mb-6 leading-tight">
                  {service.title} <span className="font-[600] not-italic text-accent">by Royal Affairs</span>
                </h2>
                <p className="font-sans text-warmgray leading-relaxed text-lg">{service.description}</p>
                <div className="mt-8 flex gap-4 flex-wrap">
                  <Link href="/contact" className="btn-gold">
                    <span>Request a Proposal</span>
                  </Link>
                  <Link href="/services" className="btn-outline-gold">
                    <span>All Services</span>
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3" data-aos="fade-left">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 glass-card rounded-xl">
                    <span className="text-accent mt-0.5 flex-shrink-0">✦</span>
                    <span className="font-sans text-warmgray text-sm leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── PROCESS ──────────────────────────────────────── */}
        <section className="py-section bg-primary">
          <div className="container-custom">
            <div className="text-center mb-16" data-aos="fade-up">
              <div className="eyebrow text-champagne/70 mb-4">How It Works</div>
              <h2 className="font-cormorant text-4xl sm:text-5xl font-[300] italic text-white">
                Our <span className="font-[600] not-italic text-champagne">Process</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.process.map((step, i) => (
                <div key={i} className="text-center" data-aos="fade-up" data-aos-delay={i * 100}>
                  <div className="font-cormorant text-5xl font-[300] italic text-champagne/30 mb-3">{step.step}</div>
                  <h3 className="font-cormorant text-xl font-[600] text-white mb-3">{step.title}</h3>
                  <p className="font-sans text-warmgray text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── GALLERY ──────────────────────────────────────── */}
        <section className="py-section bg-secondary">
          <div className="container-custom">
            <div className="text-center mb-10" data-aos="fade-up">
              <div className="eyebrow mb-4">Our Work</div>
              <h2 className="font-cormorant text-4xl font-[300] italic text-primary">
                <span className="font-[600] not-italic text-accent">{service.title}</span> Gallery
              </h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {service.gallery.map((img, i) => (
                <div key={i} className="relative h-48 lg:h-64 overflow-hidden rounded-xl group" data-aos="fade-up" data-aos-delay={i * 60}>
                  <Image
                    src={img}
                    alt={`${service.title} ${i + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors duration-500" />
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/gallery" className="btn-outline-gold inline-block">
                <span>View Full Gallery</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── PACKAGES ─────────────────────────────────────── */}
        {service.slug !== 'catering' && (
        <section className="py-section">
          <div className="container-custom">
            <div className="text-center mb-16" data-aos="fade-up">
              <div className="eyebrow mb-4">Investment</div>
              <h2 className="font-cormorant text-4xl sm:text-5xl font-[300] italic text-primary">
                Our <span className="font-[600] not-italic text-accent">Packages</span>
              </h2>
              <p className="font-sans text-warmgray mt-4 max-w-md mx-auto">
                Every package is fully customisable. Prices reflect starting points — your proposal will be bespoke.
              </p>
            </div>
            <div className={`grid grid-cols-1 md:grid-cols-${Math.min(service.packages.length, 3)} gap-6 max-w-5xl mx-auto`}>
              {service.packages.map((pkg, i) => (
                <div
                  key={i}
                  className={`p-8 rounded-3xl border transition-all duration-300 ${
                    i === 1
                      ? 'bg-primary border-primary text-white shadow-premium scale-105'
                      : 'bg-white border-champagne/30 hover:border-accent/40 hover:shadow-premium'
                  }`}
                  data-aos="fade-up"
                  data-aos-delay={i * 80}
                >
                  {i === 1 && (
                    <div className="eyebrow text-champagne/80 mb-3">Most Popular</div>
                  )}
                  <h3 className={`font-cormorant text-2xl font-[600] mb-1 ${i === 1 ? 'text-white' : 'text-primary'}`}>
                    {pkg.name}
                  </h3>
                  <div className={`font-cormorant text-4xl font-[300] italic mb-6 ${i === 1 ? 'text-champagne' : 'text-accent'}`}>
                    {pkg.price}
                  </div>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((f, j) => (
                      <li key={j} className={`flex items-start gap-2 font-sans text-sm ${i === 1 ? 'text-white/80' : 'text-warmgray'}`}>
                        <span className={`mt-1 flex-shrink-0 ${i === 1 ? 'text-champagne' : 'text-accent'}`}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className={`block text-center py-3 px-6 rounded-full font-sans text-sm font-[600] transition-all duration-300 ${
                      i === 1
                        ? 'bg-champagne text-primary hover:bg-champagne/90'
                        : 'border border-accent text-accent hover:bg-accent hover:text-white'
                    }`}
                  >
                    Get a Quote
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
        )}

        {/* ── RELATED SERVICES ─────────────────────────────── */}
        {service.relatedServices.length > 0 && (
          <section className="py-16 bg-blush">
            <div className="container-custom">
              <div className="text-center mb-10" data-aos="fade-up">
                <div className="eyebrow mb-3">Complete Your Celebration</div>
                <h2 className="font-cormorant text-3xl font-[300] italic text-primary">
                  Related <span className="font-[600] not-italic text-accent">Services</span>
                </h2>
              </div>
              <div className="flex flex-wrap gap-4 justify-center">
                {service.relatedServices.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/services/${rel.slug}`}
                    className="font-sans font-[500] text-sm text-primary border border-champagne/50 px-6 py-3 rounded-full hover:border-accent hover:text-accent transition-all duration-300 bg-white"
                    data-aos="fade-up"
                  >
                    {rel.label} →
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── CTA ──────────────────────────────────────────── */}
        <section className="py-20 bg-primary text-center">
          <div className="container-custom" data-aos="fade-up">
            <h2 className="font-cormorant text-4xl sm:text-5xl font-[300] italic text-white mb-5">
              Ready to Begin?
            </h2>
            <p className="font-sans text-warmgray max-w-md mx-auto mb-8">
              Tell us about your vision and we'll design something extraordinary together.
            </p>
            <Link href="/contact" className="btn-gold inline-block">
              <span>Start the Conversation</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
