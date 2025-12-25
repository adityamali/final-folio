'use client';

import { Software } from '@/types/software';
import AppCard from './AppCard';

interface AppShowcaseProps {
  apps: Software[];
  variant?: 'default' | 'featured';
}

export default function AppShowcase({ apps, variant = 'default' }: AppShowcaseProps) {
  if (apps.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-2xl text-zinc-500">No apps found in this category</p>
      </div>
    );
  }

  // Bento box layout for featured
  if (variant === 'featured') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
        {apps.map((app, index) => (
          <AppCard
            key={app.id}
            app={app}
            index={index}
            featured={index === 0 || index === 2}
          />
        ))}
      </div>
    );
  }

  // Standard grid layout
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {apps.map((app, index) => (
        <AppCard
          key={app.id}
          app={app}
          index={index}
          featured={false}
        />
      ))}
    </div>
  );
}
