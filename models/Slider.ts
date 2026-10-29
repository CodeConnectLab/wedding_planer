import mongoose, { Schema, Document } from 'mongoose';

export interface ISlider extends Document {
  image: string;
  title: string;
  subtitle: string;
  eyebrow?: string;
  buttonText?: string;
  buttonLink?: string;
  order: number;
  isActive: boolean;
}

const SliderSchema: Schema = new Schema(
  {
    image: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    eyebrow: { type: String, default: 'Luxury Wedding Planners' },
    buttonText: { type: String, default: 'Plan Your Wedding' },
    buttonLink: { type: String, default: '/contact' },
    order: { type: Number, required: true, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Slider || mongoose.model<ISlider>('Slider', SliderSchema);
