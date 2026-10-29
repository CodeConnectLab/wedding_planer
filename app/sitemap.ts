import { MetadataRoute } from 'next';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import Blog from '@/models/Blog';
import Service from '@/models/Service';

export const revalidate = 3600;

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  'https://www.wahmomentz.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let projects: any[] = [];
  let blogs: any[] = [];
  let services: any[] = [];
  try {
    await dbConnect();
    [projects, blogs, services] = await Promise.all([
      Project.find({ isPublished: true }).select('slug updatedAt').lean(),
      Blog.find({ isPublished: true }).select('slug updatedAt publishedAt').lean(),
      Service.find({ isActive: true, href: { $in: ['', null] } }).select('slug updatedAt').lean(),
    ]);
  } catch (error) {
    console.error('Sitemap: database unavailable', error);
  }

  const weddingUrls = (projects as any[]).map((p) => ({
    url: `${baseUrl}/gallery/${p.slug}`,
    lastModified: p.updatedAt || new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const blogUrls = (blogs as any[]).map((b) => ({
    url: `${baseUrl}/blogs/${b.slug}`,
    lastModified: b.updatedAt || b.publishedAt || new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const staticPages = [
    { url: baseUrl, priority: 1, changeFrequency: 'daily' as const },
    { url: `${baseUrl}/about`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/services`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/gallery`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/destination-weddings`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/bachelor-party`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/blogs`, priority: 0.8, changeFrequency: 'daily' as const },
    { url: `${baseUrl}/faqs`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/contact`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/privacy-policy`, priority: 0.3, changeFrequency: 'yearly' as const },
    { url: `${baseUrl}/terms`, priority: 0.3, changeFrequency: 'yearly' as const },
    { url: `${baseUrl}/videos`, priority: 0.5, changeFrequency: 'monthly' as const },
  ];

  const serviceUrls = (services as any[])
    .filter((s) => s.slug)
    .map((s) => ({
      url: `${baseUrl}/services/${s.slug}`,
      lastModified: s.updatedAt || new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

  return [
    ...staticPages.map((p) => ({ ...p, lastModified: new Date() })),
    ...serviceUrls,
    ...weddingUrls,
    ...blogUrls,
  ];
}
