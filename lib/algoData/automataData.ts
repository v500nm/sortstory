import { AlgorithmDetailsData } from "./types";

export const automataData: Record<string, AlgorithmDetailsData> = {
  gol: {
    id: "gol",
    name: "Conway's Game of Life",
    description: "The Game of Life is a cellular automaton devised by John Conway. Its evolution is determined by its initial state, requiring no further input. Every cell interacts with its eight neighbours on a 2D grid.",
    bestCase: "O(n)",
    avgCase: "O(n)",
    worstCase: "O(n)",
    timeComplexity: "O(n) per step",
    spaceComplexity: "O(n)",
    useCase: "Complex systems, emergent behavior, procedural terrain generation.",
    algorithmFlow: [
      "Create a double buffer grid.",
      "Count live neighbors for each cell.",
      "Live cell with < 2 or > 3 live neighbors dies.",
      "Live cell with 2 or 3 live neighbors survives.",
      "Dead cell with exactly 3 live neighbors comes to life."
    ],
    codeSnippets: {
      javascript: `function nextGen(grid) {
  const nextGrid = grid.map(arr => [...arr]);
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      let neighbors = countNeighbors(grid, r, c);
      if (grid[r][c] === 1 && (neighbors < 2 || neighbors > 3)) nextGrid[r][c] = 0;
      else if (grid[r][c] === 0 && neighbors === 3) nextGrid[r][c] = 1;
    }
  }
  return nextGrid;
}`,
      python: `def next_gen(grid):
    R, C = len(grid), len(grid[0])
    next_grid = [row[:] for row in grid]
    for r in range(R):
        for c in range(C):
            neighbors = count_neighbors(grid, r, c)
            if grid[r][c] == 1 and (neighbors < 2 or neighbors > 3):
                next_grid[r][c] = 0
            elif grid[r][c] == 0 and neighbors == 3:
                next_grid[r][c] = 1
    return next_grid`,
      java: `int[][] nextGen(int[][] grid) {
    int R = grid.length, C = grid[0].length;
    int[][] nextGrid = new int[R][C];
    for (int r = 0; r < R; r++) {
        for (int c = 0; c < C; c++) {
            int neighbors = countNeighbors(grid, r, c);
            if (grid[r][c] == 1) {
                nextGrid[r][c] = (neighbors == 2 || neighbors == 3) ? 1 : 0;
            } else {
                nextGrid[r][c] = (neighbors == 3) ? 1 : 0;
            }
        }
    }
    return nextGrid;
}`,
      cpp: `vector<vector<int>> nextGen(vector<vector<int>>& grid) {
    int R = grid.size(), C = grid[0].size();
    vector<vector<int>> nextGrid = grid;
    for (int r = 0; r < R; r++) {
        for (int c = 0; c < C; c++) {
            int neighbors = countNeighbors(grid, r, c);
            if (grid[r][c] == 1) {
                nextGrid[r][c] = (neighbors == 2 || neighbors == 3) ? 1 : 0;
            } else {
                nextGrid[r][c] = (neighbors == 3) ? 1 : 0;
            }
        }
    }
    return nextGrid;
}`,
      c: `void nextGen(int grid[R][C], int nextGrid[R][C]) {
    for (int r = 0; r < R; r++) {
        for (int c = 0; c < C; c++) {
            int neighbors = countNeighbors(grid, r, c);
            if (grid[r][c] == 1) {
                nextGrid[r][c] = (neighbors == 2 || neighbors == 3) ? 1 : 0;
            } else {
                nextGrid[r][c] = (neighbors == 3) ? 1 : 0;
            }
        }
    }
}`
    },
    examples: []
  },
  kmeans: {
    id: "kmeans",
    name: "K-Means Clustering",
    description: "Iteratively partition n observations into k clusters where each point belongs to the cluster with the nearest mean.",
    bestCase: "O(i * k * n)",
    avgCase: "O(i * k * n)",
    worstCase: "O(i * k * n)",
    timeComplexity: "O(i * k * n)",
    spaceComplexity: "O(n + k)",
    useCase: "Data science, image compression, customer segmentation.",
    algorithmFlow: [
      "Initialize k centroid seeds randomly.",
      "Assign each data point to its closest centroid.",
      "Compute new centroid positions as the mean of all points assigned to that cluster.",
      "Repeat until centroids converge."
    ],
    codeSnippets: {
      javascript: `function assignPoints(points, centroids) {
  let clusters = centroids.map(() => []);
  for (let p of points) {
    let best = 0, bestD = Infinity;
    for (let i = 0; i < centroids.length; i++) {
      let d = dist(p, centroids[i]);
      if (d < bestD) { bestD = d; best = i; }
    }
    clusters[best].push(p);
  }
  return clusters;
}`,
      python: `def assign_points(points, centroids):
    clusters = [[] for _ in centroids]
    for p in points:
        best_i = min(range(len(centroids)), key=lambda i: dist(p, centroids[i]))
        clusters[best_i].append(p)
    return clusters`,
      java: `List<List<Point>> assignPoints(List<Point> points, List<Point> centroids) {
    List<List<Point>> clusters = new ArrayList<>();
    for (int i = 0; i < centroids.size(); i++) clusters.add(new ArrayList<>());
    for (Point p : points) {
        int bestIdx = 0;
        double bestDist = Double.MAX_VALUE;
        for (int i = 0; i < centroids.size(); i++) {
            double d = dist(p, centroids[i]);
            if (d < bestDist) { bestDist = d; bestIdx = i; }
        }
        clusters.get(bestIdx).add(p);
    }
    return clusters;
}`,
      cpp: `vector<vector<Point>> assignPoints(vector<Point>& points, vector<Point>& centroids) {
    vector<vector<Point>> clusters(centroids.size());
    for (auto& p : points) {
        int bestIdx = 0;
        double bestDist = 1e9;
        for (int i = 0; i < centroids.size(); i++) {
            double d = dist(p, centroids[i]);
            if (d < bestDist) {
                bestDist = d;
                bestIdx = i;
            }
        }
        clusters[bestIdx].push_back(p);
    }
    return clusters;
}`,
      c: `void assignPoints(Point points[], int N, Centroid centroids[], int K) {
    for (int i = 0; i < N; i++) {
        int best = 0;
        double bestD = 1e9;
        for (int j = 0; j < K; j++) {
            double d = dist(points[i], centroids[j]);
            if (d < bestD) { bestD = d; best = j; }
        }
        points[i].cluster = best;
    }
}`
    },
    examples: []
  }
};
