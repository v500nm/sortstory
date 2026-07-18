import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — SortStory",
  description:
    "Privacy Policy for SortStory, explaining our commitment to user privacy, local storage usage, and minimal analytics tracking.",
  alternates: {
    canonical: "https://sortstory.adnan-mangaonkar.com/privacy",
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
