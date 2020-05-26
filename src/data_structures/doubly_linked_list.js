class DLLNode {
  constructor({ element = undefined, next = this, prev = this, isSentinel = false }) {
    this.element = element;
    this.next = next;
    this.prev = prev;
    this._active = !isSentinel;
  }

  remove() {
    if (this._active) {
      this.prev.next = this.next;
      this.next.prev = this.prev;
      this._active = false;
      return this.element;
    }
  }
}

class DoublyLinkedList {
  constructor(Node = DLLNode) {
    this.Node = Node;
    this._sentinel = new this.Node({ isSentinel: true });
  }

  _head() {
    return this._sentinel.next;
  }

  _tail() {
    return this._sentinel.prev;
  }

  insertHead(element) {
    const newHead = new this.Node({ 
      element: element, prev: this._sentinel, next: this._head 
    })
    this._head.prev = newHead;
    this._sentinel.next = newHead;
    if (this._sentinel.prev === this._sentinel) {
      this._sentinel.prev = newHead;
    }
  }

  insertTail(element) {
    const newTail = new this.Node({
      element: element, prev: this._tail, next: this._sentinel
    })
    this._tail.next = newTail;
    this._sentinel.prev = newTail;
    if (this._sentinel.next === this._sentinel) {
      this._sentinel.next = newTail;
    }
  }

  removeHead() {
    return this._head.remove();
  }

  removeTail() {
    return this._tail.remove();
  }

  remove(node) {
    return node.remove();
  }

  forEach(callback) {
    let currentNode = this._head;
    while (currentNode._active) {
      callback(currentNode.element)
      currentNode = currentNode.next
    }
  }

  count() {
    let currentNode = this._head;
    let elementCounter = 0;
    while (currentNode._active) {
      elementCounter += 1;
      currentNode = currentNode.next
    }
    return elementCounter;
  }
}

export default DoublyLinkedList;