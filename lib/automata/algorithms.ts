import { Cell, GameOfLifeStep, GameOfLifeAlgorithmFn, DataPoint, Centroid, KMeansStep, KMeansAlgorithmFn } from "./types";

function cloneGrid(grid: Cell[][]): Cell[][] {
  return grid.map(row => row.map(cell => ({ ...cell })));
}

function countNeighbors(grid: Cell[][], x: number, y: number): number {
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      
      // wrap around (toroidal array)
      const r = (y + i + rows) % rows;
      const c = (x + j + cols) % cols;
      if (grid[r][c].isAlive) {
        count++;
      }
    }
  }
  return count;
}

export const runGameOfLife: GameOfLifeAlgorithmFn = function* (initialGrid, maxGenerations) {
  let currentGrid = cloneGrid(initialGrid);
  let generation = 0;

  yield {
    grid: cloneGrid(currentGrid),
    generation,
    description: "Initial state",
  };

  const rows = currentGrid.length;
  if (rows === 0) return;
  const cols = currentGrid[0].length;

  while (generation < maxGenerations) {
    const nextGrid = cloneGrid(currentGrid);
    let changed = false;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const neighbors = countNeighbors(currentGrid, x, y);
        const cell = currentGrid[y][x];
        const nextCell = nextGrid[y][x];

        nextCell.isNewlyBorn = false;
        nextCell.isNewlyDied = false;

        if (cell.isAlive) {
          if (neighbors < 2 || neighbors > 3) {
            nextCell.isAlive = false;
            nextCell.isNewlyDied = true;
            changed = true;
          }
        } else {
          if (neighbors === 3) {
            nextCell.isAlive = true;
            nextCell.isNewlyBorn = true;
            changed = true;
          }
        }
      }
    }

    if (!changed) {
      yield {
        grid: cloneGrid(currentGrid),
        generation,
        description: `Stable state reached at generation ${generation}`,
      };
      return;
    }

    currentGrid = nextGrid;
    generation++;

    yield {
      grid: cloneGrid(currentGrid),
      generation,
      description: `Generation ${generation}`,
    };
  }
};

function euclideanDist(p1: { x: number; y: number }, p2: { x: number; y: number }) {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

function clonePoints(points: DataPoint[]): DataPoint[] {
  return points.map(p => ({ ...p }));
}

function cloneCentroids(centroids: Centroid[]): Centroid[] {
  return centroids.map(c => ({ ...c }));
}

export const runKMeans: KMeansAlgorithmFn = function* (initialPoints, initialCentroids, maxIterations) {
  let points = clonePoints(initialPoints);
  let centroids = cloneCentroids(initialCentroids);
  let iteration = 0;

  yield {
    points: clonePoints(points),
    centroids: cloneCentroids(centroids),
    iteration,
    description: "Initial random centroids initialized",
  };

  while (iteration < maxIterations) {
    iteration++;
    let changed = false;

    // Assignment Step
    for (const point of points) {
      let minDist = Infinity;
      let bestClusterId = -1;

      for (const centroid of centroids) {
        const dist = euclideanDist(point, centroid);
        if (dist < minDist) {
          minDist = dist;
          bestClusterId = centroid.id;
        }
      }

      if (point.clusterId !== bestClusterId) {
        point.clusterId = bestClusterId;
        changed = true;
      }
    }

    yield {
      points: clonePoints(points),
      centroids: cloneCentroids(centroids),
      iteration,
      description: `Iteration ${iteration}: Assignment Step Complete`,
    };

    // Update Step
    for (const centroid of centroids) {
      const clusterPoints = points.filter(p => p.clusterId === centroid.id);
      if (clusterPoints.length > 0) {
        const sumX = clusterPoints.reduce((sum, p) => sum + p.x, 0);
        const sumY = clusterPoints.reduce((sum, p) => sum + p.y, 0);
        centroid.x = sumX / clusterPoints.length;
        centroid.y = sumY / clusterPoints.length;
      }
    }

    yield {
      points: clonePoints(points),
      centroids: cloneCentroids(centroids),
      iteration,
      description: `Iteration ${iteration}: Centroids Updated`,
    };

    if (!changed) {
      yield {
        points: clonePoints(points),
        centroids: cloneCentroids(centroids),
        iteration,
        description: `Converged after ${iteration} iterations`,
      };
      return;
    }
  }
};
