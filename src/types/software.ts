export interface Software {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  category: 'productivity' | 'design' | 'developer' | 'utility' | 'ai' | 'other';
  price: number; // 0 for free
  images: string[];
  features: string[];
  downloadUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  version: string;
  releaseDate: string;
  platforms: ('web' | 'mac' | 'windows' | 'linux' | 'ios' | 'android')[];
  tags: string[];
  color: string; // Accent color for the card
  featured?: boolean;
}
