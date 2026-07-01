import { GraphStep, GraphNode, GraphEdge, GraphAlgorithmFn } from "./types";

function cloneState(
  nodes: Record<string, GraphNode>,
  edges: GraphEdge[]
): { nodes: Record<string, GraphNode>; edges: GraphEdge[] } {
  const clonedNodes: Record<string, GraphNode> = {};
  for (const id in nodes) {
    clonedNodes[id] = { ...nodes[id] };
  }
  const clonedEdges = edges.map((e) => ({ ...e }));
  return { nodes: clonedNodes, edges: clonedEdges };
}

function resetState(nodes: Record<string, GraphNode>, edges: GraphEdge[]) {
  for (const id in nodes) {
    nodes[id].status = "default";
  }
  edges.forEach((e) => {
    e.status = "default";
  });
}

function getAdjacencyList(edges: GraphEdge[]): Record<string, string[]> {
  const adj: Record<string, string[]> = {};
  edges.forEach((e) => {
    if (!adj[e.source]) adj[e.source] = [];
    if (!adj[e.target]) adj[e.target] = [];
    
    // Assuming undirected for visual simplicity unless specified
    adj[e.source].push(e.target);
    adj[e.target].push(e.source);
  });
  return adj;
}

export const traverseBFS: GraphAlgorithmFn = function* (initialNodes, initialEdges, startNodeId) {
  if (!startNodeId || !initialNodes[startNodeId]) return;

  const { nodes, edges } = cloneState(initialNodes, initialEdges);
  resetState(nodes, edges);
  const adj = getAdjacencyList(edges);

  const queue: string[] = [startNodeId];
  const visited = new Set<string>();

  yield {
    nodes: cloneState(nodes, edges).nodes,
    edges: cloneState(nodes, edges).edges,
    activeNodeIds: [],
    description: `Starting BFS from node ${startNodeId}`,
  };

  while (queue.length > 0) {
    const currentId = queue.shift()!;
    
    if (visited.has(currentId)) continue;
    
    visited.add(currentId);
    nodes[currentId].status = "visiting";

    yield {
      nodes: cloneState(nodes, edges).nodes,
      edges: cloneState(nodes, edges).edges,
      activeNodeIds: [currentId],
      description: `Visiting node ${currentId}`,
    };

    const neighbors = adj[currentId] || [];
    for (const neighborId of neighbors) {
      if (!visited.has(neighborId)) {
        nodes[neighborId].status = "active"; // mark as in queue/frontier
        
        // Mark edge as active
        const edge = edges.find(
          (e) => (e.source === currentId && e.target === neighborId) || 
                 (e.target === currentId && e.source === neighborId)
        );
        if (edge) edge.status = "active";

        queue.push(neighborId);
      }
    }

    yield {
      nodes: cloneState(nodes, edges).nodes,
      edges: cloneState(nodes, edges).edges,
      activeNodeIds: [currentId, ...neighbors.filter(n => !visited.has(n))],
      description: `Added neighbors of ${currentId} to the queue`,
    };

    nodes[currentId].status = "visited";
  }

  yield {
    nodes: cloneState(nodes, edges).nodes,
    edges: cloneState(nodes, edges).edges,
    activeNodeIds: [],
    description: `BFS Traversal Complete`,
  };
};

export const traverseDFS: GraphAlgorithmFn = function* (initialNodes, initialEdges, startNodeId) {
  if (!startNodeId || !initialNodes[startNodeId]) return;

  const { nodes, edges } = cloneState(initialNodes, initialEdges);
  resetState(nodes, edges);
  const adj = getAdjacencyList(edges);

  const stack: string[] = [startNodeId];
  const visited = new Set<string>();

  yield {
    nodes: cloneState(nodes, edges).nodes,
    edges: cloneState(nodes, edges).edges,
    activeNodeIds: [],
    description: `Starting DFS from node ${startNodeId}`,
  };

  while (stack.length > 0) {
    const currentId = stack.pop()!;
    
    if (visited.has(currentId)) continue;
    
    visited.add(currentId);
    nodes[currentId].status = "visiting";

    yield {
      nodes: cloneState(nodes, edges).nodes,
      edges: cloneState(nodes, edges).edges,
      activeNodeIds: [currentId],
      description: `Visiting node ${currentId}`,
    };

    const neighbors = adj[currentId] || [];
    // To visit in alphabetical order conceptually, we might push in reverse order, but for visual, any order is fine.
    // Reversing ensures that if we have neighbors A, B, we visit A first (since it's popped last).
    const unvisitedNeighbors = neighbors.filter(n => !visited.has(n));
    
    for (let i = unvisitedNeighbors.length - 1; i >= 0; i--) {
      const neighborId = unvisitedNeighbors[i];
      nodes[neighborId].status = "active"; 
      
      const edge = edges.find(
        (e) => (e.source === currentId && e.target === neighborId) || 
               (e.target === currentId && e.source === neighborId)
      );
      if (edge) edge.status = "active";

      stack.push(neighborId);
    }

    yield {
      nodes: cloneState(nodes, edges).nodes,
      edges: cloneState(nodes, edges).edges,
      activeNodeIds: [currentId, ...unvisitedNeighbors],
      description: `Added unvisited neighbors of ${currentId} to the stack`,
    };

    nodes[currentId].status = "visited";
  }

  yield {
    nodes: cloneState(nodes, edges).nodes,
    edges: cloneState(nodes, edges).edges,
    activeNodeIds: [],
    description: `DFS Traversal Complete`,
  };
};
