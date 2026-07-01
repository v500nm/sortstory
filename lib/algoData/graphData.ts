import { AlgorithmDetailsData } from "./types";

export const graphData: Record<string, AlgorithmDetailsData> = {
  bfs: {
    id: "bfs",
    name: "Breadth-First Search (BFS)",
    description: "Breadth-First Search is an algorithm for searching a tree or graph data structure. It starts at the tree root (or an arbitrary node of a graph) and explores all nodes at the present depth prior to moving on to the nodes at the next depth level. It uses a Queue to keep track of the next nodes to visit.",
    bestCase: "O(V + E) where V is vertices and E is edges",
    avgCase: "O(V + E)",
    worstCase: "O(V + E)",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V) - For the queue and visited set",
    useCase: "Finding the shortest path in unweighted graphs (like minimum jumps to reach a state), peer-to-peer networks, web crawlers, and social networking features (e.g. finding people 1 connection away).",
    algorithmFlow: [
      "Initialize an empty Queue and a 'visited' set.",
      "Enqueue the starting node and mark it as visited.",
      "While the Queue is not empty, dequeue a node.",
      "Process (visit) the dequeued node.",
      "For each unvisited neighbor of this node, mark it as visited and enqueue it.",
      "Repeat until the Queue is empty."
    ],
    codeSnippets: {
      javascript: `function bfs(graph, startNode) {
  const visited = new Set();
  const queue = [startNode];
  visited.add(startNode);

  while (queue.length > 0) {
    const current = queue.shift(); // Dequeue
    console.log(current); // Process

    for (let neighbor of graph[current]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor); // Enqueue
      }
    }
  }
}`
    },
    examples: []
  },
  dfs: {
    id: "dfs",
    name: "Depth-First Search (DFS)",
    description: "Depth-First Search is an algorithm that starts at the root node (or an arbitrary node) and explores as far as possible along each branch before backtracking. It uses a Stack (or the call stack via recursion) to remember where to backtrack to.",
    bestCase: "O(V + E)",
    avgCase: "O(V + E)",
    worstCase: "O(V + E)",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V) - For the recursion stack in the worst case (a line graph)",
    useCase: "Detecting cycles in a graph, topological sorting (used in build systems and task scheduling), finding connected components, and solving puzzles like mazes with only one solution.",
    algorithmFlow: [
      "Initialize a 'visited' set.",
      "Start at the root node and mark it as visited.",
      "Process the current node.",
      "For each neighbor of the current node, if it is not visited, recursively call the DFS function on that neighbor.",
      "If a node has no unvisited neighbors, backtrack (return from the recursive call)."
    ],
    codeSnippets: {
      javascript: `function dfs(graph, startNode, visited = new Set()) {
  visited.add(startNode);
  console.log(startNode); // Process

  for (let neighbor of graph[startNode]) {
    if (!visited.has(neighbor)) {
      dfs(graph, neighbor, visited);
    }
  }
}`
    },
    examples: []
  }
};
