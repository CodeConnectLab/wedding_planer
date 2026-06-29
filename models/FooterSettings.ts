import mongoose from 'mongoose';

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
}, { timestamps: true });

export default mongoose.models.FooterSettings || mongoose.model('FooterSettings', FooterSettingsSchema);
