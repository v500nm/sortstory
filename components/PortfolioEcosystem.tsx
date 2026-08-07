import React from 'react';

export function PortfolioEcosystem() {
  const ecosystem = [
    {
      domain: 'Adnan Consulting',
      baseUrl: 'https://adnan-mangaonkar.com',
      links: [
        { name: 'Home', path: '/' },
        { name: 'Solutions', path: '/solutions' },
        { name: 'AI Brain', path: '/ai-brain' },
        { name: 'Contact', path: '/contact' }
      ]
    },
    {
      domain: 'Adnan OS',
      baseUrl: 'https://aos.adnan-mangaonkar.com',
      links: [
        { name: 'Desktop', path: '/' },
        { name: 'Terminal', path: '/?app=terminal' },
        { name: 'Profile', path: '/?app=profile' }
      ]
    },
    {
      domain: 'SortStory',
      baseUrl: 'https://sortstory.adnan-mangaonkar.com',
      links: [
        { name: 'Algorithms', path: '/algorithms' },
        { name: 'Visualizer', path: '/visualizer' },
        { name: 'Big O Notation', path: '/learn/big-o' }
      ]
    },
    {
      domain: 'FinXpense',
      baseUrl: 'https://finxpense.adnan-mangaonkar.com',
      links: [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Wealth Simulator', path: '/simulator' },
        { name: 'Ledger', path: '/ledger' }
      ]
    },
    {
      domain: 'ourCloset',
      baseUrl: 'https://ourcloset.adnan-mangaonkar.com',
      links: [
        { name: 'Wardrobe AI', path: '/wardrobe' },
        { name: 'Dress Codes', path: '/dress-codes' },
        { name: 'Demo', path: '/demo' }
      ]
    },
    {
      domain: 'Brighter Side',
      baseUrl: 'https://brighter-side.adnan-mangaonkar.com',
      links: [
        { name: 'Wellness Hub', path: '/hub' },
        { name: 'Tools', path: '/tools' },
        { name: 'Privacy', path: '/privacy' }
      ]
    }
  ];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": ecosystem.flatMap((site, siteIndex) => 
      site.links.map((link, linkIndex) => ({
        "@type": "SiteNavigationElement",
        "position": (siteIndex * 10) + linkIndex + 1,
        "name": `${site.domain} - ${link.name}`,
        "url": `${site.baseUrl}${link.path}`
      }))
    )
  };

  return (
    <div className="mt-16 border-t border-gray-200 dark:border-gray-800 pt-12 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-center text-sm font-bold tracking-widest text-gray-900 dark:text-gray-100 uppercase mb-8">
          Adnan Mangaonkar Portfolio Ecosystem
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-sm">
          {ecosystem.map((site) => (
            <div key={site.domain} className="flex flex-col space-y-3">
              <span className="font-semibold text-gray-900 dark:text-gray-100">{site.domain}</span>
              <ul className="flex flex-col space-y-2">
                {site.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={`${site.baseUrl}${link.path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center text-xs text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Adnan Shafiq Mangaonkar. All rights reserved.
        </div>
      </div>
    </div>
  );
}
