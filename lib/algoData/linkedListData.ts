import { AlgorithmDetailsData } from "./types";

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
      javascript: `class Node {
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
}`
    },
    examples: [
      {
        title: "Browser History (Simple)",
        description: "Storing a sequence of visited URLs where you only need to go back sequentially.",
        code: `historyList.append("google.com");\nhistoryList.append("github.com");`
      }
    ]
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
      javascript: `class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}`
    },
    examples: [
      {
        title: "Music Player Queue",
        description: "Navigating tracks in both directions.",
        code: `currentTrack = currentTrack.prev; // Go back\ncurrentTrack = currentTrack.next; // Skip`
      }
    ]
  },
  reverse: {
    id: "reverse",
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
      "Iterate through the list while 'current' is not null.",
      "Store the next node: next = current.next",
      "Reverse the link: current.next = prev",
      "Move the 'prev' pointer forward: prev = current",
      "Move the 'current' pointer forward: current = next",
      "Once the loop ends, update the head to the 'prev' pointer."
    ],
    codeSnippets: {
      javascript: `function reverseList(head) {
  let prev = null;
  let current = head;
  
  while (current !== null) {
    let nextNode = current.next;
    current.next = prev;
    prev = current;
    current = nextNode;
  }
  return prev;
}`
    },
    examples: []
  },
  cycle: {
    id: "cycle",
    name: "Floyd's Cycle Detection",
    description: "Floyd's Cycle-Finding Algorithm (also known as the 'Tortoise and the Hare' algorithm) uses two pointers moving at different speeds to detect if a linked list contains a loop (cycle).",
    bestCase: "O(1) - Cycle detected immediately",
    avgCase: "O(n)",
    worstCase: "O(n)",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    useCase: "Detecting infinite loops in memory references, validating cyclic graphs, or detecting deadlocks in operating systems.",
    algorithmFlow: [
      "Initialize two pointers, 'slow' and 'fast', both pointing to the head of the list.",
      "Move 'slow' one step at a time (slow = slow.next).",
      "Move 'fast' two steps at a time (fast = fast.next.next).",
      "If there is a cycle, the 'fast' pointer will eventually lap the 'slow' pointer and they will meet.",
      "If 'fast' reaches the end of the list (null), then there is no cycle."
    ],
    codeSnippets: {
      javascript: `function hasCycle(head) {
  let slow = head;
  let fast = head;
  
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
    
    if (slow === fast) return true;
  }
  return false;
}`
    },
    examples: []
  }
};
