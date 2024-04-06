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
}