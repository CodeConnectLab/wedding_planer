import mongoose, { Schema, Document } from 'mongoose';
import { TESTIMONIAL_SERVICE_TYPES } from '@/lib/constants';

export interface ITestimonial extends Document {
  name: string;
  text: string;
  image?: string;
  rating: number;
  serviceType: string;
  location?: string;
  isPublished: boolean;
  isFeatured: boolean;
  order: number;
  approvedAt?: Date;
  approvedBy?: mongoose.Types.ObjectId;
}

const TestimonialSchema: Schema = new Schema({
  name: { type: String, required: true },
  text: { type: String, required: true },
  image: { type: String },
  rating: { 
    type: Number, 
    required: true, 
    min: 1, 
    max: 5, 
    default: 5 
  },
  serviceType: { 
    type: String, 
    enum: TESTIMONIAL_SERVICE_TYPES,
    default: 'All'
  },
  location: { type: String, trim: true },
  isPublished: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  approvedAt: { type: Date },
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
}, {
  timestamps: true
});

// Indexes
TestimonialSchema.index({ isPublished: 1, isFeatured: 1, order: 1 });
TestimonialSchema.index({ serviceType: 1, isPublished: 1 });
TestimonialSchema.index({ rating: -1, isPublished: 1 });

export default mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
