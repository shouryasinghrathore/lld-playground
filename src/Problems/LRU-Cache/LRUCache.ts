import { DoublyLinkedList } from "./DoublyLinkedList";
import { Node } from "./node";

export class LRUCache<K, V> {
    private capacity: number;
    private map = new Map<K, Node<K, V>>();
    private dll = new DoublyLinkedList<K, V>()
    constructor(capacity: number) {
        if (capacity <= 0) throw new Error("Capacity must be > 0");
        this.capacity = capacity
    }

    get(key: K): V | null {
        const node = this.map.get(key);
        if (!node) return null;
        this.dll.moveToHead(node);
        return node.value;
    }

    put(key: K, value: V): void {
        const existing = this.map.get(key);

        if (existing) {
            existing.value = value;
            this.dll.moveToHead(existing);
            return;
        }
          const newNode = new Node<K, V>(key, value);
          this.dll.addToHead(newNode);
          this.map.set(key , newNode);

          if(this.map.size>this.capacity){
            const removed = this.dll.removeTail();
            if(removed) this.map.delete(removed.key);
          }
    }
}