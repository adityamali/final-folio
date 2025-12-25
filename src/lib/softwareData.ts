// Move software data to a shared location
import { Software } from '@/types/software';

export const softwareData: Software[] = [
  {
    id: '1',
    name: 'CodeSnap',
    tagline: 'Beautiful code screenshots',
    description: 'Create stunning code screenshots with custom themes, gradients, and watermarks. Perfect for social media and documentation.',
    icon: '📸',
    category: 'developer',
    price: 0,
    images: ['/placeholder-app.jpg'],
    features: [
      'Custom themes and gradients',
      'Multiple export formats',
      'Syntax highlighting for 100+ languages',
      'Watermark customization',
      'Auto-copy to clipboard',
      'Social media optimization'
    ],
    downloadUrl: '#',
    demoUrl: '#',
    githubUrl: '#',
    version: '1.2.0',
    releaseDate: '2024-12-01',
    platforms: ['web', 'mac', 'windows'],
    tags: ['developer', 'screenshot', 'code'],
    color: '#3b82f6',
    featured: true
  },
  {
    id: '2',
    name: 'FlowState',
    tagline: 'Minimal writing environment',
    description: 'Distraction-free writing with beautiful typography, dark mode, and export to multiple formats.',
    icon: '✍️',
    category: 'productivity',
    price: 9.99,
    images: ['/placeholder-app.jpg'],
    features: [
      'Distraction-free interface',
      'Beautiful typography',
      'Multiple export formats',
      'Auto-save and cloud sync',
      'Focus mode with timer',
      'Word count goals'
    ],
    downloadUrl: '#',
    version: '2.0.1',
    releaseDate: '2024-11-15',
    platforms: ['web', 'mac', 'windows', 'linux'],
    tags: ['writing', 'productivity', 'minimal'],
    color: '#8b5cf6'
  },
  {
    id: '3',
    name: 'ColorMix',
    tagline: 'AI-powered color palettes',
    description: 'Generate stunning color palettes with AI. Export to any format and integrate with your design workflow.',
    icon: '🎨',
    category: 'design',
    price: 0,
    images: ['/placeholder-app.jpg'],
    features: [
      'AI-generated palettes',
      'Export to multiple formats',
      'Color harmony analysis',
      'Accessibility checking',
      'Save favorites',
      'Browser extension'
    ],
    downloadUrl: '#',
    demoUrl: '#',
    githubUrl: '#',
    version: '1.5.3',
    releaseDate: '2024-10-20',
    platforms: ['web', 'mac', 'windows'],
    tags: ['design', 'colors', 'ai'],
    color: '#ec4899',
    featured: true
  },
  {
    id: '4',
    name: 'DevDocs',
    tagline: 'Smart documentation generator',
    description: 'Automatically generate beautiful documentation from your codebase with AI-powered insights.',
    icon: '📚',
    category: 'developer',
    price: 19.99,
    images: ['/placeholder-app.jpg'],
    features: [
      'AI-powered documentation',
      'Multiple output formats',
      'Custom themes',
      'Version control integration',
      'API documentation',
      'Interactive examples'
    ],
    downloadUrl: '#',
    version: '3.1.0',
    releaseDate: '2024-09-10',
    platforms: ['mac', 'windows', 'linux'],
    tags: ['developer', 'documentation', 'ai'],
    color: '#10b981'
  },
  {
    id: '5',
    name: 'TaskFlow',
    tagline: 'Visual task management',
    description: 'Kanban-style task management with time tracking, team collaboration, and beautiful visualizations.',
    icon: '✅',
    category: 'productivity',
    price: 14.99,
    images: ['/placeholder-app.jpg'],
    features: [
      'Kanban boards',
      'Time tracking',
      'Team collaboration',
      'Analytics dashboard',
      'Calendar integration',
      'Mobile apps'
    ],
    downloadUrl: '#',
    demoUrl: '#',
    version: '2.3.0',
    releaseDate: '2024-08-05',
    platforms: ['web', 'ios', 'android'],
    tags: ['productivity', 'tasks', 'team'],
    color: '#f59e0b',
    featured: true
  },
  {
    id: '6',
    name: 'APIBuilder',
    tagline: 'Visual API design tool',
    description: 'Design, test, and document APIs visually. Generate code in multiple languages instantly.',
    icon: '🔌',
    category: 'developer',
    price: 29.99,
    images: ['/placeholder-app.jpg'],
    features: [
      'Visual API designer',
      'Multi-language code generation',
      'Built-in testing',
      'Auto documentation',
      'Mock servers',
      'Team collaboration'
    ],
    downloadUrl: '#',
    version: '1.8.2',
    releaseDate: '2024-07-12',
    platforms: ['web', 'mac', 'windows'],
    tags: ['developer', 'api', 'tools'],
    color: '#06b6d4'
  }
];

export function getSoftwareById(id: string): Software | undefined {
  return softwareData.find(app => app.id === id);
}
