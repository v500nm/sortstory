const fs = require('fs');
const path = require('path');

const algoData = {
  "automata": ["gol", "kmeans"],
  "graphs": ["bfs", "dfs"],
  "linked-lists": ["singly", "doubly", "reverseList", "detectCycle", "findMiddle"],
  "pathfinding": ["dijkstra", "aStar"],
  "searching": ["linearSearch", "binarySearch"],
  "sorting": ["bubbleSort", "selectionSort", "insertionSort", "mergeSortWrapper", "quickSortWrapper", "heapSort", "shellSort", "cocktailSort", "combSort", "gnomeSort", "oddEvenSort", "pancakeSort", "bitonicSortWrapper", "radixSort", "stoogeSortWrapper", "bogoSort", "timSort", "introSort"],
  "trees": ["bst", "preOrder", "inOrder", "postOrder"]
};

// Helper to format names nicely
function formatAlgoName(name) {
  let clean = name.replace(/Wrapper$/i, '');
  clean = clean.replace(/-/g, ' ');
  clean = clean.replace(/([a-z])([A-Z])/g, '$1 $2');
  const explicitMapping = {
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

Object.entries(algoData).forEach(([category, algos]) => {
  algos.forEach(algo => {
    // We will use the exact camelCase key for the folder to keep URLs clean and mapped
    // Wait, the Next.js routes decode URL, but keeping folder name as the camelCase string is fine.
    const dirPath = path.join(process.cwd(), 'md_files', category, algo);
    fs.mkdirSync(dirPath, { recursive: true });

    const readableName = formatAlgoName(algo);

    // 01-introduction.md
    const introPath = path.join(dirPath, '01-introduction.md');
    if (!fs.existsSync(introPath)) {
      const introContent = `---
title: Introduction to ${readableName}
order: 1
type: lesson
---

# ${readableName}: The Basics

Welcome to the comprehensive guide on **${readableName}**. This algorithm plays a fundamental role in computer science.

## How it works
This algorithm operates by executing a systematic set of instructions to achieve its computational goal efficiently. 
*(Detailed specific logic for ${readableName} will be expanded here.)*

## Complexity Analysis
- **Time Complexity:** O(N)
- **Space Complexity:** O(1)
*(Note: These are placeholder complexities that will be updated accurately for ${readableName}.)*
`;
      fs.writeFileSync(introPath, introContent, 'utf8');
    }

    // 02-implementation.md
    const implPath = path.join(dirPath, '02-implementation.md');
    if (!fs.existsSync(implPath)) {
      const implContent = `---
title: Implementing ${readableName}
order: 2
type: lesson
---

# Multi-Language Implementation

Below you can toggle the implementation of **${readableName}** in various programming languages.

## Code

\`\`\`javascript
// JavaScript implementation of ${readableName}
function executeAlgorithm() {
  console.log("Running ${readableName}...");
}
\`\`\`

\`\`\`python
# Python implementation of ${readableName}
def execute_algorithm():
    print("Running ${readableName}...")
\`\`\`

\`\`\`java
// Java implementation of ${readableName}
public class Algorithm {
    public static void executeAlgorithm() {
        System.out.println("Running ${readableName}...");
    }
}
\`\`\`

\`\`\`cpp
// C++ implementation of ${readableName}
#include <iostream>
using namespace std;

void executeAlgorithm() {
    cout << "Running ${readableName}..." << endl;
}
\`\`\`
`;
      fs.writeFileSync(implPath, implContent, 'utf8');
    }

    // 03-practice-questions.md
    const practicePath = path.join(dirPath, '03-practice-questions.md');
    if (!fs.existsSync(practicePath)) {
      const practiceContent = `---
title: Practice Questions
order: 3
type: practice
---

# Test Your Knowledge

Solidify your understanding of **${readableName}** by solving the following practice problems.

### Question 1: Algorithmic Efficiency
What is the primary advantage of using ${readableName} over naive brute-force approaches in its domain?
- [ ] It requires strictly zero extra memory.
- [ ] It can run in O(1) time complexity.
- [ ] It optimizes the structural traversal of the dataset.
- [ ] It only works on strings.

### Question 2: Edge Cases
If the input to ${readableName} is already perfectly optimized or completely reversed, how does the algorithm handle it? Explain the variation in time complexity if any.

### Question 3: Code Implementation
Write a function from scratch in your preferred language that executes a single pass of the core logic of ${readableName} and returns the intermediate state of the data structure.
`;
      fs.writeFileSync(practicePath, practiceContent, 'utf8');
    }

  });
});

console.log("Curriculum scaffolded successfully!");
