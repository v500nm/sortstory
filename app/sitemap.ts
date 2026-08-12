import { MetadataRoute } from "next";
import { getAllTopics, getAlgorithmsByTopic } from "@/lib/markdown";

export default function sitemap(): MetadataRoute.Sitemap {
  const rawBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sortstory.adnan-mangaonkar.com";
  // Ensure no trailing slashes on base URL
  const baseUrl = rawBaseUrl.replace(/\/+$/, "");

  // Helper function to build clean URLs without duplicate slashes
  const buildUrl = (path: string) => {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `${baseUrl}${cleanPath}`.replace(/([^:]\/)\/+/g, "$1");
  };

  const lastModified = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: buildUrl("/"), lastModified, changeFrequency: "daily", priority: 1.0 },
    { url: buildUrl("/sort"), lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: buildUrl("/search"), lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: buildUrl("/pathfinding"), lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: buildUrl("/linked-lists"), lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: buildUrl("/trees"), lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: buildUrl("/graphs"), lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: buildUrl("/automata"), lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: buildUrl("/learn"), lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: buildUrl("/research"), lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: buildUrl("/press"), lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: buildUrl("/faq"), lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: buildUrl("/privacy"), lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: buildUrl("/terms-and-conditions"), lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: buildUrl("/visual-sitemap"), lastModified, changeFrequency: "monthly", priority: 0.5 },
  ];

  // Dynamic /learn/[topic]/[algo] pages generated from md_files
  const learnPages: MetadataRoute.Sitemap = [];
  try {
    const topics = getAllTopics();
    for (const topic of topics) {
      const algos = getAlgorithmsByTopic(topic);
      for (const algo of algos) {
        learnPages.push({
          url: buildUrl(`/learn/${topic}/${algo}`),
          lastModified,
          changeFrequency: "weekly",
          priority: 0.8,
        });
      }
    }
  } catch (err) {
    console.error("Error generating learn sitemap routes:", err);
  }

  return [...staticPages, ...learnPages];
}

