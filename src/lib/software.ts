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
 * Fetch software by ID or slug from Supabase
 */
export async function getSoftwareById(id: string): Promise<Software | null> {
  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
  try {
    if (isUUID) {
      const { data, error } = await supabase
        .from('software_full')
        .select('*')
        .eq('id', id)
        .single();

      if (!error && data) {
        return mapSupabaseSoftware(data);
      }
    }

    // Fallback to name search for human-readable slugs like /cafe/kill9, /cafe/macapult, /cafe/viora
    const { data: byName, error: nameError } = await supabase
      .from('software_full')
      .select('*')
      .ilike('name', `${id}%`)
      .limit(1);

    if (!nameError && byName && byName.length > 0) {
      return mapSupabaseSoftware(byName[0]);
    }
  } catch (err) {
    console.error('Error fetching software by ID:', err);
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
  return {
    id: data.id,
    name: data.name,
    tagline: data.tagline,
    description: data.description,
    icon: data.icon,
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
