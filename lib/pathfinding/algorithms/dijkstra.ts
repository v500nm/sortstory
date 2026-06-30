import { GridData, NodeData, PathfindingAlgorithmFn, PathfindingStep } from "../types";

export const dijkstra: PathfindingAlgorithmFn = function* (grid, startNode, endNode) {
  const visitedNodesInOrder: NodeData[] = [];
  startNode.distance = 0;
  
  // Flatten grid to get all nodes
  const unvisitedNodes: NodeData[] = [];
  for (const row of grid) {
    for (const node of row) {
      unvisitedNodes.push(node);
    }
  }

  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();

    if (!closestNode) break;

    // If we encounter a wall, we skip it.
    if (closestNode.type === "wall") continue;

    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode.distance === Infinity) break;

    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    
    if (closestNode.type !== "start" && closestNode.type !== "end") {
      yield { type: "visit", row: closestNode.row, col: closestNode.col };
    }

    if (closestNode === endNode) {
      // We found the target. Now trace back the path.
      const path: PathfindingStep[] = [];
      let currentNode: NodeData | null = endNode;
      while (currentNode !== null) {
        if (currentNode.type !== "start" && currentNode.type !== "end") {
          path.unshift({ type: "path", row: currentNode.row, col: currentNode.col });
        }
        currentNode = currentNode.previousNode;
      }
      for (const step of path) {
        yield step;
      }
      return;
    }

    updateUnvisitedNeighbors(closestNode, grid);
  }
};

function sortNodesByDistance(unvisitedNodes: NodeData[]) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node: NodeData, grid: GridData) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

function getUnvisitedNeighbors(node: NodeData, grid: GridData): NodeData[] {
  const neighbors: NodeData[] = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}
