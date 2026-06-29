import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  category: mongoose.Types.ObjectId;
  images: string[];
  description: string;
  location: string;
  clientName: string;
  year: number;
  // Wedding-specific fields
  brideName?: string;
  groomName?: string;
  weddingDate?: Date;
  venue?: string;
  weddingStyle?: string;
  guestCount?: number;
  videoUrl?: string;
  isFeatured?: boolean;
  isPublished?: boolean;
  createdAt: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    title:        { type: String, required: true },
    slug:         { type: String, required: true, unique: true },
    category:     { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    images:       [{ type: String }],
    description:  { type: String, required: true },
    location:     { type: String, required: true },
    clientName:   { type: String, required: true },
    year:         { type: Number, required: true },
    // Wedding extras
    brideName:    { type: String },
    groomName:    { type: String },
    weddingDate:  { type: Date },
    venue:        { type: String },
    weddingStyle: { type: String },
    guestCount:   { type: Number },
    videoUrl:     { type: String },
    isFeatured:   { type: Boolean, default: false },
    isPublished:  { type: Boolean, default: true },
  },
  { timestamps: true }
);

ProjectSchema.index({ slug: 1 });
ProjectSchema.index({ category: 1 });
ProjectSchema.index({ isFeatured: 1 });
ProjectSchema.index({ isPublished: 1 });

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
