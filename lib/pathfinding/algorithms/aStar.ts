import { GridData, NodeData, PathfindingStep } from "../types";

/**
 * A* Search Algorithm
 *
 * Uses Manhattan distance heuristic to guide exploration toward the target.
 * Explores fewer nodes than Dijkstra on average by prioritizing nodes with
 * the lowest f-cost (distance + heuristic). Yields "frontier" steps when
 * nodes are added to the open set, enabling visual distinction from Dijkstra.
 */
export function* aStar(
  grid: GridData,
  startNode: NodeData,
  endNode: NodeData
): Generator<PathfindingStep, void, unknown> {
  // Initialize start node
  startNode.distance = 0;
  startNode.heuristic = manhattanDistance(startNode, endNode);
  startNode.fCost = startNode.heuristic;

  // Open set — nodes to be evaluated (sorted by fCost)
  const openSet: NodeData[] = [startNode];
  // Closed set — nodes already evaluated
  const closedSet = new Set<NodeData>();

  while (openSet.length > 0) {
    // Sort by fCost, break ties by heuristic (closer to goal preferred)
    openSet.sort((a, b) => a.fCost - b.fCost || a.heuristic - b.heuristic);
    const current = openSet.shift()!;

    // Skip if already evaluated
    if (closedSet.has(current)) continue;

    // Mark as evaluated
    closedSet.add(current);
    current.isVisited = true;

    // Yield visit step (skip start/end for visual purposes)
    if (current !== startNode && current !== endNode) {
      yield { type: "visit", row: current.row, col: current.col };
    }

    // Found the target — reconstruct path
    if (current === endNode) {
      const path: PathfindingStep[] = [];
      let node: NodeData | null = endNode;
      while (node !== null) {
        if (node !== startNode && node !== endNode) {
          path.unshift({ type: "path", row: node.row, col: node.col });
        }
        node = node.previousNode;
      }
      for (const step of path) {
        yield step;
      }
      return;
    }

    // Evaluate neighbors
    const neighbors = getNeighbors(current, grid);
    for (const neighbor of neighbors) {
      if (closedSet.has(neighbor)) continue;
      if (neighbor.type === "wall") continue;

      const tentativeDistance = current.distance + 1;

      if (tentativeDistance < neighbor.distance) {
        neighbor.distance = tentativeDistance;
        neighbor.heuristic = manhattanDistance(neighbor, endNode);
        neighbor.fCost = neighbor.distance + neighbor.heuristic;
        neighbor.previousNode = current;

        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
          // Yield frontier step — shows A*'s open set expanding
          if (neighbor !== endNode) {
            yield { type: "frontier", row: neighbor.row, col: neighbor.col };
          }
        }
      }
    }
  }

  // No path found — generator ends without yielding path steps
}

function manhattanDistance(a: NodeData, b: NodeData): number {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

function getNeighbors(node: NodeData, grid: GridData): NodeData[] {
  const neighbors: NodeData[] = [];
  const { row, col } = node;

  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

  return neighbors;
}
