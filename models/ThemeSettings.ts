import mongoose from 'mongoose';

const isValidHex = (v: string) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(v);

const ThemeSettingsSchema = new mongoose.Schema(
  {
    primaryColor:    { type: String, required: true, default: '#2D1B4E', validate: { validator: isValidHex, message: 'Invalid hex color' } },
    secondaryColor:  { type: String, required: true, default: '#FEF0F8', validate: { validator: isValidHex, message: 'Invalid hex color' } },
    accentColor:     { type: String, required: true, default: '#C2185B', validate: { validator: isValidHex, message: 'Invalid hex color' } },
    roseColor:       { type: String, default: '#E91E8C', validate: { validator: isValidHex, message: 'Invalid hex color' } },
    burgundyColor:   { type: String, default: '#880E4F', validate: { validator: isValidHex, message: 'Invalid hex color' } },
    champagneColor:  { type: String, default: '#F8BBD9', validate: { validator: isValidHex, message: 'Invalid hex color' } },
    ivoryColor:      { type: String, default: '#FFF5FA', validate: { validator: isValidHex, message: 'Invalid hex color' } },
    buttonColor:     { type: String, default: '#C2185B', validate: { validator: isValidHex, message: 'Invalid hex color' } },
    headerStyle:     { type: String, default: 'transparent', enum: ['transparent', 'solid', 'gradient'] },
    footerStyle:     { type: String, default: 'dark', enum: ['dark', 'light', 'gradient'] },
    fontHeading:     { type: String, default: 'Cormorant Garamond' },
    fontBody:        { type: String, default: 'Jost' },
    logoUrl:         { type: String, default: '/logo.png' },
    faviconUrl:      { type: String, default: '/favicon.ico' },
    isActive:        { type: Boolean, default: true },
  },
  { timestamps: true }
);

ThemeSettingsSchema.index({ isActive: 1 }, { unique: true, partialFilterExpression: { isActive: true } });

export default mongoose.models.ThemeSettings || mongoose.model('ThemeSettings', ThemeSettingsSchema);
