import { AlgorithmDetailsData } from "./types";

export const pathfindingData: Record<string, AlgorithmDetailsData> = {
  dijkstra: {
    id: "dijkstra",
    name: "Dijkstra's Algorithm",
    description: "Dijkstra's algorithm guarantees the shortest path from a start node to all other nodes in a graph with non-negative edge weights. It blindly explores all directions evenly, using a priority queue to always process the nearest unvisited node first.",
    bestCase: "O(E + V log V) - Sparse graph using a Min-Heap",
    avgCase: "O(E + V log V)",
    worstCase: "O(E + V log V)",
    timeComplexity: "O(E + V log V)",
    spaceComplexity: "O(V)",
    useCase: "Used in network routing protocols (like OSPF) where weights represent bandwidth or latency, and in map applications when finding the shortest route when no heuristic (like physical distance) is known.",
    algorithmFlow: [
      "Assign a distance of 0 to the start node and Infinity to all other nodes.",
      "Add all nodes to an unvisited Priority Queue (Min-Heap), ordered by distance.",
      "While the queue is not empty, extract the node with the minimum distance.",
      "If the extracted node is the target node, we are done.",
      "For each neighbor of the current node, calculate the tentative distance (current node distance + edge weight).",
      "If the tentative distance is LESS than the neighbor's current recorded distance, update the neighbor's distance.",
      "Update the neighbor's 'previous node' pointer to the current node (to reconstruct the path later).",
      "Once all nodes are visited or the target is reached, backtrack from the target using the 'previous node' pointers to form the shortest path."
    ],
    codeSnippets: {
      javascript: `function dijkstra(graph, start) {
  const distances = {};
  const pq = new PriorityQueue();
  
  for (let node in graph) {
    distances[node] = Infinity;
  }
  distances[start] = 0;
  pq.enqueue(start, 0);

  while (!pq.isEmpty()) {
    const current = pq.dequeue();

    for (let neighbor in graph[current]) {
      let newDist = distances[current] + graph[current][neighbor];
      if (newDist < distances[neighbor]) {
        distances[neighbor] = newDist;
        pq.enqueue(neighbor, newDist);
      }
    }
  }
  return distances;
}`
    },
    examples: [
      {
        title: "Network Packet Routing",
        description: "Finding the fastest route for a packet across a computer network where links have varied latencies.",
        code: `// Assuming a graph of router latencies
const shortestTimes = dijkstra(routerNetwork, "RouterA");`
      }
    ]
  },
  astar: {
    id: "astar",
    name: "A* Search",
    description: "A* is a 'smart' pathfinding algorithm. It is an extension of Dijkstra's algorithm that uses a heuristic function to guide its search towards the target. By prioritizing nodes that seem closer to the goal (using distance estimates like Manhattan or Euclidean distance), A* explores significantly fewer nodes than Dijkstra while still guaranteeing the shortest path.",
    bestCase: "O(E) - When the heuristic perfectly guides to the target without exploring wrong paths",
    avgCase: "O(E)",
    worstCase: "O(E + V log V) - When the heuristic is useless (reverts to Dijkstra)",
    timeComplexity: "O(E)",
    spaceComplexity: "O(V)",
    useCase: "The standard algorithm for AI pathfinding in video games, GPS navigation systems, and robotics where the physical coordinates of the nodes are known.",
    algorithmFlow: [
      "Calculate the f-score for each node: f(n) = g(n) + h(n), where g(n) is the exact cost from start, and h(n) is the heuristic estimated cost to the goal.",
      "Assign g-score of 0 to the start node and Infinity to all others.",
      "Add the start node to an 'Open Set' Priority Queue, ordered by f-score.",
      "While the Open Set is not empty, extract the node with the lowest f-score.",
      "If the extracted node is the target node, backtrack to construct the path and terminate.",
      "For each neighbor, calculate a tentative g-score (current g-score + edge weight).",
      "If the tentative g-score is lower than the neighbor's recorded g-score, update it.",
      "Recalculate the neighbor's f-score (new g-score + heuristic) and add it to the Open Set if not already present."
    ],
    codeSnippets: {
      javascript: `function aStar(graph, start, goal, heuristic) {
  const gScore = { [start]: 0 };
  const fScore = { [start]: heuristic(start, goal) };
  const openSet = new PriorityQueue();
  openSet.enqueue(start, fScore[start]);

  while (!openSet.isEmpty()) {
    const current = openSet.dequeue();
    if (current === goal) return constructPath(current);

    for (let neighbor of graph[current].neighbors) {
      let tentative_gScore = gScore[current] + graph[current].weight(neighbor);
      
      if (tentative_gScore < (gScore[neighbor] || Infinity)) {
        gScore[neighbor] = tentative_gScore;
        fScore[neighbor] = tentative_gScore + heuristic(neighbor, goal);
        openSet.enqueue(neighbor, fScore[neighbor]);
      }
    }
  }
}`
    },
    examples: [
      {
        title: "2D Grid Game Pathfinding",
        description: "Moving an NPC across a tile map while avoiding walls.",
        code: `// Heuristic calculates the Manhattan distance (abs(x1-x2) + abs(y1-y2))
const path = aStar(gridMap, npcPos, playerPos, manhattanDistance);`
      }
    ]
  }
};
