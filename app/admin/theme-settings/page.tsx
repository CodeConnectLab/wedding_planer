'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { FaPalette, FaUndo, FaSave } from 'react-icons/fa';

interface ThemeSettings {
  _id?: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  roseColor: string;
  burgundyColor: string;
  champagneColor: string;
  ivoryColor: string;
  buttonColor: string;
  isActive: boolean;
}

const defaultTheme: ThemeSettings = {
  primaryColor: '#1C1008',
  secondaryColor: '#F8F3EA',
  accentColor: '#C9A96E',
  roseColor: '#F5C6D0',
  burgundyColor: '#6B2737',
  champagneColor: '#C9A96E',
  ivoryColor: '#FFFCF5',
  buttonColor: '#C9A96E',
  isActive: true,
};

const colorFields: { key: keyof ThemeSettings; label: string; description: string }[] = [
  { key: 'primaryColor',    label: 'Primary (Dark Brown)',   description: 'Navigation, dark sections, headings' },
  { key: 'secondaryColor',  label: 'Secondary (Warm Linen)', description: 'Page backgrounds, subtle areas' },
  { key: 'accentColor',     label: 'Accent (Champagne Gold)', description: 'Buttons, links, highlights, dividers' },
  { key: 'champagneColor',  label: 'Champagne Gold',         description: 'Decorative gold elements, eyebrow text' },
  { key: 'roseColor',       label: 'Blush Rose',             description: 'Soft card backgrounds, bridal elements' },
  { key: 'burgundyColor',   label: 'Burgundy',               description: 'Rich accent alternative, hover states' },
  { key: 'ivoryColor',      label: 'Ivory',                  description: 'Clean page background, light sections' },
  { key: 'buttonColor',     label: 'Button Color',           description: 'Primary call-to-action button color' },
];

export default function ThemeSettingsAdmin() {
  const [theme, setTheme] = useState<ThemeSettings>(defaultTheme);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const res = await fetch('/api/theme-settings');
        if (res.ok) {
          const data = await res.json();
          setTheme({ ...defaultTheme, ...data });
        }
      } catch { /* use defaults */ }
      finally { setLoading(false); }
    };
    fetchTheme();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/theme-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(theme),
      });
      if (res.ok) {
        alert('Theme saved! Refreshing to apply changes...');
        window.location.reload();
      } else {
        alert('Failed to save theme settings');
      }
    } catch { alert('Failed to save theme settings'); }
    finally { setSaving(false); }
  };

  const handleReset = async () => {
    if (!confirm('Reset to WAH Momentz default wedding colors?')) return;
    setTheme(defaultTheme);
  };

  const handleColorChange = (key: keyof ThemeSettings, value: string) => {
    setTheme(prev => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <FaPalette className="text-accent" />
            Theme Settings
          </h1>
          <div className="flex gap-2">
            <button onClick={handleReset}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center gap-2">
              <FaUndo /> Reset Defaults
            </button>
            <button onClick={handleSave} disabled={saving}
              className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-opacity-90 flex items-center gap-2 disabled:opacity-50">
              <FaSave /> {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Wedding Colour Palette */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">WAH Momentz Colour Palette</h2>
          <p className="text-sm text-gray-500 mb-6">
            These colors define the luxury wedding aesthetic across your entire website.
            Changes apply immediately after saving and refreshing.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {colorFields.map(({ key, label, description }) => (
              <div key={key} className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl hover:border-gray-200 transition">
                <div className="flex flex-col items-center gap-2 flex-shrink-0">
                  <input
                    type="color"
                    value={(theme[key] as string) || '#000000'}
                    onChange={(e) => handleColorChange(key, e.target.value)}
                    className="w-14 h-14 rounded-lg border-2 border-gray-200 cursor-pointer p-0.5"
                  />
                  <div
                    className="w-14 h-6 rounded border border-gray-200"
                    style={{ backgroundColor: (theme[key] as string) || '#000' }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
                  <input
                    type="text"
                    value={(theme[key] as string) || ''}
                    onChange={(e) => handleColorChange(key, e.target.value)}
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="#C9A96E"
                  />
                  <p className="text-xs text-gray-400 mt-1">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Preview Strip */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Colour Preview</h3>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            {colorFields.map(({ key, label }) => (
              <div key={key} className="text-center">
                <div
                  className="h-16 rounded-lg border border-gray-200 shadow-sm mb-2"
                  style={{ backgroundColor: (theme[key] as string) || '#000' }}
                />
                <p className="text-xs text-gray-500 leading-tight">{label.split(' ')[0]}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Typography Info */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
          <h3 className="text-sm font-semibold text-amber-800 mb-2">Typography</h3>
          <p className="text-sm text-amber-700">
            This website uses <strong>Cormorant Garamond</strong> (headings — luxury serif) and <strong>Jost</strong> (body — clean geometric).
            Fonts are loaded via Google Fonts and cannot be changed from this panel.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
