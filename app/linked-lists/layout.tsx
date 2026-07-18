import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Linked Lists Visualizer — SortStory",
  description:
    "Visualize Singly and Doubly Linked Lists. Watch pointers update in real-time as you reverse the list or detect cycles using Floyd's algorithm.",
  keywords: [
    "linked list visualizer",
    "singly linked list",
    "doubly linked list",
    "reverse linked list visualizer",
    "floyds cycle detection",
    "pointer visualization",
    "data structures visualizer",
    "DSA visualizer",
  ],
  openGraph: {
    title: "Linked Lists Visualizer — SortStory",
    description:
      "Interact with Singly and Doubly Linked Lists in real-time.",
    url: "https://sortstory.adnan-mangaonkar.com/linked-lists",
    type: "website",
    images: [
      {
        url: "/assets/sortviz.png",
        width: 1200,
        height: 630,
        alt: "SortStory Linked Lists Visualizer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Linked Lists Visualizer — SortStory",
    description:
      "Visualize pointer updates and list reversals step-by-step.",
    images: ["/assets/sortviz.png"],
  },
  alternates: {
    canonical: "https://sortstory.adnan-mangaonkar.com/linked-lists",
  },
};

export default function LinkedListsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
