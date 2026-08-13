import React from "react";
import type { Metadata } from "next";
import { formatAlgoName } from "@/lib/utils";
import AlgoCodeClient from "./AlgoCodeClient";

const BASE_URL = "https://sortstory.adnan-mangaonkar.com";

interface Props {
  params: Promise<{
    topic: string;
    algo: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic, algo } = await params;
  const algoName = formatAlgoName(algo);
  const topicName = topic.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const title = `${algoName} Code Implementations (JavaScript, TypeScript, C, C++, Python, Java, Go, PHP, Rust)`;
  const description = `Production-grade source code implementations of ${algoName} in JavaScript, TypeScript, C, C++, Python, Java, Go, PHP, and Rust with interactive test datasets.`;

  return {
    title,
    description,
    keywords: [
      `${algoName.toLowerCase()} code`,
      `${algoName.toLowerCase()} implementation`,
      `${algoName.toLowerCase()} python`,
      `${algoName.toLowerCase()} typescript`,
      `${algoName.toLowerCase()} c++`,
      `${algoName.toLowerCase()} java`,
      `${algoName.toLowerCase()} rust`,
      `${algoName.toLowerCase()} go`,
      `${algoName.toLowerCase()} php`,
    ],
    openGraph: {
      title: `${algoName} Code Implementations | SortStory`,
      description,
      url: `${BASE_URL}/learn/${topic}/${algo}/code`,
      type: "article",
    },
    alternates: {
      canonical: `${BASE_URL}/learn/${topic}/${algo}/code`,
    },
  };
}

export default async function AlgoCodePage({ params }: Props) {
  const { topic, algo } = await params;
  return <AlgoCodeClient topic={topic} algo={algo} />;
}
