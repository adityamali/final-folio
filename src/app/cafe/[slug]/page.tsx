import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSoftwareById } from '@/lib/software';
import AppDetailView from './AppDetailView';
import Kill9Page from '@/components/kill9/Kill9Page';
import { kill9 } from '@/lib/kill9';

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

  const isKill9 = app.slug === 'kill9' || app.name.toLowerCase() === 'kill9';

  const title = isKill9 ? kill9.title : `${app.name} — ${app.tagline}`;
  const description = isKill9 ? kill9.description : (app.description || `${app.name}: ${app.tagline}`);
  const canonicalUrl = isKill9 ? kill9.url : `https://www.adityamali.com/cafe/${app.slug || app.id}`;
  const ogImageUrl = `${canonicalUrl}/opengraph-image`;
  const keywords = isKill9 ? ['Kill9', 'macOS developer utility', 'local TCP ports', 'Aditya Mali'] : [app.name, app.category, ...(app.tags || [])];

  return {
    title: isKill9 ? { absolute: title } : title,
    description,
    keywords,
    authors: [{ name: 'Aditya Mali', url: 'https://www.adityamali.com' }],
    creator: 'Aditya Mali',
    publisher: 'Aditya Mali',
    robots: { index: true, follow: true, 'max-image-preview': 'large' },
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
    other: isKill9 ? undefined : {
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

  const isKill9 = app.slug === 'kill9' || app.name.toLowerCase() === 'kill9';
  const canonicalUrl = isKill9 ? kill9.url : `https://www.adityamali.com/cafe/${app.slug || app.id}`;
  const ogImageUrl = `${canonicalUrl}/opengraph-image`;
  const applicationId = `${canonicalUrl}#software`;
  const personId = 'https://www.adityamali.com/#person';
  const websiteId = 'https://www.adityamali.com/#website';
  const screenshots = app.images.filter((url) => url !== app.icon && !/kill9_icon|placeholder-app/.test(url));
  const softwareSchema = {
    '@type': 'SoftwareApplication',
    '@id': applicationId,
    name: app.name,
    ...(isKill9 ? {
      operatingSystem: kill9.operatingSystem,
      applicationCategory: 'DeveloperApplication',
      applicationSubCategory: 'macOS developer utility',
      featureList: [...kill9.features],
      sameAs: kill9.sourceUrl,
      softwareRequirements: 'macOS 13.0 or later; Apple silicon or Intel Mac',
    } : { applicationCategory: app.category }),
    description: isKill9 ? kill9.summary : app.description,
    // Kill9 pricing is omitted: no ratings, reviews, endorsements, or inferred offers.
    ...(!isKill9 ? { offers: { '@type': 'Offer', price: app.price.toString(), priceCurrency: 'USD' } } : {}),
    softwareVersion: app.version,
    url: canonicalUrl,
    ...(app.downloadUrl ? { downloadUrl: app.downloadUrl, installUrl: `${canonicalUrl}#installation` } : {}),
    image: app.icon.startsWith('http') ? app.icon : ogImageUrl,
    ...(screenshots.length ? { screenshot: screenshots } : {}),
    author: { '@id': personId },
    publisher: { '@id': personId },
    mainEntityOfPage: { '@id': `${canonicalUrl}#webpage` },
  };
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Person', '@id': personId, name: 'Aditya Mali', url: 'https://www.adityamali.com', },
      softwareSchema,
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: isKill9 ? kill9.title : `${app.name} — ${app.tagline}`,
        description: isKill9 ? kill9.description : app.description,
        inLanguage: 'en',
        isPartOf: { '@id': websiteId },
        mainEntity: { '@id': applicationId },
        author: { '@id': personId },
      },
    ],
  };

  // Google retired FAQ rich results in May 2026. Keep the FAQ visible without FAQPage/HowTo markup.
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      {isKill9 ? <Kill9Page app={app} /> : <AppDetailView app={app} initialSlug={slug} />}
    </>
  );
}
