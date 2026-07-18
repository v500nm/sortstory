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
}`,
      python: `class Node:
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
        curr.next = new_node`,
      java: `class Node {
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
}`,
      cpp: `struct Node {
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
};`,
      c: `struct Node {
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
}`
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
      javascript: `class Node {
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
}`,
      python: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None
        self.prev = None`,
      java: `class Node {
    int data;
    Node next, prev;
    Node(int data) { this.data = data; }
}`,
      cpp: `struct Node {
    int data;
    Node* next;
    Node* prev;
    Node(int val) : data(val), next(nullptr), prev(nullptr) {}
};`,
      c: `struct Node {
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
}`
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
      javascript: `function reverse(head) {
  let prev = null;
  let current = head;
  while (current) {
    let next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}`,
      python: `def reverse(head):
    prev = None
    curr = head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev`,
      java: `Node reverse(Node head) {
    Node prev = null;
    Node curr = head;
    while (curr != null) {
        Node next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`,
      cpp: `Node* reverse(Node* head) {
    Node* prev = nullptr;
    Node* curr = head;
    while (curr) {
        Node* next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`,
      c: `struct Node* reverse(struct Node* head) {
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
}`
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
      javascript: `function hasCycle(head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}`,
      python: `def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False`,
      java: `boolean hasCycle(Node head) {
    Node slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) return true;
    }
    return false;
}`,
      cpp: `bool hasCycle(Node* head) {
    Node* slow = head;
    Node* fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}`,
      c: `int detectLoop(struct Node* head) {
    struct Node *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return 1;
    }
    return 0;
}`
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
      javascript: `function getMiddle(head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}`,
      python: `def get_middle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow`,
      java: `Node getMiddle(Node head) {
    Node slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
}`,
      cpp: `Node* getMiddle(Node* head) {
    Node* slow = head;
    Node* fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow;
}`,
      c: `struct Node* getMiddle(struct Node* head) {
    struct Node* slow = head;
    struct Node* fast = head;
    while (fast != NULL && fast->next != NULL) {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow;
}`
    },
    examples: []
  }
};
