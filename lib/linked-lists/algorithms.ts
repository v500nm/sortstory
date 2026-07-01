import { ListNode, LinkedListStep, LinkedListAlgorithmFn, NodeStatus } from "./types";

// Helper to deeply clone the nodes array for yielding immutable states
function cloneNodes(nodes: ListNode[]): ListNode[] {
  return nodes.map((n) => ({ ...n }));
}

function resetStatuses(nodes: ListNode[]): ListNode[] {
  return nodes.map(n => ({ ...n, status: "default" as NodeStatus }));
}

export const reverseList: LinkedListAlgorithmFn = function* (initialNodes, headId) {
  let nodes = cloneNodes(initialNodes);
  let prevId: string | null = null;
  let currId: string | null = headId;

  yield {
    nodes: cloneNodes(nodes),
    pointers: { prev: prevId, curr: currId } as Record<string, string | null>,
    description: "Initialize prev to null and curr to head.",
  };

  while (currId !== null) {
    const currIndex = nodes.findIndex((n) => n.id === currId);
    if (currIndex === -1) break; // Should not happen in a valid list

    nodes = resetStatuses(nodes);
    nodes[currIndex].status = "pointer1"; // curr
    
    if (prevId) {
      const prevIndex = nodes.findIndex((n) => n.id === prevId);
      if (prevIndex !== -1) nodes[prevIndex].status = "pointer2"; // prev
    }

    const nextId = nodes[currIndex].next;
    
    yield {
      nodes: cloneNodes(nodes),
      pointers: { prev: prevId, curr: currId, next: nextId } as Record<string, string | null>,
      description: `Store curr.next (${nextId || "null"}).`,
    };

    // Reverse the link
    nodes[currIndex].next = prevId;
    nodes[currIndex].status = "evaluating";

    yield {
      nodes: cloneNodes(nodes),
      pointers: { prev: prevId, curr: currId, next: nextId } as Record<string, string | null>,
      description: `Reverse link: curr.next = prev (${prevId || "null"}).`,
    };

    // Move pointers forward
    prevId = currId;
    currId = nextId;

    if (prevId) {
      const prevIndex = nodes.findIndex((n) => n.id === prevId);
      if (prevIndex !== -1) {
        nodes[prevIndex].status = "sorted"; // completed node
      }
    }

    yield {
      nodes: cloneNodes(nodes),
      pointers: { prev: prevId, curr: currId } as Record<string, string | null>,
      description: "Move prev to curr, and curr to next.",
    };
  }
  
  nodes = resetStatuses(nodes);
  nodes.forEach(n => n.status = "sorted");

  yield {
    nodes: cloneNodes(nodes),
    pointers: { newHead: prevId } as Record<string, string | null>,
    description: "List reversed successfully. newHead is prev.",
  };
};

export const detectCycle: LinkedListAlgorithmFn = function* (initialNodes, headId) {
  let nodes = cloneNodes(initialNodes);
  let slowId: string | null = headId;
  let fastId: string | null = headId;

  yield {
    nodes: cloneNodes(nodes),
    pointers: { slow: slowId, fast: fastId } as Record<string, string | null>,
    description: "Initialize slow and fast pointers to head.",
  };

  while (fastId !== null) {
    nodes = resetStatuses(nodes);
    
    let fastIndex = nodes.findIndex((n) => n.id === fastId);
    let slowIndex = nodes.findIndex((n) => n.id === slowId);
    
    if (slowIndex !== -1) nodes[slowIndex].status = "pointer1"; // slow
    if (fastIndex !== -1) {
      // If they are on the same node at the start, fast will overwrite slow color, which is fine
      nodes[fastIndex].status = nodes[fastIndex].status === "pointer1" ? "evaluating" : "pointer2";
    }

    yield {
      nodes: cloneNodes(nodes),
      pointers: { slow: slowId, fast: fastId } as Record<string, string | null>,
      description: "Check if slow equals fast...",
    };

    // We check cycle condition after they move, EXCEPT on first iteration they are the same.
    // So we move them first.
    let nextFast = fastIndex !== -1 ? nodes[fastIndex].next : null;
    let nextNextFast = null;
    
    if (nextFast) {
      const nextFastIndex = nodes.findIndex((n) => n.id === nextFast);
      if (nextFastIndex !== -1) nextNextFast = nodes[nextFastIndex].next;
    }
    
    fastId = nextNextFast;
    slowId = slowIndex !== -1 ? nodes[slowIndex].next : null;

    nodes = resetStatuses(nodes);
    fastIndex = nodes.findIndex((n) => n.id === fastId);
    slowIndex = nodes.findIndex((n) => n.id === slowId);
    
    if (slowIndex !== -1) nodes[slowIndex].status = "pointer1";
    if (fastIndex !== -1) nodes[fastIndex].status = "pointer2";

    yield {
      nodes: cloneNodes(nodes),
      pointers: { slow: slowId, fast: fastId } as Record<string, string | null>,
      description: "Move slow by 1 step, fast by 2 steps.",
    };

    if (slowId && slowId === fastId) {
      nodes = resetStatuses(nodes);
      if (slowIndex !== -1) nodes[slowIndex].status = "cycle";
      
      yield {
        nodes: cloneNodes(nodes),
        pointers: { slow: slowId, fast: fastId } as Record<string, string | null>,
        description: "Cycle detected! Slow and Fast meet.",
      };
      return;
    }
    
    // If fast reaches null or fast.next reaches null
    if (!nextFast || !fastId) {
       break;
    }
  }

  nodes = resetStatuses(nodes);
  yield {
    nodes: cloneNodes(nodes),
    pointers: { slow: slowId, fast: fastId } as Record<string, string | null>,
    description: "Fast reached null. No cycle detected.",
  };
};

export const findMiddle: LinkedListAlgorithmFn = function* (initialNodes, headId) {
  let nodes = cloneNodes(initialNodes);
  let slowId: string | null = headId;
  let fastId: string | null = headId;

  yield {
    nodes: cloneNodes(nodes),
    pointers: { slow: slowId, fast: fastId } as Record<string, string | null>,
    description: "Initialize slow and fast pointers to head.",
  };

  while (fastId !== null) {
    let fastIndex = nodes.findIndex((n) => n.id === fastId);
    let nextFast = fastIndex !== -1 ? nodes[fastIndex].next : null;
    
    if (!nextFast) break; // fast.next is null, reached end

    let nextNextFast = null;
    if (nextFast) {
      const nextFastIndex = nodes.findIndex((n) => n.id === nextFast);
      if (nextFastIndex !== -1) nextNextFast = nodes[nextFastIndex].next;
    }

    let slowIndex = nodes.findIndex((n) => n.id === slowId);
    
    slowId = slowIndex !== -1 ? nodes[slowIndex].next : null;
    fastId = nextNextFast;

    nodes = resetStatuses(nodes);
    fastIndex = nodes.findIndex((n) => n.id === fastId);
    slowIndex = nodes.findIndex((n) => n.id === slowId);
    
    if (slowIndex !== -1) nodes[slowIndex].status = "pointer1";
    if (fastIndex !== -1) nodes[fastIndex].status = "pointer2";

    yield {
      nodes: cloneNodes(nodes),
      pointers: { slow: slowId, fast: fastId } as Record<string, string | null>,
      description: "Move slow by 1, fast by 2.",
    };
  }

  nodes = resetStatuses(nodes);
  const slowIdx = nodes.findIndex(n => n.id === slowId);
  if (slowIdx !== -1) nodes[slowIdx].status = "sorted";

  yield {
    nodes: cloneNodes(nodes),
    pointers: { middle: slowId } as Record<string, string | null>,
    description: "Fast reached end. Slow is at the middle.",
  };
};

export const linkedListAlgorithms = {
  reverseList,
  detectCycle,
  findMiddle,
};
