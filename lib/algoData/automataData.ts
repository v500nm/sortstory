import { AlgorithmDetailsData } from "./types";

export const automataData: Record<string, AlgorithmDetailsData> = {
  gol: {
    id: "gol",
    name: "Conway's Game of Life",
    description: "The Game of Life is a cellular automaton devised by mathematician John Horton Conway. It is a zero-player game, meaning its evolution is determined by its initial state, requiring no further input. The universe of the Game of Life is a two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, alive or dead. Every cell interacts with its eight neighbours.",
    bestCase: "O(n) where n is total cells on the grid",
    avgCase: "O(n)",
    worstCase: "O(n)",
    timeComplexity: "O(n) per generation step",
    spaceComplexity: "O(n) - Requires a secondary buffer grid to calculate the next state simultaneously",
    useCase: "Used in computer science to study complex systems, emergent behavior, and Turing completeness. It is heavily utilized in procedural generation (e.g., generating cave systems in video games).",
    algorithmFlow: [
      "For each generation, create a new empty grid (or buffer).",
      "Iterate over every cell in the current grid.",
      "Count the number of alive neighbors (out of the 8 surrounding cells) for the current cell.",
      "Apply Rule 1: Underpopulation. A live cell with fewer than 2 live neighbors dies.",
      "Apply Rule 2: Survival. A live cell with 2 or 3 live neighbors lives on.",
      "Apply Rule 3: Overpopulation. A live cell with more than 3 live neighbors dies.",
      "Apply Rule 4: Reproduction. A dead cell with exactly 3 live neighbors becomes a live cell.",
      "Update the new grid with the new state of the cell.",
      "Once all cells are processed, replace the current grid with the new grid."
    ],
    codeSnippets: {
      javascript: `function nextGeneration(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const nextGrid = Array(rows).fill().map(() => Array(cols).fill(0));

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let neighbors = countAliveNeighbors(grid, r, c);
      
      if (grid[r][c] === 1 && (neighbors === 2 || neighbors === 3)) {
        nextGrid[r][c] = 1; // Survive
      } else if (grid[r][c] === 0 && neighbors === 3) {
        nextGrid[r][c] = 1; // Reproduce
      } else {
        nextGrid[r][c] = 0; // Die
      }
    }
  }
  return nextGrid;
}`
    },
    examples: []
  },
  kmeans: {
    id: "kmeans",
    name: "K-Means Clustering",
    description: "K-Means is an unsupervised machine learning algorithm used to partition 'n' observations into 'k' clusters in which each observation belongs to the cluster with the nearest mean (centroid). It iteratively refines the positions of the centroids until they stabilize.",
    bestCase: "O(i * k * n) where i is iterations, k is clusters, n is data points",
    avgCase: "O(i * k * n)",
    worstCase: "O(n^(k+2/p)) - Theoretically, but practically usually fast",
    timeComplexity: "O(i * k * n)",
    spaceComplexity: "O(n + k)",
    useCase: "Customer segmentation, image compression (color quantization), anomaly detection, and grouping documents into topics.",
    algorithmFlow: [
      "Initialize 'k' centroids randomly within the data space.",
      "Phase 1 (Assignment): Iterate through every data point. Calculate the Euclidean distance between the point and every centroid.",
      "Assign the data point to the cluster of the closest centroid.",
      "Phase 2 (Update): Once all points are assigned, calculate the new mean (average x and y coordinates) of all points belonging to a specific cluster.",
      "Move the centroid to this new mean position.",
      "Repeat Phase 1 and Phase 2 until the centroids stop moving (convergence) or a max iteration limit is reached."
    ],
    codeSnippets: {
      javascript: `function kMeansIteration(points, centroids) {
  // 1. Assignment Phase
  let clusters = Array.from({length: centroids.length}, () => []);
  
  for (let p of points) {
    let minDistance = Infinity;
    let closestCentroid = 0;
    
    for (let i = 0; i < centroids.length; i++) {
      let d = distance(p, centroids[i]);
      if (d < minDistance) {
        minDistance = d;
        closestCentroid = i;
      }
    }
    clusters[closestCentroid].push(p);
  }
  
  // 2. Update Phase
  let newCentroids = [];
  for (let c of clusters) {
    let sumX = 0, sumY = 0;
    for (let p of c) { sumX += p.x; sumY += p.y; }
    newCentroids.push({ x: sumX / c.length, y: sumY / c.length });
  }
  
  return newCentroids;
}`
    },
    examples: []
  }
};
