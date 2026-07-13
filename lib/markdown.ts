import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const mdDirectory = path.join(process.cwd(), 'md_files');

export interface LessonData {
  id: string;
  topic: string;
  algo: string;
  title: string;
  order: number;
  type: string;
  content: string;
}

export function getAlgorithmsByTopic(topic: string) {
  const topicPath = path.join(mdDirectory, topic);
  if (!fs.existsSync(topicPath)) return [];
  
  const algos = fs.readdirSync(topicPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
    
  return algos;
}

export function getLessonsForAlgorithm(topic: string, algo: string): LessonData[] {
  const algoPath = path.join(mdDirectory, topic, algo);
  if (!fs.existsSync(algoPath)) return [];
  
  const fileNames = fs.readdirSync(algoPath).filter(file => file.endsWith('.md'));
  
  const lessons = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(algoPath, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    
    return {
      id,
      topic,
      algo,
      title: matterResult.data.title || id,
      order: matterResult.data.order || 0,
      type: matterResult.data.type || 'lesson',
      content: matterResult.content,
    };
  });
  
  return lessons.sort((a, b) => a.order - b.order);
}

const CATEGORY_ORDER = [
  'searching',
  'sorting',
  'linked-lists',
  'trees',
  'graphs',
  'pathfinding',
  'automata'
];

export function getAllTopics() {
  if (!fs.existsSync(mdDirectory)) return [];
  const topics = fs.readdirSync(mdDirectory, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  return topics.sort((a, b) => {
    const indexA = CATEGORY_ORDER.indexOf(a);
    const indexB = CATEGORY_ORDER.indexOf(b);
    if (indexA === -1 && indexB === -1) return a.localeCompare(b);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });
}

