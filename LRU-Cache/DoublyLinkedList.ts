import { Node } from "./node";

export class DoublyLinkedList<K, V> {
    head: Node<K, V> | null = null;
    tail: Node<K, V> | null = null;

    addToHead(node: Node<K, V>): void {
        node.prev = null;
        node.next = this.head;

        if (this.head) {
            this.head.prev = node;
        }

        this.head = node

        if (!this.tail) {
            this.tail = node;
        }
    }

    removeNode(node:Node<K,V>):void{
        const prev = node.prev;
        const next = node.next;

        if(prev) prev.next = next;
        else this.head = next;

        if(next) next.prev = prev;
        else this.tail = prev;
    }

    moveToHead(node :Node<K,V>){
        if(this.head==node) return ;
        this.removeNode(node);
        this.addToHead(node);

    }
    removeTail(): Node<K,V>| null{
        if(!this.tail) return null;
        const removed = this.tail;
        this.removeNode(removed);
        return removed;
    } 

}
