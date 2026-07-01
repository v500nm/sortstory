import { MazeStep } from "../../types";

/**
 * Prim's Maze Algorithm
 *
 * Creates organic, highly-branching mazes by expanding a minimum spanning tree.
 * Starts with all walls, picks a random cell, and grows outward by randomly
 * selecting frontier walls. Produces mazes with more branching and shorter
 * dead-ends than recursive backtracking.
 *
 * Grid convention: cells at odd row/col are carve-able.
 * Even row/col positions are walls/passages between cells.
 */
export function* primsMaze(
  rows: number,
  cols: number
): Generator<MazeStep, void, unknown> {
  // First: yield all cells as walls to fill the grid
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      yield { type: "wall", row: r, col: c };
    }
  }

  const cellRows = Math.floor((rows - 1) / 2);
  const cellCols = Math.floor((cols - 1) / 2);

  if (cellRows <= 0 || cellCols <= 0) return;

  const carved = new Set<string>();
  const key = (r: number, c: number) => `${r},${c}`;
  const toGrid = (r: number, c: number): [number, number] => [r * 2 + 1, c * 2 + 1];

  // Frontier: walls that separate a carved cell from an uncarved cell
  // Stored as [cellRow, cellCol, neighborRow, neighborCol]
  const frontier: [number, number, number, number][] = [];

  // Start from a random cell
  const startR = Math.floor(Math.random() * cellRows);
  const startC = Math.floor(Math.random() * cellCols);
  carved.add(key(startR, startC));

  const [gridR, gridC] = toGrid(startR, startC);
  yield { type: "carve", row: gridR, col: gridC };

  // Add initial cell's neighbors to frontier
  addFrontier(startR, startC, cellRows, cellCols, carved, frontier);

  while (frontier.length > 0) {
    // Pick a random frontier entry
    const idx = Math.floor(Math.random() * frontier.length);
    const [, , nr, nc] = frontier[idx];

    // Remove this entry (swap with last for O(1) removal)
    frontier[idx] = frontier[frontier.length - 1];
    frontier.pop();

    // If the neighbor is already carved, skip
    if (carved.has(key(nr, nc))) continue;

    // Find which carved cell connects to this neighbor
    // (there may be multiple; pick any that is carved)
    const connectingCarved = getCarvedNeighbors(nr, nc, cellRows, cellCols, carved);
    if (connectingCarved.length === 0) continue;

    const [cr, cc] = connectingCarved[Math.floor(Math.random() * connectingCarved.length)];

    // Carve the wall between the carved cell and the new cell
    const wallR = cr * 2 + 1 + (nr - cr);
    const wallC = cc * 2 + 1 + (nc - cc);
    yield { type: "carve", row: wallR, col: wallC };

    // Carve the new cell
    carved.add(key(nr, nc));
    const [newGridR, newGridC] = toGrid(nr, nc);
    yield { type: "carve", row: newGridR, col: newGridC };

    // Add new cell's uncarved neighbors to frontier
    addFrontier(nr, nc, cellRows, cellCols, carved, frontier);
  }
}

function addFrontier(
  r: number,
  c: number,
  maxR: number,
  maxC: number,
  carved: Set<string>,
  frontier: [number, number, number, number][]
): void {
  const dirs: [number, number][] = [
    [-1, 0], [1, 0], [0, -1], [0, 1],
  ];

  for (const [dr, dc] of dirs) {
    const nr = r + dr;
    const nc = c + dc;
    if (nr >= 0 && nr < maxR && nc >= 0 && nc < maxC && !carved.has(`${nr},${nc}`)) {
      frontier.push([r, c, nr, nc]);
    }
  }
}

function getCarvedNeighbors(
  r: number,
  c: number,
  maxR: number,
  maxC: number,
  carved: Set<string>
): [number, number][] {
  const dirs: [number, number][] = [
    [-1, 0], [1, 0], [0, -1], [0, 1],
  ];

  const result: [number, number][] = [];
  for (const [dr, dc] of dirs) {
    const nr = r + dr;
    const nc = c + dc;
    if (nr >= 0 && nr < maxR && nc >= 0 && nc < maxC && carved.has(`${nr},${nc}`)) {
      result.push([nr, nc]);
    }
  }
  return result;
}
