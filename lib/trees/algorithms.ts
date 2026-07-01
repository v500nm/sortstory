import { TreeStep, TreeNode, TreeAlgorithmFn } from "./types";

/**
 * Creates a deep copy of the nodes object to yield immutable states
 */
function cloneNodes(nodes: Record<string, TreeNode>): Record<string, TreeNode> {
  const clone: Record<string, TreeNode> = {};
  for (const key in nodes) {
    clone[key] = { ...nodes[key] };
  }
  return clone;
}

/**
 * Resets all node statuses to 'default'
 */
function resetStatuses(nodes: Record<string, TreeNode>) {
  for (const key in nodes) {
    nodes[key].status = "default";
  }
}

/**
 * 1. Search BST
 */
export const searchBST: TreeAlgorithmFn = function* (initialNodes, rootId, targetValue) {
  if (!rootId || targetValue === undefined) return;

  const nodes = cloneNodes(initialNodes);
  resetStatuses(nodes);
  
  yield {
    nodes: cloneNodes(nodes),
    rootId,
    activeNodeIds: [],
    description: `Starting search for ${targetValue}`,
  };

  let currentId: string | null = rootId;

  while (currentId) {
    const currentNode: TreeNode = nodes[currentId];
    currentNode.status = "comparing";
    
    yield {
      nodes: cloneNodes(nodes),
      rootId,
      activeNodeIds: [currentId],
      description: `Comparing with ${currentNode.value}`,
    };

    if (currentNode.value === targetValue) {
      currentNode.status = "found";
      yield {
        nodes: cloneNodes(nodes),
        rootId,
        activeNodeIds: [currentId],
        description: `Found ${targetValue}!`,
      };
      return;
    }

    currentNode.status = "default";

    if (targetValue < currentNode.value) {
      currentId = currentNode.left;
      yield {
        nodes: cloneNodes(nodes),
        rootId,
        activeNodeIds: [],
        description: `${targetValue} < ${currentNode.value}, moving left`,
      };
    } else {
      currentId = currentNode.right;
      yield {
        nodes: cloneNodes(nodes),
        rootId,
        activeNodeIds: [],
        description: `${targetValue} > ${currentNode.value}, moving right`,
      };
    }
  }

  yield {
    nodes: cloneNodes(nodes),
    rootId,
    activeNodeIds: [],
    description: `${targetValue} not found in the tree.`,
  };
};

/**
 * 2. In-Order Traversal
 */
export const traverseInOrder: TreeAlgorithmFn = function* (initialNodes, rootId) {
  if (!rootId) return;

  const nodes = cloneNodes(initialNodes);
  resetStatuses(nodes);

  function* traverse(nodeId: string | null): Generator<TreeStep, void, unknown> {
    if (!nodeId) return;

    const node = nodes[nodeId];
    
    node.status = "active";
    yield {
      nodes: cloneNodes(nodes),
      rootId,
      activeNodeIds: [nodeId],
      description: `Visiting node ${node.value} (Going Left)`,
    };
    node.status = "default";

    yield* traverse(node.left);

    node.status = "found";
    yield {
      nodes: cloneNodes(nodes),
      rootId,
      activeNodeIds: [nodeId],
      description: `Processing node ${node.value}`,
    };
    node.status = "default";

    yield* traverse(node.right);
  }

  yield {
    nodes: cloneNodes(nodes),
    rootId,
    activeNodeIds: [],
    description: `Starting In-Order Traversal (Left, Root, Right)`,
  };

  yield* traverse(rootId);

  yield {
    nodes: cloneNodes(nodes),
    rootId,
    activeNodeIds: [],
    description: `In-Order Traversal Complete`,
  };
};

/**
 * 3. Pre-Order Traversal
 */
export const traversePreOrder: TreeAlgorithmFn = function* (initialNodes, rootId) {
  if (!rootId) return;

  const nodes = cloneNodes(initialNodes);
  resetStatuses(nodes);

  function* traverse(nodeId: string | null): Generator<TreeStep, void, unknown> {
    if (!nodeId) return;

    const node: TreeNode = nodes[nodeId];
    
    node.status = "found";
    yield {
      nodes: cloneNodes(nodes),
      rootId,
      activeNodeIds: [nodeId],
      description: `Processing node ${node.value}`,
    };
    node.status = "default";

    yield* traverse(node.left);
    yield* traverse(node.right);
  }

  yield {
    nodes: cloneNodes(nodes),
    rootId,
    activeNodeIds: [],
    description: `Starting Pre-Order Traversal (Root, Left, Right)`,
  };

  yield* traverse(rootId);

  yield {
    nodes: cloneNodes(nodes),
    rootId,
    activeNodeIds: [],
    description: `Pre-Order Traversal Complete`,
  };
};

/**
 * 4. Post-Order Traversal
 */
export const traversePostOrder: TreeAlgorithmFn = function* (initialNodes, rootId) {
  if (!rootId) return;

  const nodes = cloneNodes(initialNodes);
  resetStatuses(nodes);

  function* traverse(nodeId: string | null): Generator<TreeStep, void, unknown> {
    if (!nodeId) return;

    const node = nodes[nodeId];
    
    node.status = "active";
    yield {
      nodes: cloneNodes(nodes),
      rootId,
      activeNodeIds: [nodeId],
      description: `Visiting node ${node.value} (Going Down)`,
    };
    node.status = "default";

    yield* traverse(node.left);
    yield* traverse(node.right);

    node.status = "found";
    yield {
      nodes: cloneNodes(nodes),
      rootId,
      activeNodeIds: [nodeId],
      description: `Processing node ${node.value}`,
    };
    node.status = "default";
  }

  yield {
    nodes: cloneNodes(nodes),
    rootId,
    activeNodeIds: [],
    description: `Starting Post-Order Traversal (Left, Right, Root)`,
  };

  yield* traverse(rootId);

  yield {
    nodes: cloneNodes(nodes),
    rootId,
    activeNodeIds: [],
    description: `Post-Order Traversal Complete`,
  };
};

/**
 * 5. Insert into BST (Animated)
 */
export const insertBST: TreeAlgorithmFn = function* (initialNodes, rootId, targetValue) {
  if (targetValue === undefined) return;

  const nodes = cloneNodes(initialNodes);
  resetStatuses(nodes);

  const newNodeId = `node-${targetValue}-${Date.now()}`;
  const newNode: TreeNode = {
    id: newNodeId,
    value: targetValue,
    left: null,
    right: null,
    status: "found"
  };

  if (!rootId) {
    nodes[newNodeId] = newNode;
    yield {
      nodes: cloneNodes(nodes),
      rootId: newNodeId,
      activeNodeIds: [newNodeId],
      description: `Tree is empty. Inserted ${targetValue} as root.`,
    };
    return;
  }

  yield {
    nodes: cloneNodes(nodes),
    rootId,
    activeNodeIds: [],
    description: `Inserting ${targetValue}...`,
  };

  let currentId: string = rootId;

  while (true) {
    const currentNode: TreeNode = nodes[currentId];
    currentNode.status = "comparing";
    
    yield {
      nodes: cloneNodes(nodes),
      rootId,
      activeNodeIds: [currentId],
      description: `Comparing with ${currentNode.value}`,
    };

    currentNode.status = "default";

    if (targetValue < currentNode.value) {
      if (!currentNode.left) {
        nodes[newNodeId] = newNode;
        currentNode.left = newNodeId;
        yield {
          nodes: cloneNodes(nodes),
          rootId,
          activeNodeIds: [newNodeId],
          description: `Inserted ${targetValue} as left child of ${currentNode.value}`,
        };
        break;
      } else {
        currentId = currentNode.left;
        yield {
          nodes: cloneNodes(nodes),
          rootId,
          activeNodeIds: [],
          description: `${targetValue} < ${currentNode.value}, moving left`,
        };
      }
    } else {
      if (!currentNode.right) {
        nodes[newNodeId] = newNode;
        currentNode.right = newNodeId;
        yield {
          nodes: cloneNodes(nodes),
          rootId,
          activeNodeIds: [newNodeId],
          description: `Inserted ${targetValue} as right child of ${currentNode.value}`,
        };
        break;
      } else {
        currentId = currentNode.right;
        yield {
          nodes: cloneNodes(nodes),
          rootId,
          activeNodeIds: [],
          description: `${targetValue} >= ${currentNode.value}, moving right`,
        };
      }
    }
  }
};
