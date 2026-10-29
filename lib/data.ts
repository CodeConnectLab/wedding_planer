import dbConnect from '@/lib/mongodb';
import FooterSettings from '@/models/FooterSettings';
import Slider from '@/models/Slider';
import Project from '@/models/Project';
import Service from '@/models/Service';
import ProcessStep from '@/models/ProcessStep';
import Testimonial from '@/models/Testimonial';
import Blog from '@/models/Blog';
import Category from '@/models/Category';
import { mergeSiteSettings, SiteSettings } from '@/lib/siteDefaults';

export { serviceHref } from '@/lib/siteDefaults';

// Server-side reads for pages rendered from admin-managed content. Every helper degrades
// to an empty/default value so a database hiccup never takes the public site down.

const plain = <T>(doc: unknown): T => JSON.parse(JSON.stringify(doc));

async function safe<T>(label: string, fallback: T, fn: () => Promise<T>): Promise<T> {
  try {
    await dbConnect();
    return await fn();
  } catch (error) {
    console.error(`[data] ${label} failed:`, (error as Error).message);
    return fallback;
  }
}

export function getSiteSettings(): Promise<SiteSettings> {
  return safe('site settings', mergeSiteSettings(null), async () =>
    mergeSiteSettings(plain(await FooterSettings.findOne().lean()))
  );
}

export function getSliders() {
  return safe('sliders', [] as any[], async () =>
    plain(await Slider.find({ isActive: { $ne: false } }).sort({ order: 1, createdAt: 1 }).lean())
  );
}

export function getProjects(limit?: number) {
  return safe('projects', [] as any[], async () => {
    const q = Project.find({ isPublished: { $ne: false } })
      .populate('category', 'name slug')
      .sort({ isFeatured: -1, createdAt: -1 });
    if (limit) q.limit(limit);
    return plain(await q.lean());
  });
}

export function getCategories() {
  return safe('categories', [] as any[], async () => plain(await Category.find().sort({ name: 1 }).lean()));
}

export function getServices() {
  return safe('services', [] as any[], async () =>
    plain(await Service.find({ isActive: true }).sort({ order: 1, createdAt: 1 }).lean())
  );
}

export function getServiceBySlug(slug: string) {
  return safe('service', null as any, async () => plain(await Service.findOne({ slug, isActive: true }).lean()));
}

export function getProcessSteps() {
  return safe('process steps', [] as any[], async () =>
    plain(await ProcessStep.find({ isActive: true }).sort({ order: 1, stepNumber: 1 }).lean())
  );
}

export function getTestimonials(limit = 9) {
  return safe('testimonials', [] as any[], async () =>
    plain(
      await Testimonial.find({ isPublished: true })
        .sort({ isFeatured: -1, order: 1, createdAt: -1 })
        .limit(limit)
        .lean()
    )
  );
}

export function getLatestBlogs(limit = 3) {
  return safe('blogs', [] as any[], async () =>
    plain(
      await Blog.find({ isPublished: true })
        .sort({ publishedAt: -1 })
        .limit(limit)
        .select('title slug excerpt featuredImage author category publishedAt readTime')
        .lean()
    )
  );
}
