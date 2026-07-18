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
}`,
      python: `import heapq

def dijkstra(graph, start):
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    pq = [(0, start)]
    while pq:
        curr_dist, curr_node = heapq.heappop(pq)
        if curr_dist > distances[curr_node]:
            continue
        for neighbor, weight in graph[curr_node].items():
            dist = curr_dist + weight
            if dist < distances[neighbor]:
                distances[neighbor] = dist
                heapq.heappush(pq, (dist, neighbor))
    return distances`,
      java: `import java.util.*;

Map<Integer, Integer> dijkstra(Map<Integer, Map<Integer, Integer>> graph, int start) {
    Map<Integer, Integer> distances = new HashMap<>();
    PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[1]));
    for (int node : graph.keySet()) distances.put(node, Integer.MAX_VALUE);
    
    distances.put(start, 0);
    pq.add(new int[]{start, 0});
    
    while (!pq.isEmpty()) {
        int[] curr = pq.poll();
        int node = curr[0];
        int dist = curr[1];
        if (dist > distances.get(node)) continue;
        
        for (var edge : graph.getOrDefault(node, Map.of()).entrySet()) {
            int newDist = dist + edge.getValue();
            if (newDist < distances.get(edge.getKey())) {
                distances.put(edge.getKey(), newDist);
                pq.add(new int[]{edge.getKey(), newDist});
            }
        }
    }
    return distances;
}`,
      cpp: `#include <queue>
#include <vector>
#include <unordered_map>

unordered_map<int, int> dijkstra(unordered_map<int, unordered_map<int, int>>& graph, int start) {
    unordered_map<int, int> distances;
    for (auto& pair : graph) distances[pair.first] = 1e9;
    distances[start] = 0;
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    pq.push({0, start});
    
    while (!pq.empty()) {
        auto [dist, node] = pq.top();
        pq.pop();
        if (dist > distances[node]) continue;
        
        for (auto& edge : graph[node]) {
            int newDist = dist + edge.second;
            if (newDist < distances[edge.first]) {
                distances[edge.first] = newDist;
                pq.push({newDist, edge.first});
            }
        }
    }
    return distances;
}`,
      c: `int minDistance(int dist[], int sptSet[], int V) {
    int min = INT_MAX, min_index;
    for (int v = 0; v < V; v++)
        if (sptSet[v] == 0 && dist[v] <= min) min = dist[v], min_index = v;
    return min_index;
}
void dijkstra(int graph[MAX][MAX], int V, int start) {
    int dist[V];
    int sptSet[V];
    for (int i = 0; i < V; i++) dist[i] = INT_MAX, sptSet[i] = 0;
    dist[start] = 0;
    for (int count = 0; count < V - 1; count++) {
        int u = minDistance(dist, sptSet, V);
        sptSet[u] = 1;
        for (int v = 0; v < V; v++)
            if (!sptSet[v] && graph[u][v] && dist[u] != INT_MAX && dist[u] + graph[u][v] < dist[v])
                dist[v] = dist[u] + graph[u][v];
    }
}`
    },
    examples: []
  },
  aStar: {
    id: "aStar",
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
}`,
      python: `import heapq

def a_star(graph, start, goal, h_func):
    open_set = [(h_func(start, goal), 0, start)]
    g_score = {start: 0}
    
    while open_set:
        f, g, current = heapq.heappop(open_set)
        if current == goal:
            return retrace_path(current)
        for neighbor, cost in graph[current].items():
            tentative_g = g + cost
            if tentative_g < g_score.get(neighbor, float('inf')):
                g_score[neighbor] = tentative_g
                h = h_func(neighbor, goal)
                heapq.heappush(open_set, (tentative_g + h, tentative_g, neighbor))`,
      java: `import java.util.*;

List<Node> aStar(Node start, Node goal, Heuristic h) {
    PriorityQueue<Node> openSet = new PriorityQueue<>(Comparator.comparingDouble(n -> n.f));
    start.g = 0;
    start.f = h.estimate(start, goal);
    openSet.add(start);
    
    while (!openSet.isEmpty()) {
        Node curr = openSet.poll();
        if (curr == goal) return retrace(curr);
        for (Edge edge : curr.edges) {
            double tenG = curr.g + edge.weight;
            if (tenG < edge.target.g) {
                edge.target.g = tenG;
                edge.target.f = tenG + h.estimate(edge.target, goal);
                openSet.add(edge.target);
            }
        }
    }
    return null;
}`,
      cpp: `#include <queue>
#include <unordered_map>
#include <vector>

vector<Node*> aStar(Node* start, Node* goal, Heuristic h) {
    auto cmp = [](Node* a, Node* b) { return a->f > b->f; };
    priority_queue<Node*, vector<Node*>, decltype(cmp)> openSet(cmp);
    start->g = 0;
    start->f = h.estimate(start, goal);
    openSet.push(start);
    
    while (!openSet.empty()) {
        Node* curr = openSet.top();
        openSet.pop();
        if (curr == goal) return retrace(curr);
        for (Edge& edge : curr->edges) {
            double tenG = curr->g + edge.weight;
            if (tenG < edge.target->g) {
                edge.target->g = tenG;
                edge.target->f = tenG + h.estimate(edge.target, goal);
                openSet.push(edge.target);
            }
        }
    }
    return {};
}`,
      c: `struct AStarNode {
    int id;
    double g, h, f;
};
void aStar(int graph[MAX][MAX], int V, int start, int goal, int h[]) {
    // Standard modular representation of A* node evaluations
}`
    },
    examples: []
  }
};
