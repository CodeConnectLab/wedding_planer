'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import Image from 'next/image';
import { FaPlus, FaEdit, FaTrash, FaUpload, FaStar } from 'react-icons/fa';

interface Service {
  _id: string;
  title: string;
  slug?: string;
  href?: string;
  category?: 'wedding' | 'event';
  icon?: string;
  image?: string;
  shortDescription?: string;
  description: string;
  features: string[];
  gallery?: string[];
  isFeatured?: boolean;
  order: number;
  isActive: boolean;
  createdAt: string;
}

const emptyService = {
  title: '',
  slug: '',
  href: '',
  category: 'wedding' as 'wedding' | 'event',
  icon: '💍',
  image: '',
  shortDescription: '',
  description: '',
  features: [''],
  gallery: [] as string[],
  isFeatured: false,
  order: 0,
  isActive: true
};

interface ProcessStep {
  _id: string;
  stepNumber: number;
  title: string;
  description: string;
  order: number;
  isActive: boolean;
}

export default function ServicesAdmin() {
  const [services, setServices] = useState<Service[]>([]);
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [showStepForm, setShowStepForm] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [editingStepId, setEditingStepId] = useState<string | null>(null);
  const [serviceFormData, setServiceFormData] = useState(emptyService);
  const [uploading, setUploading] = useState(false);
  const [stepFormData, setStepFormData] = useState({
    stepNumber: 1,
    title: '',
    description: '',
    order: 0,
    isActive: true
  });

  useEffect(() => {
    fetchServices();
    fetchProcessSteps();
  }, []);
  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services?admin=true');
      if (response.ok) {
        const data = await response.json();
        setServices(data);
      }
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProcessSteps = async () => {
    try {
      const response = await fetch('/api/process-steps?admin=true');
      if (response.ok) {
        const data = await response.json();
        setProcessSteps(data);
      }
    } catch (error) {
      console.error('Failed to fetch process steps:', error);
    }
  };

  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingServiceId ? `/api/services/${editingServiceId}` : '/api/services';
      const method = editingServiceId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...serviceFormData,
          features: serviceFormData.features.filter(f => f.trim() !== '')
        })
      });

      if (response.ok) {
        await fetchServices();
        resetServiceForm();
        alert(editingServiceId ? 'Service updated successfully!' : 'Service created successfully!');
      } else {
        const data = await response.json().catch(() => ({}));
        alert(data.error || 'Failed to save service');
      }
    } catch (error) {
      console.error('Failed to save service:', error);
      alert('Failed to save service');
    }
  };

  const handleStepSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingStepId ? `/api/process-steps/${editingStepId}` : '/api/process-steps';
      const method = editingStepId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stepFormData)
      });

      if (response.ok) {
        await fetchProcessSteps();
        resetStepForm();
        alert(editingStepId ? 'Process step updated successfully!' : 'Process step created successfully!');
      } else {
        const data = await response.json().catch(() => ({}));
        alert(data.error || 'Failed to save process step (step numbers must be unique)');
      }
    } catch (error) {
      console.error('Failed to save process step:', error);
      alert('Failed to save process step');
    }
  };
  const handleEditService = (service: Service) => {
    setServiceFormData({
      title: service.title,
      slug: service.slug || '',
      href: service.href || '',
      category: service.category || 'wedding',
      icon: service.icon || '💍',
      image: service.image || '',
      shortDescription: service.shortDescription || '',
      description: service.description,
      features: service.features.length ? service.features : [''],
      gallery: service.gallery || [],
      isFeatured: !!service.isFeatured,
      order: service.order,
      isActive: service.isActive
    });
    setEditingServiceId(service._id);
    setShowServiceForm(true);
  };

  const handleEditStep = (step: ProcessStep) => {
    setStepFormData({
      stepNumber: step.stepNumber,
      title: step.title,
      description: step.description,
      order: step.order,
      isActive: step.isActive
    });
    setEditingStepId(step._id);
    setShowStepForm(true);
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    
    try {
      const response = await fetch(`/api/services/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        await fetchServices();
        alert('Service deleted successfully!');
      }
    } catch (error) {
      console.error('Failed to delete service:', error);
      alert('Failed to delete service');
    }
  };

  const handleDeleteStep = async (id: string) => {
    if (!confirm('Are you sure you want to delete this process step?')) return;
    
    try {
      const response = await fetch(`/api/process-steps/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        await fetchProcessSteps();
        alert('Process step deleted successfully!');
      }
    } catch (error) {
      console.error('Failed to delete process step:', error);
      alert('Failed to delete process step');
    }
  };
  const uploadImage = async (file: File): Promise<string | null> => {
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert(data.error || 'Image upload failed');
      return null;
    }
    return (await res.json()).url;
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const url = await uploadImage(file);
    if (url) setServiceFormData((prev) => ({ ...prev, image: url }));
    setUploading(false);
    e.target.value = '';
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    const urls: string[] = [];
    for (const file of files) {
      const url = await uploadImage(file);
      if (url) urls.push(url);
    }
    setServiceFormData((prev) => ({ ...prev, gallery: [...prev.gallery, ...urls] }));
    setUploading(false);
    e.target.value = '';
  };

  const toggleService = async (service: Service, field: 'isActive' | 'isFeatured') => {
    const response = await fetch(`/api/services/${service._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [field]: !service[field] })
    });
    if (response.ok) fetchServices();
  };

  const resetServiceForm = () => {
    setServiceFormData(emptyService);
    setEditingServiceId(null);
    setShowServiceForm(false);
  };

  const resetStepForm = () => {
    setStepFormData({
      stepNumber: 1,
      title: '',
      description: '',
      order: 0,
      isActive: true
    });
    setEditingStepId(null);
    setShowStepForm(false);
  };

  const addFeature = () => {
    setServiceFormData({
      ...serviceFormData,
      features: [...serviceFormData.features, '']
    });
  };

  const removeFeature = (index: number) => {
    const newFeatures = serviceFormData.features.filter((_, i) => i !== index);
    setServiceFormData({
      ...serviceFormData,
      features: newFeatures.length > 0 ? newFeatures : ['']
    });
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...serviceFormData.features];
    newFeatures[index] = value;
    setServiceFormData({
      ...serviceFormData,
      features: newFeatures
    });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }
  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Services Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Services Management</h1>
            <button
              onClick={() => setShowServiceForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <FaPlus /> Add New Service
            </button>
          </div>

          {showServiceForm && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">
                {editingServiceId ? 'Edit Service' : 'Add New Service'}
              </h2>
              <form onSubmit={handleServiceSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={serviceFormData.title}
                    onChange={(e) => setServiceFormData({ ...serviceFormData, title: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={serviceFormData.category}
                      onChange={(e) => setServiceFormData({ ...serviceFormData, category: e.target.value as 'wedding' | 'event' })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="wedding">Wedding service</option>
                      <option value="event">Event / celebration</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Icon (emoji)</label>
                    <input
                      type="text"
                      value={serviceFormData.icon}
                      onChange={(e) => setServiceFormData({ ...serviceFormData, icon: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="🌸"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL slug</label>
                    <input
                      type="text"
                      value={serviceFormData.slug}
                      onChange={(e) => setServiceFormData({ ...serviceFormData, slug: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="auto from title"
                    />
                    <p className="text-xs text-gray-400 mt-1">Page: /services/{serviceFormData.slug || 'your-slug'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Display order</label>
                    <input
                      type="number"
                      value={serviceFormData.order}
                      onChange={(e) => setServiceFormData({ ...serviceFormData, order: parseInt(e.target.value) || 0 })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Custom link (optional)</label>
                  <input
                    type="text"
                    value={serviceFormData.href}
                    onChange={(e) => setServiceFormData({ ...serviceFormData, href: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="e.g. /destination-weddings — leave empty to use /services/<slug>"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Short description (cards)</label>
                  <textarea
                    rows={2}
                    maxLength={220}
                    value={serviceFormData.shortDescription}
                    onChange={(e) => setServiceFormData({ ...serviceFormData, shortDescription: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="One or two lines shown on the homepage and services cards"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cover image</label>
                  <div className="flex items-center gap-3">
                    <label className={`cursor-pointer px-4 py-2 rounded-md flex items-center gap-2 text-white ${uploading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}>
                      <FaUpload /> {uploading ? 'Uploading...' : 'Upload'}
                      <input type="file" accept="image/*" className="hidden" disabled={uploading} onChange={handleCoverUpload} />
                    </label>
                    <input
                      type="url"
                      value={serviceFormData.image}
                      onChange={(e) => setServiceFormData({ ...serviceFormData, image: e.target.value })}
                      className="flex-1 p-2 border border-gray-300 rounded-md"
                      placeholder="or paste an image URL"
                    />
                  </div>
                  {serviceFormData.image && (
                    <div className="relative w-48 h-28 mt-2 rounded overflow-hidden border">
                      <Image src={serviceFormData.image} alt="Cover" fill sizes="192px" className="object-cover" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gallery images (service page)</label>
                  <label className={`inline-flex cursor-pointer px-4 py-2 rounded-md items-center gap-2 text-white ${uploading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}>
                    <FaUpload /> Add images
                    <input type="file" accept="image/*" multiple className="hidden" disabled={uploading} onChange={handleGalleryUpload} />
                  </label>
                  {serviceFormData.gallery.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {serviceFormData.gallery.map((src, i) => (
                        <div key={src + i} className="relative w-24 h-16 rounded overflow-hidden border group">
                          <Image src={src} alt="" fill sizes="96px" className="object-cover" />
                          <button
                            type="button"
                            onClick={() => setServiceFormData({ ...serviceFormData, gallery: serviceFormData.gallery.filter((_, j) => j !== i) })}
                            className="absolute inset-0 bg-black/50 text-white text-xs opacity-0 group-hover:opacity-100"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-6">
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={serviceFormData.isFeatured}
                      onChange={(e) => setServiceFormData({ ...serviceFormData, isFeatured: e.target.checked })}
                    />
                    Show on homepage
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={serviceFormData.isActive}
                      onChange={(e) => setServiceFormData({ ...serviceFormData, isActive: e.target.checked })}
                    />
                    Active (visible on website)
                  </label>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full description (service page) *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={serviceFormData.description}
                    onChange={(e) => setServiceFormData({ ...serviceFormData, description: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Features
                  </label>
                  {serviceFormData.features.map((feature, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter feature"
                      />
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addFeature}
                    className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Add Feature
                  </button>
                </div>
                
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    {editingServiceId ? 'Update' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={resetServiceForm}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
        {/* Services List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Features
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {services.map((service) => (
                  <tr key={service._id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-16 h-10 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                          {service.image && <Image src={service.image} alt="" fill sizes="64px" className="object-cover" />}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{service.icon} {service.title}</div>
                          <div className="text-xs text-gray-400">
                            {service.category === 'event' ? 'Event' : 'Wedding'} · {service.href || `/services/${service.slug || ''}`}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 items-start">
                        <button
                          onClick={() => toggleService(service, 'isActive')}
                          className={`text-xs px-2 py-0.5 rounded-full ${service.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}
                        >
                          {service.isActive ? 'Active' : 'Hidden'}
                        </button>
                        <button
                          onClick={() => toggleService(service, 'isFeatured')}
                          className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${service.isFeatured ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-500'}`}
                        >
                          <FaStar className="text-[10px]" /> {service.isFeatured ? 'On homepage' : 'Not on homepage'}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">
                        {service.features.length} features
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {service.order}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditService(service)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteService(service._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {services.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No services found. Create your first one!</p>
          </div>
        )}
        {/* Process Steps Section */}
        <div className="space-y-6 border-t pt-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Process Steps</h2>
            <button
              onClick={() => setShowStepForm(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              <FaPlus /> Add Process Step
            </button>
          </div>

          {showStepForm && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                {editingStepId ? 'Edit Process Step' : 'Add New Process Step'}
              </h3>
              <form onSubmit={handleStepSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Step Number *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={stepFormData.stepNumber}
                      onChange={(e) => setStepFormData({ ...stepFormData, stepNumber: parseInt(e.target.value) })}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Order
                    </label>
                    <input
                      type="number"
                      value={stepFormData.order}
                      onChange={(e) => setStepFormData({ ...stepFormData, order: parseInt(e.target.value) })}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={stepFormData.title}
                    onChange={(e) => setStepFormData({ ...stepFormData, title: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={stepFormData.description}
                    onChange={(e) => setStepFormData({ ...stepFormData, description: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                  >
                    {editingStepId ? 'Update' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={resetStepForm}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
        {/* Process Steps List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Step #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {processSteps.map((step) => (
                  <tr key={step._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-2xl font-bold text-blue-600">{step.stepNumber.toString().padStart(2, '0')}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{step.title}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500 max-w-xs truncate">
                        {step.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditStep(step)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteStep(step._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {processSteps.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No process steps found. Create your first one!</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}