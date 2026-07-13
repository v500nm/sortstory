import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatAlgoName(name: string): string {
  let clean = name.replace(/Wrapper$/i, '');
  clean = clean.replace(/-/g, ' ');
  clean = clean.replace(/([a-z])([A-Z])/g, '$1 $2');
  
  const explicitMapping: Record<string, string> = { 
    'bst': 'BST', 
    'dfs': 'DFS', 
    'bfs': 'BFS', 
    'gol': 'Game of Life', 
    'kmeans': 'K-Means', 
    'astar': 'A* Search', 
    'a star': 'A* Search' 
  };
  
  if (explicitMapping[clean.toLowerCase()]) return explicitMapping[clean.toLowerCase()];
  
  return clean.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}

