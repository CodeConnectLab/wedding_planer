'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import Link from 'next/link';
import {
  FaImages, FaTags, FaEnvelope, FaAd, FaCog, FaUser, FaBlog,
  FaQuestionCircle, FaStar, FaVideo, FaPalette,
} from 'react-icons/fa';
import { MdViewCarousel, MdEvent, MdDashboard } from 'react-icons/md';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    weddings: 0,
    contacts: 0,
    unreadContacts: 0,
    sliders: 0,
    adsSliders: 0,
    testimonials: 0,
    blogs: 0,
    services: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const [projectsRes, contactsRes, slidersRes, adsSlidersRes, testimonialsRes, blogsRes, servicesRes] =
          await Promise.all([
            fetch('/api/projects?admin=true'),
            fetch('/api/contact'),
            fetch('/api/slider?admin=true'),
            fetch('/api/ads-slider?admin=true'),
            fetch('/api/testimonials?admin=true'),
            fetch('/api/blogs?admin=true&limit=1'),
            fetch('/api/services?admin=true'),
          ]);

        const [weddings, contacts, sliders, adsSliders, testimonials, blogs, services] = await Promise.all([
          projectsRes.ok ? projectsRes.json() : [],
          contactsRes.ok ? contactsRes.json() : [],
          slidersRes.ok ? slidersRes.json() : [],
          adsSlidersRes.ok ? adsSlidersRes.json() : [],
          testimonialsRes.ok ? testimonialsRes.json() : [],
          blogsRes.ok ? blogsRes.json() : null,
          servicesRes.ok ? servicesRes.json() : [],
        ]);

        setStats({
          weddings: Array.isArray(weddings) ? weddings.length : 0,
          contacts: Array.isArray(contacts) ? contacts.length : 0,
          unreadContacts: Array.isArray(contacts) ? contacts.filter((c: any) => !c.isRead).length : 0,
          sliders: Array.isArray(sliders) ? sliders.length : 0,
          adsSliders: Array.isArray(adsSliders) ? adsSliders.length : 0,
          testimonials: Array.isArray(testimonials) ? testimonials.length : 0,
          blogs: blogs?.pagination?.total ?? 0,
          services: Array.isArray(services) ? services.length : 0,
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    }
    fetchStats();
  }, []);

  const statCards = [
    { label: 'Wedding Portfolio', value: stats.weddings, color: 'border-accent', textColor: 'text-accent', icon: FaImages },
    { label: 'Unread Inquiries', value: stats.unreadContacts, color: 'border-rose-500', textColor: 'text-rose-500', icon: FaEnvelope },
    { label: 'Hero Slides', value: stats.sliders, color: 'border-purple-500', textColor: 'text-purple-500', icon: MdViewCarousel },
    { label: 'Testimonials', value: stats.testimonials, color: 'border-yellow-500', textColor: 'text-yellow-500', icon: FaStar },
    { label: 'Blog Articles', value: stats.blogs, color: 'border-blue-500', textColor: 'text-blue-500', icon: FaBlog },
    { label: 'Services', value: stats.services, color: 'border-green-500', textColor: 'text-green-500', icon: MdEvent },
  ];

  const quickActions = [
    { title: 'Wedding Portfolio', desc: 'Manage wedding galleries and couples', href: '/admin/projects', icon: FaImages, color: 'bg-amber-600' },
    { title: 'Hero Slider', desc: 'Manage homepage hero slides', href: '/admin/slider', icon: MdViewCarousel, color: 'bg-purple-600' },
    { title: 'Ads Banner', desc: 'Manage promotional announcements', href: '/admin/ads-slider', icon: FaAd, color: 'bg-green-600' },
    { title: 'Services', desc: 'Manage all wedding service offerings', href: '/admin/services', icon: MdEvent, color: 'bg-blue-600' },
    { title: 'Categories', desc: 'Manage wedding style categories', href: '/admin/categories', icon: FaTags, color: 'bg-indigo-600' },
    { title: 'Blog', desc: 'Write and manage blog articles', href: '/admin/blogs', icon: FaBlog, color: 'bg-teal-600' },
    { title: 'Testimonials', desc: 'Manage couple testimonials', href: '/admin/testimonials', icon: FaStar, color: 'bg-yellow-600' },
    { title: 'FAQs', desc: 'Manage frequently asked questions', href: '/admin/faqs', icon: FaQuestionCircle, color: 'bg-orange-600' },
    { title: 'Videos', desc: 'Manage wedding video showcase', href: '/admin/videos', icon: FaVideo, color: 'bg-pink-600' },
    { title: 'Contact Inquiries', desc: 'View and respond to wedding inquiries', href: '/admin/contacts', icon: FaEnvelope, color: 'bg-red-600' },
    { title: 'Theme Settings', desc: 'Customise brand colours and fonts', href: '/admin/theme-settings', icon: FaPalette, color: 'bg-violet-600' },
    { title: 'Site & Contact Settings', desc: 'Phone, email, address, WhatsApp, social links & footer', href: '/admin/footer-settings', icon: FaCog, color: 'bg-gray-600' },
  ];

  return (
    <AdminLayout>
      <div>
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
            <MdDashboard className="text-amber-600 text-xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Wedding CMS Dashboard</h1>
            <p className="text-sm text-gray-500">WAH Momentz — Luxury Wedding Planners</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          {statCards.map((card) => (
            <div key={card.label} className={`bg-white p-5 rounded-xl shadow-sm border-l-4 ${card.color}`}>
              <div className="flex items-center justify-between mb-2">
                <card.icon className={`text-lg ${card.textColor}`} />
              </div>
              <p className={`text-3xl font-bold ${card.textColor}`}>{card.value}</p>
              <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{card.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-5 text-gray-900">Manage Content</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-gray-200 group"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-lg ${action.color} text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <action.icon className="text-base" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{action.title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{action.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Alerts */}
        {stats.unreadContacts > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
              <FaEnvelope className="text-amber-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-amber-900">
                {stats.unreadContacts} Unread Wedding {stats.unreadContacts === 1 ? 'Inquiry' : 'Inquiries'}
              </h3>
              <p className="text-sm text-amber-700 mt-1">New consultation requests are waiting for your response.</p>
            </div>
            <Link
              href="/admin/contacts"
              className="flex-shrink-0 bg-amber-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
            >
              View Inquiries
            </Link>
          </div>
        )}

        {/* System Status */}
        <div className="mt-6 bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <h2 className="font-bold text-gray-900 mb-4">System Status</h2>
          <div className="space-y-2.5">
            {[
              { label: 'Wedding Portfolio CMS', status: 'Active' },
              { label: 'Hero Slider System', status: 'Active' },
              { label: 'Dynamic Theme System', status: 'Active' },
              { label: 'Media Upload (Cloudinary)', status: 'Active' },
              { label: 'Contact Form & Lead Capture', status: 'Active' },
              { label: 'Blog CMS', status: 'Active' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{item.label}</span>
                <span className="flex items-center gap-1.5 text-green-600 font-medium">
                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
