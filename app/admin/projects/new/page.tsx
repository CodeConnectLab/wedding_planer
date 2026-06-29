'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';
import Image from 'next/image';

const weddingStyles = [
  'Royal Heritage', 'Garden Elegance', 'Destination Beach', 'Modern Minimalist',
  'Boho Chic', 'Traditional Rajasthani', 'Contemporary Luxury', 'Forest Retreat',
];

export default function NewProjectPage() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    brideName: '',
    groomName: '',
    weddingDate: '',
    venue: '',
    weddingStyle: '',
    guestCount: '',
    videoUrl: '',
    isFeatured: false,
    isPublished: true,
    images: [] as string[],
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  useEffect(() => { fetchCategories(); }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file =>
      ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)
    );
    if (validFiles.length !== files.length) {
      alert('Some files were skipped. Only JPEG, PNG, WebP, and GIF files are allowed.');
    }
    setImageFiles(prev => [...prev, ...validFiles]);
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreviews(prev => [...prev, reader.result as string]);
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async () => {
    const uploadedUrls: string[] = [];
    for (const file of imageFiles) {
      const fd = new FormData();
      fd.append('file', file);
      try {
        const res = await fetch('/api/upload', { method: 'POST', body: fd });
        const data = await res.json();
        if (res.ok && data.success) {
          uploadedUrls.push(data.url);
        } else {
          alert(`Failed to upload ${file.name}: ${data.error || 'Unknown error'}`);
        }
      } catch {
        alert(`Failed to upload ${file.name}: Network error`);
      }
    }
    return uploadedUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (imageFiles.length === 0) { alert('Please select at least one image'); return; }
    setLoading(true);
    setUploading(true);
    try {
      const imageUrls = await uploadImages();
      if (imageUrls.length === 0) {
        alert('Failed to upload images');
        return;
      }
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          images: imageUrls,
          guestCount: formData.guestCount ? parseInt(formData.guestCount) : undefined,
          weddingDate: formData.weddingDate || undefined,
        }),
      });
      if (res.ok) {
        alert('Wedding added successfully!');
        window.location.href = '/admin/projects';
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to add wedding');
      }
    } catch {
      alert('Failed to add wedding');
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  const inputClass = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold mb-8">Add Wedding Portfolio Entry</h1>
        <div className="bg-white rounded-lg shadow p-8 max-w-3xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="border-b border-gray-100 pb-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className={labelClass}>Wedding Title *</label>
                  <input name="title" type="text" required value={formData.title} onChange={handleChange}
                    className={inputClass} placeholder="e.g., Priya & Arjun's Royal Heritage Wedding" />
                </div>
                <div>
                  <label className={labelClass}>Category *</label>
                  <select name="category" required value={formData.category} onChange={handleChange} className={inputClass}>
                    <option value="">Select Category</option>
                    {categories.map((cat: any) => (
                      <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Wedding Style</label>
                  <select name="weddingStyle" value={formData.weddingStyle} onChange={handleChange} className={inputClass}>
                    <option value="">Select Style</option>
                    {weddingStyles.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Description</label>
                  <textarea name="description" value={formData.description} onChange={handleChange}
                    rows={3} className={inputClass}
                    placeholder="A beautiful description of this wedding celebration..." />
                </div>
              </div>
            </div>

            {/* Couple Details */}
            <div className="border-b border-gray-100 pb-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Couple Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Bride's Name</label>
                  <input name="brideName" type="text" value={formData.brideName} onChange={handleChange}
                    className={inputClass} placeholder="Priya Sharma" />
                </div>
                <div>
                  <label className={labelClass}>Groom's Name</label>
                  <input name="groomName" type="text" value={formData.groomName} onChange={handleChange}
                    className={inputClass} placeholder="Arjun Kapoor" />
                </div>
                <div>
                  <label className={labelClass}>Wedding Date</label>
                  <input name="weddingDate" type="date" value={formData.weddingDate} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Guest Count</label>
                  <input name="guestCount" type="number" value={formData.guestCount} onChange={handleChange}
                    className={inputClass} placeholder="350" />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Venue</label>
                  <input name="venue" type="text" value={formData.venue} onChange={handleChange}
                    className={inputClass} placeholder="The Oberoi Udaivilas, Udaipur" />
                </div>
              </div>
            </div>

            {/* Media */}
            <div className="border-b border-gray-100 pb-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Media</h2>
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Upload Images * (Multiple allowed)</label>
                  <input type="file" accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                    multiple onChange={handleImageSelect} className={inputClass} />
                  <p className="text-xs text-gray-500 mt-1">First image will be used as the cover photo.</p>
                </div>
                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-3 gap-3">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <div className="relative h-28 rounded-lg overflow-hidden">
                          <Image src={preview} alt={`Preview ${index + 1}`} fill className="object-cover" />
                          {index === 0 && (
                            <div className="absolute bottom-1 left-1 bg-accent text-white text-xs px-2 py-0.5 rounded">Cover</div>
                          )}
                        </div>
                        <button type="button" onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition">
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div>
                  <label className={labelClass}>Video URL (YouTube or Vimeo)</label>
                  <input name="videoUrl" type="url" value={formData.videoUrl} onChange={handleChange}
                    className={inputClass} placeholder="https://youtube.com/watch?v=..." />
                </div>
              </div>
            </div>

            {/* Settings */}
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Settings</h2>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input name="isPublished" type="checkbox" checked={formData.isPublished}
                    onChange={handleChange} className="w-4 h-4 accent-accent" />
                  <span className="text-sm font-medium text-gray-700">Published</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input name="isFeatured" type="checkbox" checked={formData.isFeatured}
                    onChange={handleChange} className="w-4 h-4 accent-accent" />
                  <span className="text-sm font-medium text-gray-700">Featured on homepage</span>
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <button type="submit" disabled={loading}
                className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-opacity-90 transition disabled:opacity-50">
                {uploading ? 'Uploading Images...' : loading ? 'Saving...' : 'Add Wedding'}
              </button>
              <button type="button" onClick={() => router.push('/admin/projects')}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
