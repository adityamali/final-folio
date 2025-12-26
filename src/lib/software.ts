import { supabase } from './supabase';
import { Software } from '@/types/software';

/**
 * Fetch all software from Supabase
 */
export async function getAllSoftware(): Promise<Software[]> {
  const { data, error } = await supabase
    .from('software_full')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching software:', error);
    return [];
  }

  return (data || []).map(mapSupabaseSoftware);
}

/**
 * Fetch software by ID from Supabase
 */
export async function getSoftwareById(id: string): Promise<Software | null> {
  console.log('Fetching software with ID:', id);
  const { data, error } = await supabase
    .from('software_full')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching software by ID:', error);
    console.error('Error details:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code
    });
    return null;
  }

  console.log('Successfully fetched software:', data);
  return data ? mapSupabaseSoftware(data) : null;
}

/**
 * Fetch featured software from Supabase
 */
export async function getFeaturedSoftware(): Promise<Software[]> {
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
}

/**
 * Fetch software by category from Supabase
 */
export async function getSoftwareByCategory(category: string): Promise<Software[]> {
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
    downloadUrl: data.download_url,
    demoUrl: data.demo_url,
    githubUrl: data.github_url,
    version: data.version,
    releaseDate: data.release_date,
    platforms: Array.isArray(data.platforms) ? data.platforms : [],
    tags: Array.isArray(data.tags) ? data.tags : [],
    color: data.color,
    featured: data.featured || false,
    download_size: data.download_size || null
  };
}
