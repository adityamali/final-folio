import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSoftwareById } from '@/lib/software';
import AppDetailView from './AppDetailView';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const app = await getSoftwareById(slug);

  if (!app) {
    return {
      title: 'Tool Not Found | Software Café',
      description: 'The requested software tool could not be found.',
    };
  }

  const title = `${app.name} — ${app.tagline}`;
  const description = app.description || `${app.name}: ${app.tagline}`;
  const canonicalUrl = `https://adityamali.com/cafe/${app.slug || app.id}`;
  const ogImageUrl = `https://adityamali.com/cafe/${app.slug || app.id}/opengraph-image`;

  return {
    title,
    description,
    keywords: [
      app.name,
      app.category,
      ...(app.tags || []),
      'Software Café',
      'Aditya Mali',
      'Developer Tools',
      'macOS Apps'
    ],
    authors: [{ name: 'Aditya Mali', url: 'https://adityamali.com' }],
    creator: 'Aditya Mali',
    publisher: 'Aditya Mali',
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${app.name} — ${app.tagline}`,
      description,
      url: canonicalUrl,
      siteName: 'Aditya Mali • Software Café',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${app.name} — ${app.tagline}`,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${app.name} — ${app.tagline}`,
      description,
      creator: '@theadityamali',
      images: [ogImageUrl],
    },
    other: {
      'og:price:amount': app.price.toString(),
      'og:price:currency': 'USD',
      'product:category': app.category,
      'product:brand': 'Aditya Mali',
    },
  };
}

export default async function AppDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const app = await getSoftwareById(slug);

  if (!app) {
    notFound();
  }

  return <AppDetailView app={app} initialSlug={slug} />;
}
