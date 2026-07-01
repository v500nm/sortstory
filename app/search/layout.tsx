import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Algorithms Visualizer — Linear vs Binary Search",
  description:
    "Interactive search visualizer: Race Linear Search against Binary Search side-by-side. Watch array elements being evaluated and discarded in real-time.",
  keywords: [
    "search visualizer",
    "linear search visualizer",
    "binary search visualizer",
    "linear vs binary search",
    "searching algorithm visualizer",
    "DSA search tool",
    "interactive searching",
  ],
  openGraph: {
    title: "Search Algorithms Visualizer — Linear vs Binary | SortStory",
    description: "Race Linear Search against Binary Search side-by-side in real-time.",
    url: "https://sortstory.adnan-mangaonkar.com/search",
    type: "website",
  },
  alternates: {
    canonical: "https://sortstory.adnan-mangaonkar.com/search",
  },
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
