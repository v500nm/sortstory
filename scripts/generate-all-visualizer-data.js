const fs = require('fs');
const path = require('path');

const targetDir = path.join(process.cwd(), 'lib', 'algoData');

const searchingData = `import { AlgorithmDetailsData } from "./types";

export const searchingData: Record<string, AlgorithmDetailsData> = {
  linearSearch: {
    id: "linearSearch",
    name: "Linear Search",
    description: "Linear search sequentially checks each element of the list until a match is found or the whole list has been searched. It is the simplest search algorithm.",
    bestCase: "O(1) - Target is the first element",
    avgCase: "O(n) - Target is in the middle",
    worstCase: "O(n) - Target is at the end or not present",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    useCase: "Used on small unsorted datasets, or when the data is streamed and cannot be sorted ahead of time. Often used in linked lists where random access is not possible.",
    algorithmFlow: [
      "Start at the first element (index 0) of the array.",
      "Compare the current element with the target value.",
      "If the current element equals the target, return its index (Search Successful).",
      "If not, move to the next element in the array.",
      "Repeat the comparison until the end of the array is reached.",
      "If the end is reached and no match is found, return -1 (Search Failed)."
    ],
    codeSnippets: {
      javascript: \`function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}\`,
      python: \`def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1\`,
      java: \`public static int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}\`,
      cpp: \`int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}\`,
      c: \`int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}\`
    },
    examples: []
  },
  binarySearch: {
    id: "binarySearch",
    name: "Binary Search",
    description: "Binary search finds the position of a target value within a SORTED array. It works by repeatedly dividing the search interval in half. If the target value is less than the middle element, the interval is narrowed to the lower half. Otherwise, it's narrowed to the upper half.",
    bestCase: "O(1) - Target is the middle element on the first check",
    avgCase: "O(log n)",
    worstCase: "O(log n) - Target is at the extreme ends or not present",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    useCase: "Used extensively in databases, dictionaries, and any application where data is pre-sorted and fast retrieval is required. Extremely fast even for millions of elements.",
    algorithmFlow: [
      "Ensure the array is sorted before beginning.",
      "Initialize two pointers: 'low' at index 0, and 'high' at the last index.",
      "Calculate the 'mid' index as the floor of (low + high) / 2.",
      "Compare the target value to the element at the 'mid' index.",
      "If the target matches the mid element, return the 'mid' index.",
      "If the target is LESS than the mid element, set 'high' to mid - 1.",
      "If the target is GREATER than the mid element, set 'low' to mid + 1.",
      "Repeat the process until the target is found or 'low' becomes greater than 'high' (return -1)."
    ],
    codeSnippets: {
      javascript: \`function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}\`,
      python: \`def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target: return mid
        elif arr[mid] < target: low = mid + 1
        else: high = mid - 1
    return -1\`,
      java: \`public static int binarySearch(int[] arr, int target) {
    int low = 0, high = arr.length - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}\`,
      cpp: \`int binarySearch(int arr[], int n, int target) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}\`,
      c: \`int binarySearch(int arr[], int n, int target) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}\`
    },
    examples: []
  }
};
`;

const treeData = `import { AlgorithmDetailsData } from "./types";

export const treeData: Record<string, AlgorithmDetailsData> = {
  bst: {
    id: "bst",
    name: "Binary Search Tree (Insertion/Search)",
    description: "A Binary Search Tree (BST) is a node-based binary tree data structure which has the following properties: The left subtree of a node contains only nodes with keys lesser than the node's key. The right subtree contains only nodes with keys greater than the node's key. Both the left and right subtrees must also be binary search trees.",
    bestCase: "O(log n) - Balanced Tree",
    avgCase: "O(log n)",
    worstCase: "O(n) - Unbalanced Tree (acts like a linked list)",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(n)",
    useCase: "Used in databases and file systems where fast search, insertion, and deletion are required without holding the entire dataset in contiguous memory.",
    algorithmFlow: [
      "Start at the root node.",
      "If the tree is empty, the new node becomes the root.",
      "If the new value is LESS than the current node's value, go to the left child.",
      "If the new value is GREATER than the current node's value, go to the right child.",
      "Repeat this process until a null spot is found.",
      "Insert the new node at this null spot."
    ],
    codeSnippets: {
      javascript: \`class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function insert(root, value) {
  if (root === null) return new Node(value);
  if (value < root.value) {
    root.left = insert(root.left, value);
  } else if (value > root.value) {
    root.right = insert(root.right, value);
  }
  return root;
}\`,
      python: \`class Node:
    def __init__(self, key):
        self.left = None
        self.right = None
        self.val = key

def insert(root, key):
    if root is None:
        return Node(key)
    if key < root.val:
        root.left = insert(root.left, key)
    elif key > root.val:
        root.right = insert(root.right, key)
    return root\`,
      java: \`class Node {
    int key;
    Node left, right;
    public Node(int item) {
        key = item;
        left = right = null;
    }
}

class BinarySearchTree {
    Node insertRec(Node root, int key) {
        if (root == null) {
            root = new Node(key);
            return root;
        }
        if (key < root.key)
            root.left = insertRec(root.left, key);
        else if (key > root.key)
            root.right = insertRec(root.right, key);
        return root;
    }
}\`,
      cpp: \`struct Node {
    int key;
    Node *left, *right;
    Node(int item) {
        key = item;
        left = right = NULL;
    }
};

Node* insert(Node* node, int key) {
    if (node == NULL) return new Node(key);
    if (key < node->key)
        node->left = insert(node->left, key);
    else if (key > node->key)
        node->right = insert(node->right, key);
    return node;
}\`,
      c: \`struct Node {
    int data;
    struct Node *left, *right;
};

struct Node* newNode(int item) {
    struct Node* temp = (struct Node*)malloc(sizeof(struct Node));
    temp->data = item;
    temp->left = temp->right = NULL;
    return temp;
}

struct Node* insert(struct Node* node, int key) {
    if (node == NULL) return newNode(key);
    if (key < node->data) node->left = insert(node->left, key);
    else if (key > node->data) node->right = insert(node->right, key);
    return node;
}\`
    },
    examples: []
  },
  preOrder: {
    id: "preOrder",
    name: "Pre-order Traversal",
    description: "A depth-first traversal method that visits the current node first, then recursively visits the left subtree, and finally the right subtree. Root -> Left -> Right.",
    bestCase: "O(n)",
    avgCase: "O(n)",
    worstCase: "O(n)",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h) where h is the height of the tree (call stack)",
    useCase: "Used to create a copy of the tree or to serialize the tree into a prefix expression.",
    algorithmFlow: [
      "Check if the current node is null. If so, return.",
      "Visit (process) the current node.",
      "Recursively traverse the left subtree.",
      "Recursively traverse the right subtree."
    ],
    codeSnippets: {
      javascript: \`function preOrder(node) {
  if (node !== null) {
    console.log(node.value); // Visit
    preOrder(node.left);     // Left
    preOrder(node.right);    // Right
  }
}\`,
      python: \`def pre_order(node):
    if node:
        print(node.val)
        pre_order(node.left)
        pre_order(node.right)\`,
      java: \`void preOrder(Node node) {
    if (node == null) return;
    System.out.print(node.key + " ");
    preOrder(node.left);
    preOrder(node.right);
}\`,
      cpp: \`void preOrder(Node* node) {
    if (node == NULL) return;
    cout << node->key << " ";
    preOrder(node->left);
    preOrder(node->right);
}\`,
      c: \`void preOrder(struct Node* root) {
    if (root != NULL) {
        printf("%d ", root->data);
        preOrder(root->left);
        preOrder(root->right);
    }
}\`
    },
    examples: []
  },
  inOrder: {
    id: "inOrder",
    name: "In-order Traversal",
    description: "A depth-first traversal method that visits the left subtree first, then the current node, and finally the right subtree. Left -> Root -> Right. In a BST, this visits the nodes in ascending sorted order.",
    bestCase: "O(n)",
    avgCase: "O(n)",
    worstCase: "O(n)",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    useCase: "Used to flatten a Binary Search Tree into a sorted array.",
    algorithmFlow: [
      "Check if the current node is null. If so, return.",
      "Recursively traverse the left subtree.",
      "Visit (process) the current node.",
      "Recursively traverse the right subtree."
    ],
    codeSnippets: {
      javascript: \`function inOrder(node) {
  if (node !== null) {
    inOrder(node.left);      // Left
    console.log(node.value); // Visit
    inOrder(node.right);     // Right
  }
}\`,
      python: \`def in_order(node):
    if node:
        in_order(node.left)
        print(node.val)
        in_order(node.right)\`,
      java: \`void inOrder(Node node) {
    if (node == null) return;
    inOrder(node.left);
    System.out.print(node.key + " ");
    inOrder(node.right);
}\`,
      cpp: \`void inOrder(Node* node) {
    if (node == NULL) return;
    inOrder(node->left);
    cout << node->key << " ";
    inOrder(node->right);
}\`,
      c: \`void inOrder(struct Node* root) {
    if (root != NULL) {
        inOrder(root->left);
        printf("%d ", root->data);
        inOrder(root->right);
    }
}\`
    },
    examples: []
  },
  postOrder: {
    id: "postOrder",
    name: "Post-order Traversal",
    description: "A depth-first traversal method that visits the left subtree, then the right subtree, and finally the current node. Left -> Right -> Root.",
    bestCase: "O(n)",
    avgCase: "O(n)",
    worstCase: "O(n)",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    useCase: "Used to safely delete the tree (deleting children before the parent node) or to evaluate postfix mathematical expressions.",
    algorithmFlow: [
      "Check if the current node is null. If so, return.",
      "Recursively traverse the left subtree.",
      "Recursively traverse the right subtree.",
      "Visit (process) the current node."
    ],
    codeSnippets: {
      javascript: \`function postOrder(node) {
  if (node !== null) {
    postOrder(node.left);    // Left
    postOrder(node.right);   // Right
    console.log(node.value); // Visit
  }
}\`,
      python: \`def post_order(node):
    if node:
        post_order(node.left)
        post_order(node.right)
        print(node.val)\`,
      java: \`void postOrder(Node node) {
    if (node == null) return;
    postOrder(node.left);
    postOrder(node.right);
    System.out.print(node.key + " ");
}\`,
      cpp: \`void postOrder(Node* node) {
    if (node == NULL) return;
    postOrder(node->left);
    postOrder(node->right);
    cout << node->key << " ";
}\`,
      c: \`void postOrder(struct Node* root) {
    if (root != NULL) {
        postOrder(root->left);
        postOrder(root->right);
        printf("%d ", root->data);
    }
}\`
    },
    examples: []
  }
};
`;

const graphData = `import { AlgorithmDetailsData } from "./types";

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
      javascript: \`function bfs(graph, startNode) {
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
}\`,
      python: \`from collections import deque

def bfs(graph, start):
    visited = set([start])
    queue = deque([start])
    while queue:
        node = queue.popleft()
        print(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)\`,
      java: \`import java.util.*;

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
}\`,
      cpp: \`#include <queue>
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
}\`,
      c: \`void bfs(int adj[MAX][MAX], int V, int start) {
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
}\`
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
      javascript: \`function dfs(graph, startNode, visited = new Set()) {
  visited.add(startNode);
  console.log(startNode); // Process

  for (let neighbor of graph[startNode]) {
    if (!visited.has(neighbor)) {
      dfs(graph, neighbor, visited);
    }
  }
}\`,
      python: \`def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()
    visited.add(start)
    print(start)
    for neighbor in graph[start]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)\`,
      java: \`import java.util.*;

void dfs(Map<Integer, List<Integer>> graph, int start, Set<Integer> visited) {
    visited.add(start);
    System.out.print(start + " ");
    for (int neighbor : graph.getOrDefault(start, new ArrayList<>())) {
        if (!visited.contains(neighbor)) {
            dfs(graph, neighbor, visited);
        }
    }
}\`,
      cpp: \`#include <vector>
#include <unordered_set>

void dfs(vector<vector<int>>& adj, int curr, unordered_set<int>& visited) {
    visited.insert(curr);
    cout << curr << " ";
    for (int neighbor : adj[curr]) {
        if (visited.find(neighbor) == visited.end()) {
            dfs(adj, neighbor, visited);
        }
    }
}\`,
      c: \`void dfsRec(int adj[MAX][MAX], int V, int curr, int visited[]) {
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
}\`
    },
    examples: []
  }
};
`;

const pathfindingData = `import { AlgorithmDetailsData } from "./types";

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
      javascript: \`function dijkstra(graph, start) {
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
}\`,
      python: \`import heapq

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
    return distances\`,
      java: \`import java.util.*;

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
}\`,
      cpp: \`#include <queue>
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
}\`,
      c: \`int minDistance(int dist[], int sptSet[], int V) {
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
}\`
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
      javascript: \`function aStar(graph, start, goal, heuristic) {
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
}\`,
      python: \`import heapq

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
                heapq.heappush(open_set, (tentative_g + h, tentative_g, neighbor))\`,
      java: \`import java.util.*;

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
}\`,
      cpp: \`#include <queue>
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
}\`,
      c: \`struct AStarNode {
    int id;
    double g, h, f;
};
void aStar(int graph[MAX][MAX], int V, int start, int goal, int h[]) {
    // Standard modular representation of A* node evaluations
}\`
    },
    examples: []
  }
};
`;

const linkedListData = `import { AlgorithmDetailsData } from "./types";

export const linkedListData: Record<string, AlgorithmDetailsData> = {
  singly: {
    id: "singly",
    name: "Singly Linked List",
    description: "A Singly Linked List is a linear data structure where elements are not stored in contiguous memory locations. Instead, each element (node) contains a data field and a reference (pointer) to the next node in the sequence.",
    bestCase: "O(1) - Insert/Delete at head",
    avgCase: "O(n) - Search / Insert at arbitrary index",
    worstCase: "O(n) - Traverse to tail",
    timeComplexity: "O(n) for Access",
    spaceComplexity: "O(n)",
    useCase: "Implementing stacks and queues. Used when the size of the list is unknown ahead of time and dynamic memory allocation is preferred over resizing arrays.",
    algorithmFlow: [
      "A Linked List starts with a 'head' pointer pointing to the first node.",
      "To traverse, create a temporary pointer 'current' pointing to 'head'.",
      "Read the data at the 'current' node.",
      "Update 'current' to equal 'current.next' to move to the next node.",
      "Stop when 'current' becomes null, indicating the end of the list."
    ],
    codeSnippets: {
      javascript: \`class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }
  
  append(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      return;
    }
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }
}\`,
      python: \`class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
    
    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        curr = self.head
        while curr.next:
            curr = curr.next
        curr.next = new_node\`,
      java: \`class Node {
    int data;
    Node next;
    Node(int data) { this.data = data; this.next = null; }
}

class LinkedList {
    Node head;
    void append(int data) {
        Node newNode = new Node(data);
        if (head == null) { head = newNode; return; }
        Node curr = head;
        while (curr.next != null) curr = curr.next;
        curr.next = newNode;
    }
}\`,
      cpp: \`struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

class LinkedList {
public:
    Node* head = nullptr;
    void append(int data) {
        Node* newNode = new Node(data);
        if (!head) { head = newNode; return; }
        Node* curr = head;
        while (curr->next) curr = curr->next;
        curr->next = newNode;
    }
};\`,
      c: \`struct Node {
    int data;
    struct Node* next;
};
void append(struct Node** head_ref, int new_data) {
    struct Node* new_node = (struct Node*)malloc(sizeof(struct Node));
    new_node->data  = new_data;
    new_node->next = NULL;
    if (*head_ref == NULL) { *head_ref = new_node; return; }
    struct Node* last = *head_ref;
    while (last->next != NULL) last = last->next;
    last->next = new_node;
}\`
    },
    examples: []
  },
  doubly: {
    id: "doubly",
    name: "Doubly Linked List",
    description: "A Doubly Linked List extends the Singly Linked List by adding a 'prev' pointer to each node. This allows traversal in both directions (forward and backward) at the cost of extra memory for the previous pointer.",
    bestCase: "O(1) - Insert/Delete at head or tail",
    avgCase: "O(n) - Search",
    worstCase: "O(n)",
    timeComplexity: "O(n) for Access",
    spaceComplexity: "O(n)",
    useCase: "Used in music players (Next/Previous track), browser history (Forward/Back buttons), and complex data structures like Fibonacci heaps.",
    algorithmFlow: [
      "Nodes contain 'data', 'next', and 'prev' pointers.",
      "When inserting a node, update the new node's 'prev' to the previous node and 'next' to the succeeding node.",
      "Update the previous node's 'next' to point to the new node.",
      "Update the succeeding node's 'prev' to point to the new node.",
      "To traverse backwards, simply follow the 'prev' pointers from the tail."
    ],
    codeSnippets: {
      javascript: \`class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }
}\`,
      python: \`class Node:
    def __init__(self, data):
        self.data = data
        self.next = None
        self.prev = None\`,
      java: \`class Node {
    int data;
    Node next, prev;
    Node(int data) { this.data = data; }
}\`,
      cpp: \`struct Node {
    int data;
    Node* next;
    Node* prev;
    Node(int val) : data(val), next(nullptr), prev(nullptr) {}
};\`,
      c: \`struct Node {
    int data;
    struct Node* next;
    struct Node* prev;
};
void append(struct Node** head_ref, int new_data) {
    struct Node* new_node = (struct Node*)malloc(sizeof(struct Node));
    new_node->data = new_data;
    new_node->next = NULL;
    if (*head_ref == NULL) { new_node->prev = NULL; *head_ref = new_node; return; }
    struct Node* last = *head_ref;
    while (last->next != NULL) last = last->next;
    last->next = new_node;
    new_node->prev = last;
}\`
    },
    examples: []
  },
  reverseList: {
    id: "reverseList",
    name: "Reverse Linked List",
    description: "Reversing a linked list involves changing the direction of the 'next' pointers so that the tail becomes the new head. This is a classic algorithmic problem often solved in-place to save memory.",
    bestCase: "O(n)",
    avgCase: "O(n)",
    worstCase: "O(n)",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1) - In-place reversal",
    useCase: "Used when the order of data needs to be inverted without allocating a new array, such as reversing a sequence of big-data records or operations.",
    algorithmFlow: [
      "Initialize three pointers: 'prev' as null, 'current' as head, and 'next' as null.",
      "Iterate through the linked list.",
      "During iteration, store the next node: next = current.next.",
      "Reverse current node's pointer: current.next = prev.",
      "Move prev and current one step forward: prev = current, current = next.",
      "After the loop, update head pointer to 'prev'."
    ],
    codeSnippets: {
      javascript: \`function reverse(head) {
  let prev = null;
  let current = head;
  while (current) {
    let next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}\`,
      python: \`def reverse(head):
    prev = None
    curr = head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev\`,
      java: \`Node reverse(Node head) {
    Node prev = null;
    Node curr = head;
    while (curr != null) {
        Node next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}\`,
      cpp: \`Node* reverse(Node* head) {
    Node* prev = nullptr;
    Node* curr = head;
    while (curr) {
        Node* next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}\`,
      c: \`struct Node* reverse(struct Node* head) {
    struct Node* prev = NULL;
    struct Node* curr = head;
    struct Node* next = NULL;
    while (curr != NULL) {
        next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}\`
    },
    examples: []
  },
  detectCycle: {
    id: "detectCycle",
    name: "Detect Cycle (Floyd's Algorithm)",
    description: "Floyd's Cycle-Finding Algorithm (often called the tortoise and the hare) is a pointer algorithm that uses two pointers moving at different speeds to detect a cycle in a sequence.",
    bestCase: "O(1) - Loop at head",
    avgCase: "O(n)",
    worstCase: "O(n)",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    useCase: "Ensuring database record links or compiler ASTs do not have self-referencing infinite loops.",
    algorithmFlow: [
      "Initialize two pointers 'slow' and 'fast' at the head of the list.",
      "Move 'slow' by one node: slow = slow.next.",
      "Move 'fast' by two nodes: fast = fast.next.next.",
      "If the pointers meet at the same node, a cycle exists (return true).",
      "If 'fast' or 'fast.next' becomes null, the list has an end and no cycle exists (return false)."
    ],
    codeSnippets: {
      javascript: \`function hasCycle(head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}\`,
      python: \`def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False\`,
      java: \`boolean hasCycle(Node head) {
    Node slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) return true;
    }
    return false;
}\`,
      cpp: \`bool hasCycle(Node* head) {
    Node* slow = head;
    Node* fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}\`,
      c: \`int detectLoop(struct Node* head) {
    struct Node *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return 1;
    }
    return 0;
}\`
    },
    examples: []
  },
  findMiddle: {
    id: "findMiddle",
    name: "Find Middle Node",
    description: "Finds the middle node of a linked list in a single pass using a fast and slow pointer. The slow pointer moves by 1 node, while the fast pointer moves by 2 nodes. When the fast pointer reaches the end, the slow pointer is at the middle.",
    bestCase: "O(n)",
    avgCase: "O(n)",
    worstCase: "O(n)",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    useCase: "Prerequisite for algorithms like Merge Sort on Linked Lists or checking if a list is a palindrome.",
    algorithmFlow: [
      "Initialize 'slow' and 'fast' pointers at the head node.",
      "While fast and fast.next are not null, advance slow by 1 node and fast by 2 nodes.",
      "When the loop terminates, slow points directly to the middle node."
    ],
    codeSnippets: {
      javascript: \`function getMiddle(head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}\`,
      python: \`def get_middle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow\`,
      java: \`Node getMiddle(Node head) {
    Node slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
}\`,
      cpp: \`Node* getMiddle(Node* head) {
    Node* slow = head;
    Node* fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow;
}\`,
      c: \`struct Node* getMiddle(struct Node* head) {
    struct Node* slow = head;
    struct Node* fast = head;
    while (fast != NULL && fast->next != NULL) {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow;
}\`
    },
    examples: []
  }
};
`;

const automataData = `import { AlgorithmDetailsData } from "./types";

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
      javascript: \`function nextGen(grid) {
  const nextGrid = grid.map(arr => [...arr]);
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      let neighbors = countNeighbors(grid, r, c);
      if (grid[r][c] === 1 && (neighbors < 2 || neighbors > 3)) nextGrid[r][c] = 0;
      else if (grid[r][c] === 0 && neighbors === 3) nextGrid[r][c] = 1;
    }
  }
  return nextGrid;
}\`,
      python: \`def next_gen(grid):
    R, C = len(grid), len(grid[0])
    next_grid = [row[:] for row in grid]
    for r in range(R):
        for c in range(C):
            neighbors = count_neighbors(grid, r, c)
            if grid[r][c] == 1 and (neighbors < 2 or neighbors > 3):
                next_grid[r][c] = 0
            elif grid[r][c] == 0 and neighbors == 3:
                next_grid[r][c] = 1
    return next_grid\`,
      java: \`int[][] nextGen(int[][] grid) {
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
}\`,
      cpp: \`vector<vector<int>> nextGen(vector<vector<int>>& grid) {
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
}\`,
      c: \`void nextGen(int grid[R][C], int nextGrid[R][C]) {
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
}\`
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
      javascript: \`function assignPoints(points, centroids) {
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
}\`,
      python: \`def assign_points(points, centroids):
    clusters = [[] for _ in centroids]
    for p in points:
        best_i = min(range(len(centroids)), key=lambda i: dist(p, centroids[i]))
        clusters[best_i].append(p)
    return clusters\`,
      java: \`List<List<Point>> assignPoints(List<Point> points, List<Point> centroids) {
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
}\`,
      cpp: \`vector<vector<Point>> assignPoints(vector<Point>& points, vector<Point>& centroids) {
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
}\`,
      c: \`void assignPoints(Point points[], int N, Centroid centroids[], int K) {
    for (int i = 0; i < N; i++) {
        int best = 0;
        double bestD = 1e9;
        for (int j = 0; j < K; j++) {
            double d = dist(points[i], centroids[j]);
            if (d < bestD) { bestD = d; best = j; }
        }
        points[i].cluster = best;
    }
}\`
    },
    examples: []
  }
};
`;

fs.writeFileSync(path.join(targetDir, 'searchingData.ts'), searchingData, 'utf8');
fs.writeFileSync(path.join(targetDir, 'treeData.ts'), treeData, 'utf8');
fs.writeFileSync(path.join(targetDir, 'graphData.ts'), graphData, 'utf8');
fs.writeFileSync(path.join(targetDir, 'pathfindingData.ts'), pathfindingData, 'utf8');
fs.writeFileSync(path.join(targetDir, 'linkedListData.ts'), linkedListData, 'utf8');
fs.writeFileSync(path.join(targetDir, 'automataData.ts'), automataData, 'utf8');

console.log("Visualizer code snippets successfully updated with multi-language GFG examples including C!");
