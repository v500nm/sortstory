import React from 'react';

export function PortfolioEcosystem() {
  const properties = [
    { name: 'Adnan Consulting', url: 'https://adnan-mangaonkar.com' },
    { name: 'Adnan OS', url: 'https://aos.adnan-mangaonkar.com' },
    { name: 'SortStory', url: 'https://sortstory.adnan-mangaonkar.com' },
    { name: 'FinXpense', url: 'https://finxpense.adnan-mangaonkar.com' },
    { name: 'ourCloset', url: 'https://ourcloset.adnan-mangaonkar.com' },
    { name: 'Brighter Side', url: 'https://brighter-side.adnan-mangaonkar.com' }
  ];

  return (
    <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8 pb-12 text-center text-sm text-gray-500 dark:text-gray-400">
      <p className="mb-4 text-gray-900 dark:text-gray-100 font-semibold tracking-wide uppercase text-xs">Adnan Mangaonkar Portfolio Ecosystem</p>
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
        {properties.map((prop) => (
          <a
            key={prop.url}
            href={prop.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {prop.name}
          </a>
        ))}
      </div>
      <p className="mt-6 text-xs">&copy; {new Date().getFullYear()} Adnan Shafiq Mangaonkar. All rights reserved.</p>
    </div>
  );
}
