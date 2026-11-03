import type { MetadataRoute } from 'next';
import { getAllSoftware } from '@/lib/software';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export const revalidate = 3600; // Revalidate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://adityamali.com';

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/cafe`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cafe/kill9`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0, // High priority for Kill9 port-killing authority
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Dynamic software routes
  let softwareRoutes: MetadataRoute.Sitemap = [];
  try {
    const softwareList = await getAllSoftware();
    softwareRoutes = softwareList.map((app) => ({
      url: `${baseUrl}/cafe/${app.slug || app.id}`,
      lastModified: app.releaseDate ? new Date(app.releaseDate) : new Date(),
      changeFrequency: 'weekly',
      priority: app.name.toLowerCase() === 'kill9' ? 1.0 : 0.85,
    }));
  } catch (err) {
    console.warn('Error generating software sitemap:', err);
  }

  // Dynamic blog routes
  let blogRoutes: MetadataRoute.Sitemap = [];
  if (isSupabaseConfigured) {
    try {
      const { data: posts } = await supabase
        .from('posts')
        .select('slug, updated_at, created_at')
        .eq('published', true);

      if (posts) {
        blogRoutes = posts.map((post) => ({
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: post.updated_at ? new Date(post.updated_at) : new Date(post.created_at),
          changeFrequency: 'monthly',
          priority: 0.75,
        }));
      }
    } catch (err) {
      console.warn('Error generating blog sitemap:', err);
    }
  }

  // Deduplicate routes by URL
  const allRoutes = [...staticRoutes, ...softwareRoutes, ...blogRoutes];
  const uniqueRoutesMap = new Map<string, (typeof allRoutes)[0]>();
  for (const route of allRoutes) {
    uniqueRoutesMap.set(route.url, route);
  }

  return Array.from(uniqueRoutesMap.values());
}

