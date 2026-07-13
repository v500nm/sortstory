import React from 'react';
import { getLessonsForAlgorithm } from '@/lib/markdown';
import LessonClient from './LessonClient';

interface Props {
  params: Promise<{
    topic: string;
    algo: string;
  }>;
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
