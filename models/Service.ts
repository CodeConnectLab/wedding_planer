import mongoose from 'mongoose';
import { SERVICE_CATEGORIES } from '@/lib/constants';

const ServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  // URL segment for /services/<slug>; `href` overrides the link entirely (e.g. /destination-weddings)
  slug: {
    type: String,
    trim: true,
    lowercase: true,
    index: { unique: true, sparse: true }
  },
  href: {
    type: String,
    trim: true,
    default: ''
  },
  category: {
    type: String,
    enum: SERVICE_CATEGORIES,
    default: 'wedding'
  },
  icon: {
    type: String,
    default: '💍'
  },
  image: {
    type: String,
    default: ''
  },
  // One-liner for cards; `description` is the long copy for the service page
  shortDescription: {
    type: String,
    trim: true,
    default: ''
  },
  description: {
    type: String,
    required: true
  },
  features: [{
    type: String,
    required: true
  }],
  gallery: [{
    type: String
  }],
  isFeatured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes
ServiceSchema.index({ isActive: 1, order: 1 });

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema);
