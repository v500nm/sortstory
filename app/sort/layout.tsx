import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sorting Visualizer — SortStory",
  description:
    "Interactive sorting visualizer with 16 algorithms: Bubble Sort, Merge Sort, Quick Sort, Heap Sort, Radix Sort, and more. Watch real-time comparisons, swaps, and race two algorithms side-by-side. Free online DSA learning tool by Adnan Mangaonkar.",
  keywords: [
    "sorting visualizer",
    "sorting algorithm visualizer",
    "bubble sort visualizer",
    "merge sort visualizer",
    "quick sort visualizer",
    "heap sort visualizer",
    "insertion sort visualizer",
    "selection sort visualizer",
    "radix sort visualizer",
    "sorting algorithm comparison",
    "algorithm race mode",
    "DSA visualizer",
    "sorting algorithms online",
    "interactive sorting",
    "learn sorting algorithms",
    "sorting animation",
  ],
  openGraph: {
    title: "Sorting Visualizer — SortStory",
    description:
      "Visualize Bubble Sort, Merge Sort, Quick Sort and 13 more algorithms in real-time. Compare algorithms side-by-side in Race Mode.",
    url: "https://sortstory.adnan-mangaonkar.com/sort",
    type: "website",
    images: [
      {
        url: "/assets/sortviz.png",
        width: 1200,
        height: 630,
        alt: "SortStory Sorting Visualizer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sorting Visualizer — SortStory",
    description:
      "Master Bubble Sort, Quick Sort, Merge Sort and 13 more through real-time visual storytelling.",
    images: ["/assets/sortviz.png"],
  },
  alternates: {
    canonical: "https://sortstory.adnan-mangaonkar.com/sort",
  },
};

export default function SortLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
