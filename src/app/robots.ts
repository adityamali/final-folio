import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/*'],
      },
      {
        userAgent: [
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'Google-Extended',
          'Applebot-Extended',
          'Googlebot',
          'Bingbot',
          'CCBot',
          'cohere-ai',
        ],
        allow: '/',
        disallow: ['/admin', '/admin/*'],
      },
    ],
    sitemap: 'https://adityamali.com/sitemap.xml',
  };
}
