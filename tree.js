export default class Tree{
  constructor(){
    this.root = null;
    this.length = 0;
    this.items = new Map();
    //This items queue i'll using it to add nodes, that all.
    this.itemsQueue = [];
    // this.rightestLeftRoot = -Infinity;
    // this.leftestRightRoot = +Infinity;
  }
  add(node) {
    const root = this.root;
    if(root !== null) {
      const nodeToPush = this.itemsQueue[0];
      if(nodeToPush.left === null) {
        nodeToPush.left = node;
        this.items.set(`${this.length}${node.size}`, node);
        this.itemsQueue.push(node);
        this.length++;
        // this.proveRightOrLeftest(node)
        return;
      }
      if(nodeToPush.right === null) {
        nodeToPush.right = node;
        this.items.set(`${this.length}${node.size}`, node);
        this.itemsQueue.push(node);
        this.itemsQueue.shift();
        // this.proveRightOrLeftest(node)
        this.length++;
      }
    } else {
      this.root = node;
      this.items.set(`${this.length}${node.size}`, node);
      this.itemsQueue.push(node);
      this.length++;
    }
  }
  delete(node) {
    const toDelete = this.items.get(node);
    if(toDelete) {
      return node;
    }
  }
  async breadthFirst() {
    const root = this.root;
    const itemsQueue = [];

    //This below is used to display in our html.
    const children = [];
    const toVisit = [];

    if(root == null) {
      return;
    }
    if(root !== null) {
      itemsQueue.push(root);
      children.push(root.number);
      toVisit.push(root.number);

      this.writeChildren(children.join(', '));
      this.writeToVisit(toVisit.join(', '));
      
      while(itemsQueue.length) {
        if(itemsQueue[0].left) {

          itemsQueue.push(itemsQueue[0].left);

          children.push(itemsQueue[0].left.number);
          toVisit.push(itemsQueue[0].left.number);

          this.writeChildren(children.join(', '));
          this.writeToVisit(toVisit.join(', '));
        }
        if(itemsQueue[0].right) {
          itemsQueue.push(itemsQueue[0].right);

          children.push(itemsQueue[0].right.number);
          toVisit.push(itemsQueue[0].right.number);

          this.writeChildren(children.join(', '));
          this.writeToVisit(toVisit.join(', '));
        }

        this.writeChildren(children.join(', '));
        this.writeToVisit(toVisit.join(', '));
        itemsQueue[0].check();
        await new Promise((resolve, reject) => {
          return setTimeout(() => {
            resolve(null);
          }, 1 * 1000);
        })
        itemsQueue[0].visited();
        itemsQueue.shift();
        toVisit.shift();
        this.writeToVisit(toVisit.join(', '));
      }
    }
  }
  async depthFirst() {
    const root = this.root;
    const stack = [];
    const result = [];

    //This below is used to display in our html.
    const children = [];
    const toVisit = [];

    if(root == null) {
      return;
    }
    stack.push(root);
    toVisit.push(root.number);
    this.writeToVisit(toVisit.join(', '));

    
    while(stack.length > 0) {
        const current = stack.pop();
        toVisit.pop();
        current.check();

        if(current.left) {
          stack.push(current.left);
          toVisit.push(current.left.number);
        }

        if(current.right) {
          stack.push(current.right);
          toVisit.push(current.right.number);
        }
        this.writeToVisit(toVisit.join(', '));
        await new Promise((resolve, reject) => {
          return setTimeout(() => {
            resolve(null);
          }, 1 * 1000);
        })
        current.visited();
        children.push(current.number);
        this.writeChildren(children.join(', '), "Visited : ")

    }
  }
  writeToVisit(text) {
    const currentQueue = document.getElementById("currentQueue");
    if (currentQueue) {
      currentQueue.innerHTML = "To visit : " + text;
    }else {
      const div = document.createElement("div");
      div.id = "currentQueue";
      div.className = "queue";
      div.innerHTML = "To visit : " +  text;
      document.body.appendChild(div);
    }
  }
  writeChildren(text, text2 = "Children : ") {
    var queueElement = document.getElementById("queue");
    if (queueElement) {
      queueElement.innerHTML = `${text2}` + text;
    }else {
      var div = document.createElement("div");
      div.id = "queue";
      div.className = "queue";
      div.innerHTML = `${text2}` + text;
      document.body.appendChild(div);
    }
  }

}