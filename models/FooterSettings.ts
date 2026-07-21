import mongoose from 'mongoose';

const FooterLinkSchema = new mongoose.Schema({
  label: { type: String, required: true },
  href: { type: String, required: true },
}, { _id: false });

const FooterSettingsSchema = new mongoose.Schema({
  companyName: { type: String, required: true, default: 'WAH Momentz' },
  companyDescription: {
    type: String,
    required: true,
    default: "India's premier luxury wedding planning studio. We craft bespoke celebrations that honour your love story — from intimate ceremonies to grand royal weddings.",
  },
  logo: { type: String, default: '/logo.svg' },
  phone: { type: String, required: true, default: '+91 97111 48175' },
  email: { type: String, required: true, default: 'hello@wahmomentz.com' },
  address: { type: String, required: true, default: 'Delhi NCR, India' },
  facebookUrl: { type: String, default: '' },
  instagramUrl: { type: String, default: '' },
  linkedinUrl: { type: String, default: '' },
  youtubeUrl: { type: String, default: '' },
  pinterestUrl: { type: String, default: '' },
  whatsappNumber: { type: String, default: '919711148175' },
  copyrightText: { type: String, default: 'WAH Momentz. All Rights Reserved.' },
  weddingsTitle: { type: String, default: 'Weddings' },
  weddingLinks: {
    type: [FooterLinkSchema],
    default: [
      { label: 'Destination Weddings', href: '/destination-weddings' },
      { label: 'Wedding Décor', href: '/services/wedding-decor' },
      { label: 'Photography & Film', href: '/services/photography' },
      { label: 'Mehndi & Beauty', href: '/services/mehndi' },
      { label: 'Bachelor Party', href: '/bachelor-party' },
      { label: 'Honeymoon Packages', href: '/services/honeymoon' },
    ],
  },
  eventsTitle: { type: String, default: 'Events' },
  eventLinks: {
    type: [FooterLinkSchema],
    default: [
      { label: 'Corporate Events', href: '/services/corporate-events' },
      { label: 'Award Nights', href: '/services/award-nights' },
      { label: 'Fashion Shows', href: '/services/fashion-shows' },
      { label: 'Conference & Expo', href: '/services/conference' },
    ],
  },
}, { timestamps: true });

export default mongoose.models.FooterSettings || mongoose.model('FooterSettings', FooterSettingsSchema);
