import { supabase } from './supabase';
import { Software } from '@/types/software';

/**
 * Fetch all software from Supabase
 */
export async function getAllSoftware(): Promise<Software[]> {
  try {
    const { data, error } = await supabase
      .from('software_full')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching software:', error);
      return [];
    }

    return (data || []).map(mapSupabaseSoftware);
  } catch (err) {
    console.error('Error in getAllSoftware:', err);
    return [];
  }
}

/**
 * Convert app name to clean URL slug (e.g. 'Kill9' -> 'kill9', 'Viora - VS Code Theme' -> 'viora')
 */
export function slugify(text: string): string {
  const primary = (text || '').split(/[-–—:]/)[0].trim();
  const slug = primary.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return slug || (text || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

/**
 * Fetch software by ID or slug from Supabase
 */
export async function getSoftwareById(idOrSlug: string): Promise<Software | null> {
  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrSlug);
  try {
    if (isUUID) {
      const { data, error } = await supabase
        .from('software_full')
        .select('*')
        .eq('id', idOrSlug)
        .single();

      if (!error && data) {
        return mapSupabaseSoftware(data);
      }
    }

    // Try name match directly or by prefix (e.g. /cafe/kill9, /cafe/macapult, /cafe/viora)
    const cleanSlug = idOrSlug.toLowerCase().trim();
    const prefix = cleanSlug.split('-')[0];

    const { data: byName, error: nameError } = await supabase
      .from('software_full')
      .select('*')
      .or(`name.ilike.${cleanSlug}%,name.ilike.${prefix}%`)
      .limit(5);

    if (!nameError && byName && byName.length > 0) {
      // Find closest slug match
      const matched = byName.find((item: any) => {
        const itemSlug = item.slug || slugify(item.name);
        return itemSlug === cleanSlug || item.name.toLowerCase().startsWith(cleanSlug);
      }) || byName[0];

      return mapSupabaseSoftware(matched);
    }
  } catch (err) {
    console.error('Error fetching software by ID or slug:', err);
  }

  return null;
}

/**
 * Fetch featured software from Supabase
 */
export async function getFeaturedSoftware(): Promise<Software[]> {
  try {
    const { data, error } = await supabase
      .from('software_full')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching featured software:', error);
      return [];
    }

    return (data || []).map(mapSupabaseSoftware);
  } catch (err) {
    console.error('Error in getFeaturedSoftware:', err);
    return [];
  }
}

/**
 * Fetch software by category from Supabase
 */
export async function getSoftwareByCategory(category: string): Promise<Software[]> {
  try {
    const { data, error } = await supabase
      .from('software_full')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching software by category:', error);
      return [];
    }

    return (data || []).map(mapSupabaseSoftware);
  } catch (err) {
    console.error('Error in getSoftwareByCategory:', err);
    return [];
  }
}

/**
 * Map Supabase data to Software type
 */
function mapSupabaseSoftware(data: any): Software {
  let icon = data.icon;
  // Fallback if Kill9 icon in Supabase is set to kill9.png instead of kill9_icon.png
  if (icon && typeof icon === 'string' && icon.includes('Kill9/kill9.png')) {
    icon = icon.replace('Kill9/kill9.png', 'Kill9/kill9_icon.png');
  }

  const slug = data.slug || slugify(data.name || '');

  return {
    id: data.id,
    slug,
    name: data.name,
    tagline: data.tagline,
    description: data.description,
    icon: icon,
    category: data.category,
    price: parseFloat(data.price) || 0,
    images: Array.isArray(data.images) ? data.images : [],
    features: Array.isArray(data.features) ? data.features : [],
    downloadUrl: data.download_url || undefined,
    demoUrl: data.demo_url || undefined,
    githubUrl: data.github_url || undefined,
    buyMeACoffeeUrl: (data.buymeacoffee_url || data.buy_me_a_coffee_url || data.buymeacoffee || '')?.trim() || undefined,
    version: data.version,
    releaseDate: data.release_date,
    platforms: Array.isArray(data.platforms) ? data.platforms : [],
    tags: Array.isArray(data.tags) ? data.tags : [],
    color: data.color || '#FF3B30',
    featured: data.featured || false,
    download_size: data.download_size || null
  };
}
