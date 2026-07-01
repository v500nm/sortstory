import { AlgorithmDetailsData } from "./types";

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
      javascript: `class Node {
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
}`
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
      javascript: `function preOrder(node) {
  if (node !== null) {
    console.log(node.value); // Visit
    preOrder(node.left);     // Left
    preOrder(node.right);    // Right
  }
}`
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
      javascript: `function inOrder(node) {
  if (node !== null) {
    inOrder(node.left);      // Left
    console.log(node.value); // Visit
    inOrder(node.right);     // Right
  }
}`
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
      javascript: `function postOrder(node) {
  if (node !== null) {
    postOrder(node.left);    // Left
    postOrder(node.right);   // Right
    console.log(node.value); // Visit
  }
}`
    },
    examples: []
  }
};
