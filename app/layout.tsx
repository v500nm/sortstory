import type { Metadata, Viewport } from "next";
import "./globals.css";

/* ------------------------------------------
   VIEWPORT SETTINGS
------------------------------------------- */
export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

/* ------------------------------------------
   1️⃣ METADATA — SEO & Autocomplete Engine
------------------------------------------- */
const BASE_URL = "https://sortstory.adnan-mangaonkar.com";
const FULL_NAME = "Adnan Shafiq Mangaonkar";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "SortStory | Interactive Algorithms by Adnan Shafiq Mangaonkar",
    template: `%s | SortStory`,
  },
  description:
    "SortStory is an interactive DSA visualization tool for Sorting and Pathfinding Algorithms, built by Adnan Shafiq Mangaonkar (Software Developer SDE1).",

  // 🟢 KEYWORDS: Optimized for Google Autocomplete trigger patterns
  keywords: [
    "Sorting Visualizer",
    "Pathfinding Visualizer",
    "Algorithm Visualizer",
    "Data Structures and Algorithms",
    "Adnan Mangaonkar",
    "Adnan Shafiq Mangaonkar",
    "Next.js Developer",
    "MERN Stack Developer",
    "React.js Expert",
    "Software Developer SDE1"
  ],

  authors: [{ name: FULL_NAME, url: "https://adnan-mangaonkar.com" }],
  creator: FULL_NAME,
  publisher: FULL_NAME,

  // 🟢 ROBOTS
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // 🟢 ICONS
  icons: {
    icon: [
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/assets/apple-touch-icon.png", sizes: "180x180" }],
  },

  // 🟢 SOCIAL CARDS
  openGraph: {
    type: "website",
    url: BASE_URL,
    title: "SortStory | Interactive Algorithms by Adnan Shafiq Mangaonkar",
    description: "Interactive visualization tool for Sorting and Pathfinding algorithms.",
    siteName: "SortStory",
    images: [
      {
        url: "/assets/sortviz.png",
        width: 1200,
        height: 630,
        alt: "SortStory Visualizer",
      },
    ],
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "SortStory | Interactive Algorithms",
    description: "Master algorithms visually. Built by @V350NM",
    images: ["/assets/sortviz.png"],
    creator: "@V350NM",
  },

  alternates: {
    canonical: BASE_URL,
  },
};

/* ------------------------------------------
   3️⃣ JSON-LD — The Knowledge Graph Configuration
------------------------------------------- */
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${BASE_URL}/#webapp`,
    name: "SortStory",
    url: BASE_URL,
    description: "An interactive visualization tool for Data Structures and Algorithms.",
    applicationCategory: "EducationalApplication",
    author: {
      "@type": "Person",
      name: "Adnan Shafiq Mangaonkar",
      url: "https://adnan-mangaonkar.com"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `https://adnan-mangaonkar.com/#person`,
    name: "Adnan Shafiq Mangaonkar",
    url: "https://adnan-mangaonkar.com",
    jobTitle: "Software Developer (SDE1)",
    sameAs: [
      "https://www.linkedin.com/in/adnan-mangaonkar-523351167/",
      "https://github.com/v500nm",
      "https://x.com/V350NM",
      "https://adnan-mangaonkar.com"
    ]
  }
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
