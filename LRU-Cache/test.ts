import { DoublyLinkedList } from "./DoublyLinkedList";
import { LRUCache } from "./LRUCache";

const cache = new LRUCache<number, string>(5);
cache.put(1, "one");
cache.put(2, "two");
cache.put(3, "three");
cache.put(4, "four");
cache.put(5, "five");


cache.put(6, "six");
cache.put(7, "seven");
console.log(cache.get(1)); 