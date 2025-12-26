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
  };
}

/**
 * Insert sample data into Supabase (for initial setup)
 */
export async function insertSampleSoftware() {
  // Sample software data
  const sampleSoftware = [
    {
      name: 'CodeSnap',
      tagline: 'Beautiful code screenshots',
      description: 'Create stunning code screenshots with custom themes, gradients, and watermarks. Perfect for social media and documentation.',
      icon: '📸',
      category: 'developer',
      price: 0,
      download_url: '#',
      demo_url: '#',
      github_url: '#',
      version: '1.2.0',
      release_date: '2024-12-01',
      color: '#3b82f6',
      featured: true
    },
    {
      name: 'FlowState',
      tagline: 'Minimal writing environment',
      description: 'Distraction-free writing with beautiful typography, dark mode, and export to multiple formats.',
      icon: '✍️',
      category: 'productivity',
      price: 9.99,
      download_url: '#',
      version: '2.0.1',
      release_date: '2024-11-15',
      color: '#8b5cf6',
      featured: false
    },
    {
      name: 'ColorMix',
      tagline: 'AI-powered color palettes',
      description: 'Generate stunning color palettes with AI. Export to any format and integrate with your design workflow.',
      icon: '🎨',
      category: 'design',
      price: 0,
      download_url: '#',
      demo_url: '#',
      github_url: '#',
      version: '1.5.3',
      release_date: '2024-10-20',
      color: '#ec4899',
      featured: true
    }
  ];

  for (const software of sampleSoftware) {
    // Insert main software record
    const { data: softwareData, error: softwareError } = await supabase
      .from('software')
      .insert(software)
      .select()
      .single();

    if (softwareError) {
      console.error('Error inserting software:', softwareError);
      continue;
    }

    const softwareId = softwareData.id;

    // Insert images
    const images = ['/placeholder-app.jpg'];
    for (let i = 0; i < images.length; i++) {
      await supabase.from('software_images').insert({
        software_id: softwareId,
        image_url: images[i],
        display_order: i
      });
    }

    // Insert features based on category
    const features = software.category === 'developer' 
      ? [
          'Custom themes and gradients',
          'Multiple export formats',
          'Syntax highlighting for 100+ languages',
          'Watermark customization',
          'Auto-copy to clipboard',
          'Social media optimization'
        ]
      : software.category === 'design'
      ? [
          'AI-generated palettes',
          'Export to multiple formats',
          'Color harmony analysis',
          'Accessibility checking',
          'Save favorites',
          'Browser extension'
        ]
      : [
          'Distraction-free interface',
          'Beautiful typography',
          'Multiple export formats',
          'Auto-save and cloud sync',
          'Focus mode with timer',
          'Word count goals'
        ];

    for (let i = 0; i < features.length; i++) {
      await supabase.from('software_features').insert({
        software_id: softwareId,
        feature: features[i],
        display_order: i
      });
    }

    // Insert platforms
    const platforms = ['web', 'mac', 'windows'];
    for (const platform of platforms) {
      await supabase.from('software_platforms').insert({
        software_id: softwareId,
        platform
      });
    }

    // Insert tags
    const tags = software.category === 'developer'
      ? ['developer', 'screenshot', 'code']
      : software.category === 'design'
      ? ['design', 'colors', 'ai']
      : ['writing', 'productivity', 'minimal'];

    for (const tag of tags) {
      await supabase.from('software_tags').insert({
        software_id: softwareId,
        tag
      });
    }
  }

  console.log('Sample software inserted successfully');
}
