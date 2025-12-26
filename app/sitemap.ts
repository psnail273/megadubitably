import type { MetadataRoute } from 'next';
import type { GalleryImage } from '@/types/galleryImage';
import { promises as fs } from 'fs';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://megadubitably.com';

// Helper to collect all slugs including extras
function collectSlugs(data: GalleryImage[]): string[] {
  const slugs: string[] = [];
  
  for (const item of data) {
    if (!item.hidden) {
      slugs.push(item.slug);
    }
    if (item.extra) {
      for (const extra of item.extra) {
        if (!extra.hidden) {
          slugs.push(extra.slug);
        }
      }
    }
  }
  
  return slugs;
}

async function getDetailsJson(path: string): Promise<GalleryImage[]> {
  try {
    const file = await fs.readFile(`public/${path}/details.json`, 'utf8');
    return JSON.parse(file);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/comics`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/illustration`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Dynamic poster pages
  const postersData = await getDetailsJson('posters');
  const posterSlugs = collectSlugs(postersData);
  const posterPages: MetadataRoute.Sitemap = posterSlugs.map((slug) => ({
    url: `${BASE_URL}/poster/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Dynamic illustration pages
  const illustrationsData = await getDetailsJson('illustrations');
  const illustrationSlugs = collectSlugs(illustrationsData);
  const illustrationPages: MetadataRoute.Sitemap = illustrationSlugs.map((slug) => ({
    url: `${BASE_URL}/illustration/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...posterPages, ...illustrationPages];
}

