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

  const isKill9 = app.slug === 'kill9' || app.name.toLowerCase().includes('kill9');

  const title = isKill9
    ? 'Kill9 — How to Kill Running Server Ports on macOS (Stop Port 3000, 8080)'
    : `${app.name} — ${app.tagline}`;

  const description = isKill9
    ? 'The fastest way to kill hung development server ports (port 3000, 8080, 5173) and fix EADDRINUSE errors on macOS. A native menu bar utility with zero terminal commands.'
    : (app.description || `${app.name}: ${app.tagline}`);

  const canonicalUrl = `https://adityamali.com/cafe/${app.slug || app.id}`;
  const ogImageUrl = `https://adityamali.com/cafe/${app.slug || app.id}/opengraph-image`;

  const keywords = isKill9
    ? [
        'how to kill running server port',
        'kill port mac',
        'how to kill port 3000',
        'kill running dev server',
        'EADDRINUSE 3000',
        'kill port macos',
        'stop hung process port',
        'lsof kill 9 alternative',
        'free up port mac',
        'kill9 mac app',
        'macOS menu bar dev ports',
        'Aditya Mali',
        'Software Café',
      ]
    : [
        app.name,
        app.category,
        ...(app.tags || []),
        'Software Café',
        'Aditya Mali',
        'Developer Tools',
        'macOS Apps',
      ];

  return {
    title,
    description,
    keywords,
    authors: [{ name: 'Aditya Mali', url: 'https://adityamali.com' }],
    creator: 'Aditya Mali',
    publisher: 'Aditya Mali',
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
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
      title,
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

  const isKill9 = app.slug === 'kill9' || app.name.toLowerCase().includes('kill9');
  const canonicalUrl = `https://adityamali.com/cafe/${app.slug || app.id}`;
  const ogImageUrl = `https://adityamali.com/cafe/${app.slug || app.id}/opengraph-image`;

  // SoftwareApplication JSON-LD Schema
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: app.name,
    operatingSystem: 'macOS 14.0 or later',
    applicationCategory: 'DeveloperApplication',
    description: app.description,
    offers: {
      '@type': 'Offer',
      price: app.price.toString(),
      priceCurrency: 'USD',
    },
    url: canonicalUrl,
    downloadUrl: app.downloadUrl,
    image: ogImageUrl,
    author: {
      '@type': 'Person',
      name: 'Aditya Mali',
      url: 'https://adityamali.com',
    },
  };

  // Specialized FAQ and HowTo schemas for Kill9 to optimize for AI Answer Engines & Google AI Overviews
  const faqSchema = isKill9
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How do I kill a running server port on Mac?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The easiest way to kill a running dev server port on macOS without remembering terminal commands is to use Kill9, a free menu bar utility that lists active TCP listeners and allows you to terminate them with one click. Alternatively, run the terminal command: lsof -ti :<PORT> | xargs kill -9 (for example: lsof -ti :3000 | xargs kill -9).',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I fix "Error: listen EADDRINUSE: address already in use :::3000"?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The EADDRINUSE :::3000 error happens when a previous development server (Node.js, Next.js, Vite) failed to shut down properly and is still holding port 3000. You can stop the lingering process immediately using the Kill9 macOS menu bar app, or by running lsof -ti :3000 | xargs kill -9 in your terminal.',
            },
          },
          {
            '@type': 'Question',
            name: 'How is Kill9 safer than kill -9 in the terminal?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Kill9 sends a graceful SIGTERM signal first, allowing the dev server to release database connections and cleanup locks. It only falls back to a forceful SIGKILL (kill -9) if the hung process does not respond within a timeout. Terminal kill -9 immediately terminates processes forcefully without cleanup.',
            },
          },
          {
            '@type': 'Question',
            name: 'Which ports does Kill9 support?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Kill9 supports all TCP ports used in web and backend development, including 3000 (React, Next.js), 5173 (Vite), 8080 (Java, Web servers), 8000 (Django, Python), 4200 (Angular), 8888, and custom dev ports.',
            },
          },
        ],
      }
    : null;

  const howToSchema = isKill9
    ? {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'How to Kill a Running Server Port on macOS',
        description: 'Step-by-step guide to stopping hung development ports like 3000, 8080, or 5173 on macOS using Kill9 or Terminal.',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Open Kill9 in macOS menu bar',
            text: 'Click the Kill9 status icon in your macOS menu bar to view active TCP dev servers.',
          },
          {
            '@type': 'HowToStep',
            name: 'Locate the blocked port and project',
            text: 'Find the port number (e.g. 3000) and verify the detected project directory name.',
          },
          {
            '@type': 'HowToStep',
            name: 'Click Kill to free the port',
            text: 'Click the Kill button to safely terminate the process and immediately free the port.',
          },
        ],
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {howToSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      )}
      <AppDetailView app={app} initialSlug={slug} />
    </>
  );
}
