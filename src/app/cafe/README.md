# The Café - Software Showcase

A beautifully designed app store page for showcasing your software creations with a unique designer portfolio aesthetic.

## Features

### 🎨 Design Highlights
- **Unique Portfolio Aesthetic**: Unlike traditional app stores, features a designer-first approach with custom gradients, smooth animations, and micro-interactions
- **Animated Background**: Floating gradient orbs that create a dynamic, living background
- **Glass-morphism Cards**: Modern card design with blur effects and subtle borders
- **Color-Coded Apps**: Each app has its own accent color that influences hover states and UI elements
- **Responsive Bento Grid**: Adaptive layout that works beautifully on all screen sizes

### ✨ Interactive Elements
- **Category Filtering**: Filter apps by category (all, productivity, design, developer, ai, utility)
- **Featured Section**: Highlight your best apps with larger, more prominent cards
- **Hover Animations**: Cards lift and scale on hover with color-matched shadows
- **Platform Indicators**: Visual icons showing which platforms each app supports
- **Smooth Transitions**: Framer Motion animations throughout for buttery smooth interactions

### 📱 App Card Features
Each app card displays:
- App icon (emoji or image)
- Name and tagline
- Description
- Key features (shown on hover or in featured cards)
- Tags
- Platform support icons
- Price badge (Free or $X.XX)
- Action buttons (Download/Buy, Demo, GitHub)
- Version and release date

## Components

### Main Page (`src/app/cafe/page.tsx`)
The main cafe page featuring:
- Hero section with animated title
- Category filter buttons
- Featured apps showcase
- All apps grid
- CTA section for custom work

### AppCard (`src/components/cafe/AppCard.tsx`)
Individual app card component with:
- Hover effects and animations
- Dynamic color theming per app
- Platform indicators
- Feature list
- Action buttons

### AppShowcase (`src/components/cafe/AppShowcase.tsx`)
Grid layout component for displaying multiple apps with responsive design

### AnimatedBackground (`src/components/cafe/AnimatedBackground.tsx`)
Animated gradient background with floating orbs and subtle grid overlay

## Data Structure

Apps are defined using the `Software` interface:

```typescript
interface Software {
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
  color: string;
  featured?: boolean;
}
```

## Customization

### Adding New Apps
Edit the `softwareData` array in `src/app/cafe/page.tsx`:

```typescript
{
  id: 'unique-id',
  name: 'Your App Name',
  tagline: 'Short catchy description',
  description: 'Longer description of what your app does',
  icon: '🎯', // emoji or image path
  category: 'productivity',
  price: 0, // or 9.99 for paid
  features: ['Feature 1', 'Feature 2', 'Feature 3'],
  downloadUrl: 'https://yourapp.com/download',
  version: '1.0.0',
  releaseDate: '2024-12-25',
  platforms: ['web', 'mac'],
  tags: ['productivity', 'tool'],
  color: '#3b82f6', // hex color for theming
  featured: true // optional
}
```

### Color Theming
Each app can have its own accent color. The color is used for:
- Price badge
- Accent bar at top of card
- Feature bullet points
- Primary action button
- Hover glow effect
- Card shadow on hover

### Categories
Available categories: `all`, `productivity`, `design`, `developer`, `ai`, `utility`

## Tech Stack
- **Next.js 15** - React framework
- **Framer Motion** - Animations
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **CSS Variables** - Theme integration

## Performance
- Uses Framer Motion's viewport detection for scroll-triggered animations
- Lazy loading animations prevent performance issues
- Optimized hover states with GPU-accelerated transforms
- Responsive images and layouts

## Future Enhancements
- Connect to a CMS or database for dynamic app data
- Add search functionality
- Implement app detail pages
- Add user reviews and ratings
- Include download/purchase analytics
- Add newsletter signup for new releases
