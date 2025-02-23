export interface ProjectType {
    id: string;
    name: string;
    description: string;
    image_url: string;
    github_url: string;
    live_url: string;
    tags: string[];
}

export interface SkillType {
    id: string;
    name: string;
    category: string;
}

export interface BlogType {
  id: string;
  title: string;
  description: string;
  image_url: string;
  date: string;
  type: 'internal' | 'external';
  url?: string;          // For external blogs
  platform?: string;     // For external blogs (e.g., "Medium", "Dev.to")
  slug?: string;         // For internal blogs
  content?: string;      // For internal blogs
}