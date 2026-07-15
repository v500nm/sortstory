import React from 'react';
import { getAllTopics, getAlgorithmsByTopic } from '@/lib/markdown';
import LearnPageClient from './LearnPageClient';

export default function LearnPage() {
  const topics = getAllTopics();
  
  const topicsData = topics.map(topic => ({
    topic,
    algos: getAlgorithmsByTopic(topic),
  })).filter(t => t.algos.length > 0);

  return <LearnPageClient topics={topicsData} />;
}
