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
}`,
      python: `from collections import deque

def bfs(graph, start):
    visited = set([start])
    queue = deque([start])
    while queue:
        node = queue.popleft()
        print(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)`,
      java: `import java.util.*;

void bfs(Map<Integer, List<Integer>> graph, int start) {
    Set<Integer> visited = new HashSet<>();
    Queue<Integer> queue = new LinkedList<>();
    
    visited.add(start);
    queue.add(start);
    
    while (!queue.isEmpty()) {
        int node = queue.poll();
        System.out.print(node + " ");
        for (int neighbor : graph.getOrDefault(node, new ArrayList<>())) {
            if (!visited.contains(neighbor)) {
                visited.add(neighbor);
                queue.add(neighbor);
            }
        }
    }
}`,
      cpp: `#include <queue>
#include <vector>
#include <unordered_set>

void bfs(vector<vector<int>>& adj, int start) {
    unordered_set<int> visited;
    queue<int> q;
    
    visited.insert(start);
    q.push(start);
    
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        cout << node << " ";
        for (int neighbor : adj[node]) {
            if (visited.find(neighbor) == visited.end()) {
                visited.insert(neighbor);
                q.push(neighbor);
            }
        }
    }
}`,
      c: `void bfs(int adj[MAX][MAX], int V, int start) {
    int visited[MAX] = {0};
    int queue[MAX], front = 0, rear = 0;
    visited[start] = 1;
    queue[rear++] = start;
    while (front < rear) {
        int curr = queue[front++];
        printf("%d ", curr);
        for (int i = 0; i < V; i++) {
            if (adj[curr][i] && !visited[i]) {
                visited[i] = 1;
                queue[rear++] = i;
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
}`,
      python: `def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()
    visited.add(start)
    print(start)
    for neighbor in graph[start]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)`,
      java: `import java.util.*;

void dfs(Map<Integer, List<Integer>> graph, int start, Set<Integer> visited) {
    visited.add(start);
    System.out.print(start + " ");
    for (int neighbor : graph.getOrDefault(start, new ArrayList<>())) {
        if (!visited.contains(neighbor)) {
            dfs(graph, neighbor, visited);
        }
    }
}`,
      cpp: `#include <vector>
#include <unordered_set>

void dfs(vector<vector<int>>& adj, int curr, unordered_set<int>& visited) {
    visited.insert(curr);
    cout << curr << " ";
    for (int neighbor : adj[curr]) {
        if (visited.find(neighbor) == visited.end()) {
            dfs(adj, neighbor, visited);
        }
    }
}`,
      c: `void dfsRec(int adj[MAX][MAX], int V, int curr, int visited[]) {
    visited[curr] = 1;
    printf("%d ", curr);
    for (int i = 0; i < V; i++) {
        if (adj[curr][i] && !visited[i]) {
            dfsRec(adj, V, i, visited);
        }
    }
}
void dfs(int adj[MAX][MAX], int V, int start) {
    int visited[MAX] = {0};
    dfsRec(adj, V, start, visited);
}`
    },
    examples: []
  }
};
