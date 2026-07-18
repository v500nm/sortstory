import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/_next/static/', '/api/'],
    },
    sitemap: 'https://sortstory.adnan-mangaonkar.com/sitemap.xml',
  }
}
