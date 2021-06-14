class Stack {
  constructor() {
    this.stack = [];
    this.top = 0;
  }

  add(element) {
    this.stack[this.top] = element;
    this.top += 1;
  }

    length() {
      return this.top;
    }

    remove() {
      return this.stack[this.top - 1];
    }

    isEmpty() {
      return this.top === 0;
    }

    pop() {
      if (!this.isEmpty()) {
        this.top = this.top - 1;
        return this.stack.pop();
      }
    }
}

export default Stack;