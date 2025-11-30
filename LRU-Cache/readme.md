👉 Design & Implement an LRU Cache (TypeScript)

You must design a generic LRUCache<K, V> with:

Requirements

Constructor: constructor(capacity: number)

Methods:

get(key: K): V | null

put(key: K, value: V): void

Time complexity: O(1) for both get and put

You must use a combination of HashMap + Doubly Linked List

When capacity exceeds, evict least recently used entry
