import "./globals.css";

export const metadata = {
  title: "SortViz – Sorting Algorithm Visualizer",
  description:
    "SortViz is an interactive DSA visualization tool supporting Bubble, Merge, Quick, Heap, Bitonic, Shell, Radix, Comb, Bogo & more.",
  icons: {
    icon: "/favicon.ico",
    apple: "/assets/apple-touch-icon.png"
  },
  openGraph: {
    title: "SortViz – Sorting Algorithm Visualizer",
    url: "https://sortviz.adnan-mangaonkar.com",
    images: "/assets/sortviz.png"
  },
  twitter: {
    card: "summary_large_image",
    creator: "@V350NM",
    images: "/assets/sortviz.png"
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
