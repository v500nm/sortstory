import React from 'react';
import type { Metadata } from 'next';
import { getLessonsForAlgorithm } from '@/lib/markdown';
import { formatAlgoName } from '@/lib/utils';
import LessonClient from './LessonClient';

const BASE_URL = 'https://sortstory.adnan-mangaonkar.com';

interface Props {
  params: Promise<{
    topic: string;
    algo: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic, algo } = await params;
  const algoName = formatAlgoName(algo);
  const topicName = topic.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const title = `${algoName} — Learn ${topicName} Step-by-Step`;
  const description = `Master ${algoName} with step-by-step lessons, code implementations in Python, JavaScript, Java, C++, and C, and practice problems. Part of the ${topicName} curriculum on SortStory.`;

  return {
    title,
    description,
    keywords: [
      `${algoName.toLowerCase()} tutorial`,
      `${algoName.toLowerCase()} algorithm`,
      `learn ${algoName.toLowerCase()}`,
      `${algoName.toLowerCase()} code`,
      `${algoName.toLowerCase()} python`,
      `${algoName.toLowerCase()} java`,
      `${topicName.toLowerCase()} algorithms`,
    ],
    openGraph: {
      title: `${algoName} — ${topicName} Tutorial | SortStory`,
      description,
      url: `${BASE_URL}/learn/${topic}/${algo}`,
      type: 'article',
    },
    twitter: {
      card: 'summary',
      title: `${algoName} Tutorial | SortStory`,
      description: `Step-by-step ${algoName} lesson with multi-language code.`,
    },
    alternates: {
      canonical: `${BASE_URL}/learn/${topic}/${algo}`,
    },
  };
}
export default async function AlgoLearnPage({ params }: Props) {
  const { topic, algo } = await params;
  const lessons = getLessonsForAlgorithm(topic, algo);

  if (!lessons || lessons.length === 0) {
    return (
      <div className="w-full flex items-center justify-center p-8">
        <div className="glass-card p-8 text-center text-brand-text-secondary">
          No lessons found for {topic} / {algo}.
        </div>
      </div>
    );
  }

  return <LessonClient lessons={lessons} topic={topic} algo={algo} />;
}
