import { MazeStep } from "../../types";

/**
 * Recursive Backtracking Maze Generator (DFS-based)
 *
 * Starts with every cell as a wall. Uses DFS to carve passages by visiting
 * random unvisited neighbors. The stack-based backtracking creates long,
 * winding corridors with fewer branches — producing "perfect" mazes
 * (exactly one path between any two points).
 *
 * Grid convention: cells at odd row/col are "carve-able" cells.
 * Cells at even row/col are walls/passages between cells.
 * This produces a clean maze with walls between passages.
 */
export function* recursiveBacktracking(
  rows: number,
  cols: number
): Generator<MazeStep, void, unknown> {
  // First: yield all cells as walls to fill the grid
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      yield { type: "wall", row: r, col: c };
    }
  }

  // Cell grid: only odd-indexed positions are carve-able cells
  // This ensures walls between every passage
  const cellRows = Math.floor((rows - 1) / 2);
  const cellCols = Math.floor((cols - 1) / 2);

  if (cellRows <= 0 || cellCols <= 0) return;

  const visited = new Set<string>();
  const key = (r: number, c: number) => `${r},${c}`;

  // Convert cell coords to grid coords
  const toGrid = (r: number, c: number): [number, number] => [r * 2 + 1, c * 2 + 1];

  // Start from cell (0, 0)
  const stack: [number, number][] = [[0, 0]];
  visited.add(key(0, 0));

  const [startR, startC] = toGrid(0, 0);
  yield { type: "carve", row: startR, col: startC };

  while (stack.length > 0) {
    const [cr, cc] = stack[stack.length - 1];
    const neighbors = getUnvisitedNeighbors(cr, cc, cellRows, cellCols, visited);

    if (neighbors.length === 0) {
      // Backtrack
      stack.pop();
      continue;
    }

    // Pick a random unvisited neighbor
    const [nr, nc] = neighbors[Math.floor(Math.random() * neighbors.length)];
    visited.add(key(nr, nc));

    // Carve the wall between current and neighbor
    const wallR = cr * 2 + 1 + (nr - cr);
    const wallC = cc * 2 + 1 + (nc - cc);
    yield { type: "carve", row: wallR, col: wallC };

    // Carve the neighbor cell
    const [gridR, gridC] = toGrid(nr, nc);
    yield { type: "carve", row: gridR, col: gridC };

    stack.push([nr, nc]);
  }
}

function getUnvisitedNeighbors(
  r: number,
  c: number,
  maxR: number,
  maxC: number,
  visited: Set<string>
): [number, number][] {
  const dirs: [number, number][] = [
    [-1, 0], [1, 0], [0, -1], [0, 1],
  ];

  const neighbors: [number, number][] = [];
  for (const [dr, dc] of dirs) {
    const nr = r + dr;
    const nc = c + dc;
    if (nr >= 0 && nr < maxR && nc >= 0 && nc < maxC && !visited.has(`${nr},${nc}`)) {
      neighbors.push([nr, nc]);
    }
  }
  return neighbors;
}
