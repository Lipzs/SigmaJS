class Queue {
  constructor() {
    this.elements = [];
  };

  enqueue(e) {
    this.elements.push(e);
  };

  dequeue() {
    return this.elements.shift();
  };

  isEmpty () {
    return this.elements.length == 0;
  };

  length() {
    return this.elements.length;
  };
}

export default Queue;