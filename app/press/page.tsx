import React from "react";
import Link from "next/link";
import Script from "next/script";
import { Metadata } from "next";
import Header from "@/components/Header";
import InitialMountLoader from "@/components/loaders/InitialMountLoader";
import PressLoader from "@/components/loaders/PressLoader";

export const metadata: Metadata = {
  title: "Press, Media & Publications | SortStory",
  description: "Official press coverage, DEV.to & Hashnode articles, Medium publications, Product Hunt launch, Reddit engineering discussions, and YouTube video demos of SortStory.",
  openGraph: {
    title: "Press & Publications | SortStory Algorithm Visualizer",
    description: "Featured on DEV.to, Hashnode, Product Hunt, Medium, Reddit, Wikipedia, and YouTube.",
    url: "https://sortstory.adnan-mangaonkar.com/press",
  },
};

export default function PressPage() {
  const publications = [
    {
      platform: "DEV.to Engineering Article",
      title: "Illuminating Algorithms: Why I Built a Next-Gen DSA Visualizer to Empower Developers",
      description: "Comprehensive technical write-up by V500nm on DEV.to exploring modern web algorithms, interactive data structures, and intuitive state visualization.",
      link: "https://dev.to/v500nm/illuminating-algorithms-why-i-built-a-next-gen-dsa-visualizer-to-empower-developers-jgk",
      badge: "DEV.TO FEATURED",
      color: "text-brand-purple border-brand-purple/40 bg-brand-purple/10",
      icon: "👩‍💻",
    },
    {
      platform: "Hashnode Tech Blog",
      title: "SortStory DSA Visualizers — Adnan Mangaonkar",
      description: "Official engineering blog post on Hashnode detailing the architecture, time complexity benchmarks, and design system behind SortStory.",
      link: "https://blogadnan.hashnode.dev/sortstory-dsa-visualizers-adnan-mangaonkar",
      badge: "HASHNODE BLOG",
      color: "text-brand-cyan border-brand-cyan/40 bg-brand-cyan/10",
      icon: "⚡",
    },
    {
      platform: "Product Hunt",
      title: "SortStory on Product Hunt Launch",
      description: "Discover SortStory on Product Hunt. Interactive multi-stack algorithm visualizers and AI learning platform for software engineers.",
      link: "https://www.producthunt.com/products/sortstory?launch=sortstory",
      badge: "PRODUCT HUNT FEATURED",
      color: "text-amber-400 border-amber-400/40 bg-amber-500/10",
      icon: "🚀",
    },
    {
      platform: "Medium Publication",
      title: "Beyond the Whiteboard: How SortStory is Rewiring Algorithm Education",
      description: "Official deep-dive article by Adnan Mangaonkar exploring AI multi-stack code execution, time complexity visualization, and memory profiling.",
      link: "https://medium.com/@adnans0307/beyond-the-whiteboard-how-sortstory-is-rewiring-algorithm-education-with-ai-and-multi-stack-8e780a9ddcad?sharedUserId=adnans0307",
      badge: "FEATURED ARTICLE",
      color: "text-brand-green border-brand-green/40 bg-brand-green/10",
      icon: "✍️",
    },
    {
      platform: "Reddit Engineering Community",
      title: "I was tired of failing algorithm interviews, so I built SortStory",
      description: "Join the discussion on r/sortstory. Technical breakdown of why visual multi-stack execution beats static whiteboard problem solving.",
      link: "https://www.reddit.com/r/sortstory/comments/1vb01y3/i_was_tired_of_failing_algorithm_interviews/",
      badge: "REDDIT DISCUSSION",
      color: "text-brand-rose border-brand-rose/40 bg-brand-rose/10",
      icon: "💬",
    },
    {
      platform: "Wikipedia Citations",
      title: "Wikipedia Reference Entry (User:V500nm)",
      description: "Archived Wikipedia editor reference and open-source computational documentation record for SortStory dataset benchmarks.",
      link: "https://en.wikipedia.org/w/index.php?title=User:V500nm&oldid=1366858942",
      badge: "WIKIPEDIA RECORD",
      color: "text-brand-cyan border-brand-cyan/40 bg-brand-cyan/10",
      icon: "📚",
    },
  ];

  return (
    <>
      {/* Schema.org JSON-LD for Publications & Media Coverage */}
      <Script
        id="press-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "PressRelease",
            "headline": "SortStory Featured Media & Publication References",
            "url": "https://sortstory.adnan-mangaonkar.com/press",
            "author": {
              "@type": "Person",
              "name": "Adnan Mangaonkar",
              "url": "https://adnan-mangaonkar.com"
            },
            "publisher": {
              "@type": "Organization",
              "name": "SortStory",
              "url": "https://sortstory.adnan-mangaonkar.com"
            },
            "sameAs": [
              "https://dev.to/v500nm/illuminating-algorithms-why-i-built-a-next-gen-dsa-visualizer-to-empower-developers-jgk",
              "https://blogadnan.hashnode.dev/sortstory-dsa-visualizers-adnan-mangaonkar",
              "https://www.producthunt.com/products/sortstory?launch=sortstory",
              "https://medium.com/@adnans0307/beyond-the-whiteboard-how-sortstory-is-rewiring-algorithm-education-with-ai-and-multi-stack-8e780a9ddcad",
              "https://www.reddit.com/r/sortstory/comments/1vb01y3/i_was_tired_of_failing_algorithm_interviews/",
              "https://en.wikipedia.org/w/index.php?title=User:V500nm&oldid=1366858942",
              "https://www.youtube.com/watch?v=CWJ0x2tv-Mo"
            ]
          })
        }}
      />
      <main className="min-h-screen w-full bg-brand-bg-dark text-brand-text-primary font-sans relative flex flex-col overflow-x-clip selection:bg-brand-purple/30">
        <InitialMountLoader>
          <PressLoader />
        </InitialMountLoader>

        {/* Background ambient lighting */}
        <div className="fixed inset-0 w-full h-full -z-50 pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-brand-purple/5 blur-[120px] rounded-full" />
          <div className="absolute top-[50%] right-[5%] w-[500px] h-[500px] bg-brand-cyan/5 blur-[150px] rounded-full" />
        </div>

        <Header />

        <div className="border-b border-brand-border bg-black/10 py-8 px-4 sm:px-8">
          {/* Page Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-purple/20 border border-brand-purple/40 text-brand-purple rounded-full text-xs font-mono font-bold uppercase tracking-widest mb-4">
              <span>⚡ PRESS & PUBLICATIONS</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black font-serif tracking-tight mb-4">
              Featured Publications & Media Coverage
            </h1>
            <p className="text-brand-text-secondary text-sm sm:text-base font-mono leading-relaxed">
              SortStory has been featured on DEV.to, Hashnode, Product Hunt, Medium, Reddit, Wikipedia, and YouTube. Explore our official articles, community discussions, and video walk-throughs below.
            </p>
          </div>

          {/* Featured Video Section */}
          <div className="bg-brand-bg-card/70 backdrop-blur-xl border border-brand-border/80 rounded-3xl p-6 sm:p-10 shadow-2xl mb-12">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="w-full lg:w-1/2 space-y-4">
                <span className="px-3 py-1 bg-brand-cyan/20 border border-brand-cyan/40 text-brand-cyan text-[10px] font-mono font-bold uppercase rounded-md">
                  OFFICIAL VIDEO DEMO
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-serif text-brand-text-primary">
                  SortStory Platform Walkthrough
                </h2>
                <p className="text-xs sm:text-sm font-mono text-brand-text-secondary leading-relaxed">
                  Watch the full video demonstration showcasing SortStory&apos;s real-time algorithm visualizer, step-by-step execution tracer, and multi-stack code comparisons.
                </p>

                <div className="pt-2 flex items-center gap-4 text-xs font-mono">
                  <a
                    href="https://youtu.be/CWJ0x2tv-Mo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-brand-purple hover:bg-brand-purple/80 text-white rounded-xl font-bold transition-colors flex items-center gap-2"
                  >
                    <span>Watch on YouTube ↗</span>
                  </a>
                </div>
              </div>

              <div className="w-full lg:w-1/2 aspect-video rounded-2xl overflow-hidden border border-brand-border/80 shadow-2xl bg-black">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/CWJ0x2tv-Mo?si=JOHWA4lmxaXJfpbt"
                  title="SortStory YouTube Video Player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          </div>

          {/* Publications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {publications.map((pub) => (
              <div
                key={pub.title}
                className="bg-brand-bg-card/70 backdrop-blur-xl border border-brand-border/80 rounded-3xl p-6 shadow-xl flex flex-col justify-between hover:border-brand-purple/50 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{pub.icon}</span>
                    <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-md border ${pub.color}`}>
                      {pub.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-serif text-brand-text-primary group-hover:text-brand-purple transition-colors mb-2">
                    {pub.title}
                  </h3>
                  <p className="text-xs font-mono text-brand-text-secondary leading-relaxed mb-6">
                    {pub.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-brand-border/40 flex items-center justify-between font-mono text-xs">
                  <span className="text-brand-text-secondary font-bold text-[11px]">{pub.platform}</span>
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-cyan hover:underline font-bold flex items-center gap-1 text-[11px]"
                  >
                    Read Article ↗
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Back to Home Link */}
          <div className="text-center pt-6 border-t border-brand-border/40 font-mono text-xs">
            <Link href="/" className="text-brand-purple font-bold hover:underline">
              ← Return to Main Site
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
