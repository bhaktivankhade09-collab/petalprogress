// Rich, production-ready demo dataset for Petal Progress frontend-only showcase
// All data runs locally with JavaScript state & localStorage persistence.

export const DEFAULT_DEMO_USER = {
  id: 'demo-user-elena',
  email: 'elena.rostova@petalprogress.demo',
  user_metadata: {
    full_name: 'Elena Rostova',
  },
};

export const DEFAULT_DEMO_PROFILE = {
  id: 'demo-user-elena',
  email: 'elena.rostova@petalprogress.demo',
  full_name: 'Elena Rostova',
  avatar_url: '',
  daily_problem_target: 3,
  focus_goal_hours: 4,
  soundscape: 'Gentle Rain & Soft Piano ♫',
};

// 48 curated completed DSA problem IDs (31/45 Foundation, 14/62 Core, 3/50 Advanced)
export const INITIAL_COMPLETED_PROBLEMS = {
  // Foundation (Level 1) - 31 solved
  'p-1': true,   // Two Sum
  'p-2': true,   // Remove Duplicates from Sorted Array
  'p-3': true,   // Move Zeroes
  'p-4': true,   // Contains Duplicate
  'p-5': true,   // Maximum Subarray
  'p-6': true,   // Best Time to Buy and Sell Stock
  'p-7': true,   // Product of Array Except Self
  'p-8': true,   // Sort Colors
  'p-9': true,   // Valid Anagram
  'p-10': true,  // Valid Palindrome
  'p-11': true,  // Ransom Note
  'p-12': true,  // Length of Last Word
  'p-13': true,  // Group Anagrams
  'p-14': true,  // Longest Consecutive Sequence
  'p-15': true,  // Two Sum II - Input Array Is Sorted
  'p-16': true,  // 3Sum
  'p-17': true,  // Container With Most Water
  'p-18': true,  // Longest Substring Without Repeating Characters
  'p-19': true,  // Maximum Average Subarray I
  'p-21': true,  // Valid Parentheses
  'p-22': true,  // Daily Temperatures
  'p-24': true,  // Number of Recent Calls
  'p-25': true,  // Binary Search
  'p-26': true,  // Find First and Last Position
  'p-27': true,  // Search in Rotated Sorted Array
  'p-28': true,  // Reverse Linked List
  'p-29': true,  // Merge Two Sorted Lists
  'p-30': true,  // Linked List Cycle
  'p-34': true,  // Maximum Depth of Binary Tree
  'p-35': true,  // Invert Binary Tree
  'p-36': true,  // Diameter of Binary Tree

  // Core Interview (Level 2) - 14 solved
  'p-46': true,  // Subarray Sum Equals K
  'p-47': true,  // Trapping Rain Water
  'p-50': true,  // Minimum Window Substring
  'p-53': true,  // Largest Rectangle in Histogram
  'p-55': true,  // Search a 2D Matrix
  'p-57': true,  // Koko Eating Bananas
  'p-61': true,  // Reorder List
  'p-62': true,  // Merge k Sorted Lists
  'p-66': true,  // Lowest Common Ancestor of a Binary Search Tree
  'p-67': true,  // Binary Tree Level Order Traversal
  'p-74': true,  // Number of Islands
  'p-75': true,  // Clone Graph
  'p-84': true,  // Climbing Stairs
  'p-85': true,  // House Robber

  // Advanced Patterns (Level 3) - 3 solved
  'p-108': true, // Median of Two Sorted Arrays
  'p-117': true, // LRU Cache
  'p-126': true, // Word Ladder
};

export const INITIAL_PROBLEM_NOTES = {
  'p-1': 'Used a single-pass Hash Map storing (target - num[i]) -> index. O(N) time and O(N) space. Beautiful baseline.',
  'p-5': "Classic Kadane's algorithm. Maintain max_so_far and current_max. Reset current_max to 0 if it drops below zero.",
  'p-16': 'Sorted array first. Fixed one pointer i, then applied two-pointer technique on the rest with careful duplicate skipping.',
  'p-28': 'Three pointers: prev (null), curr (head), and next. Iterate and reverse curr.next = prev. Return prev as new head.',
  'p-117': 'Hash map paired with Doubly Linked List. Map stores key -> Node, DLL gives O(1) removals and promotions to head.',
};

export const INITIAL_TASKS = [
  {
    id: 't-1',
    title: 'Review Dynamic Programming Tabulation & State Transitions',
    priority: 'High',
    duration: '45 mins',
    category: 'DSA Practice',
    completed: false,
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 't-2',
    title: 'Implement Trie (Prefix Tree) and solve Word Search II',
    priority: 'High',
    duration: '1 hour',
    category: 'Placement Track',
    completed: false,
    created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: 't-3',
    title: 'Master Monotonic Stack pattern for Daily Temperatures',
    priority: 'Medium',
    duration: '30 mins',
    category: 'Core Patterns',
    completed: true,
    completed_at: new Date(Date.now() - 3600000 * 8).toISOString(),
    created_at: new Date(Date.now() - 3600000 * 10).toISOString(),
  },
  {
    id: 't-4',
    title: 'Complete 45-min Deep Focus session on Binary Search boundaries',
    priority: 'Medium',
    duration: '45 mins',
    category: 'Focus Room',
    completed: true,
    completed_at: new Date(Date.now() - 3600000 * 12).toISOString(),
    created_at: new Date(Date.now() - 3600000 * 14).toISOString(),
  },
  {
    id: 't-5',
    title: 'Reflect on time & space trade-offs in Graph BFS vs DFS',
    priority: 'Low',
    duration: '15 mins',
    category: 'Reflection',
    completed: false,
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
];

export const INITIAL_FOCUS_STATS = {
  accumulatedMinutes: 255, // 4 hours 15 mins
  completedCycles: 5,
  goalHours: 4,
  logs: [
    {
      id: 'f-1',
      title: 'Dynamic Programming & Memoization',
      time: '11:30 AM',
      duration: '1h 15m',
      color: 'primary',
      created_at: new Date(Date.now() - 3600000 * 3).toISOString(),
    },
    {
      id: 'f-2',
      title: 'Sliding Window & Two Pointers',
      time: '2:15 PM',
      duration: '45m',
      color: 'secondary',
      created_at: new Date(Date.now() - 3600000 * 6).toISOString(),
    },
    {
      id: 'f-3',
      title: 'Binary Tree Inversions & Diameter',
      time: '4:40 PM',
      duration: '1h 00m',
      color: 'tertiary',
      created_at: new Date(Date.now() - 3600000 * 9).toISOString(),
    },
    {
      id: 'f-4',
      title: 'Greedy Intervals & Sort Colors',
      time: 'Yesterday',
      duration: '1h 15m',
      color: 'primary',
      created_at: new Date(Date.now() - 3600000 * 28).toISOString(),
    },
  ],
};

export const INITIAL_PLANTED_PETALS = [
  {
    id: 'p-1',
    text: '“Solved LRU Cache cleanly without looking at hints! Double linked list + hash map intuition finally clicked.”',
    createdAt: 'Today',
    flower: 'Cherry Blossom',
    tag: 'Breakthrough',
  },
  {
    id: 'p-2',
    text: '“Maintained calm pacing through 5 Sliding Window problems. Consistency over rush; quality over volume.”',
    createdAt: 'Yesterday',
    flower: 'Pink Lotus',
    tag: 'Mindset',
  },
  {
    id: 'p-3',
    text: '“Understood monotonic stack for Daily Temperatures. The visual mental model makes total sense now.”',
    createdAt: '2 days ago',
    flower: 'Blush Rose',
    tag: 'Algorithmic Wisdom',
  },
  {
    id: 'p-4',
    text: '“Small steps every single morning turn into huge algorithmic confidence. Rooted in discipline, blooming with grace.”',
    createdAt: '3 days ago',
    flower: 'Jasmine Bud',
    tag: 'Daily Resolve',
  },
];

export const INITIAL_QUOTE_FAVORITES = {
  'quote-featured': true,
  'quote-2': true,
  'quote-5': true,
};
