import { Node } from "./node.js";
import {NODE_WIDTH, NODE_HEIGHT, NODE_COLOR, NODE_VALUES, NODE_LUM} from './constants.js';
export class Graph{
  #ctx;
  constructor(width = 10, height = 10, ctx){
    this.width = width;
    this.height = height;
    this.#ctx = ctx;
    this.graph = [];
    this.items = new Map();
    this.startNode = null;
    this.endNode = null;

    this.mousePress = false;
    this.lastX = null;
    this.lastY = null;
    this.lastNodeValue = null;
  }
  createGraph(){  
    for(let height = 0; height < this.height; height++){
      const row = []
      for(let width = 0; width < this.width; width++){
        const current = new Node(
        (width * (NODE_WIDTH + 1)),
        (height * (NODE_HEIGHT + 1)),
        NODE_WIDTH,
        NODE_HEIGHT,
        `${height}${width}`,
        NODE_COLOR,
        this.#ctx,
        )
        this.items.set(`${height}${width}`, current);
        this.empty(height, width);
        row.push(current);
      }
      this.graph.push(row);
    }
    this.bindNodes();
    console.log(this.graph);
  }
  bindNodes() {
    for (let i = 0; i < this.graph.length; i++) {
      for (let j = 0; j < this.graph[i].length; j++) {
        this.graph[i][j]["left"] = j > 0 ? this.graph[i][j - 1] : null;
        this.graph[i][j]["right"] =
          j < this.graph[i].length - 1 ? this.graph[i][j + 1] : null;
        this.graph[i][j]["top"] = i > 0 ? this.graph[i - 1][j] : null;
        this.graph[i][j]["bottom"] =
          i < this.graph.length - 1 ? this.graph[i + 1][j] : null;
        this.graph[i][j]["topLeft"] =
          i > 0 && j > 0 ? this.graph[i - 1][j - 1] : null;
        this.graph[i][j]["topRight"] =
          i > 0 && j < this.graph[i].length - 1
            ? this.graph[i - 1][j + 1]
            : null;
        this.graph[i][j]["bottomLeft"] =
          i < this.graph.length - 1 && j > 0 ? this.graph[i + 1][j - 1] : null;
        this.graph[i][j]["bottomRight"] =
          i < this.graph.length - 1 && j < this.graph[i].length - 1
            ? this.graph[i + 1][j + 1]
            : null;
        this.graph[i][j]["neighbors"] = [this.getNeighbors(this.graph[i][j])];
      }
    }
  }
  getNeighbors(node) {
    const {x, y, width, height, value, nodeId, color, lum, ctx, fontSize, parent, neighbors, f, g, previous, ...rest} = node;
    const filteredNeighbors = {};
    for (const key in rest) {
      if (rest[key] !== null) {
        filteredNeighbors[key] = rest[key];
      }
    }
    console.log("Filtered neighbors : ", filteredNeighbors)
    return filteredNeighbors;
  }

  drawGraph() {
    for(let height = 0; height <= this.graph.length - 1; height++){
      for(let width = 0; width <= this.graph[height].length - 1; width++){
        const current = this.graph[height][width];
        current.draw();
      }
    }
  }
  
  init(y, x){
    const item = this.items.get(`${y}${x}`);
    item.lum = NODE_LUM;
    item.value = NODE_VALUES.INIT;
    item.color = NODE_COLOR.INIT;
    this.startNode = item;
    item.draw();
  }
  end(y, x){
    const item = this.items.get(`${y}${x}`);
    item.color = NODE_COLOR.END;
    item.lum = NODE_LUM;
    item.value = NODE_VALUES.END;
    this.endNode = item;
    item.draw();
  }
  empty(y, x){
    const item = this.items.get(`${y}${x}`);
    item.lum = 100;
    item.color = NODE_COLOR.EMPTY;
    item.value = NODE_VALUES.EMPTY;
    item.draw();
  }
  wall(y, x) {
    const item = this.items.get(`${y}${x}`);
    item.lum = 0;
    item.color = NODE_COLOR.WALL;
    item.value = NODE_VALUES.WALL;
    item.draw();
  }
  searching(y, x){
    const item = this.items.get(`${y}${x}`);
    item.color = NODE_COLOR.SEARCHING;
    item.lum = NODE_LUM;
    item.value = NODE_VALUES.SEARCHING;
    item.draw();
  }
  searched(y, x){
    const item = this.items.get(`${y}${x}`);
    item.lum = NODE_LUM;
    item.color = NODE_COLOR.SEARCHED;
    item.value = NODE_VALUES.SEARCHED;
    item.draw();
  }
  path(y, x) {
    const item = this.items.get(`${y}${x}`);
    item.color = NODE_COLOR.PATH;
    item.lum = NODE_LUM;
    item.value = NODE_VALUES.PATH;
    item.draw();
  }
  handleClick(y, x){
    const item = this.items.get(`${y}${x}`);
    if(item.value === NODE_VALUES.WALL) {
      this.empty(y, x);
      return;
    }
    if(item.value === NODE_VALUES.EMPTY) {
      this.wall(y, x);
      return;
    }
  }
  handleMouseOver(y, x) {
    if(this.mousePress){
      if(y !== this.lastY || x !== this.lastX){
        const item = this.items.get(`${y}${x}`);
        this.lastY  = y;
        this.lastX = x;
        if(item === undefined){
          return;
        }
        if(this.lastNodeValue === null) {
          this.lastNodeValue = item.value;
        }
        if(this.lastNodeValue === item.value){
          this.lastNodeValue = item.value
          if(item.value === NODE_VALUES.WALL) {
            this.empty(y, x);
            return;
          }
          if(item.value === NODE_VALUES.EMPTY) {
            this.wall(y, x);
            return;
          }
        }
      }
    }
  }
  handleMouseDown(y, x) {
    const item = this.items.get(`${y}${x}`);
    this.lastY  = y;
    this.lastX = x;
    if(item === undefined){
      return;
    }
    this.lastNodeValue = item.value;
    this.mousePress = true;

    if(item.value === NODE_VALUES.WALL) {
      this.empty(y, x);
      return;
    }
    if(item.value === NODE_VALUES.EMPTY) {
      this.wall(y, x);
      return;
    }

  }
  handleMouseUp(y, x){
    const item = this.items.get(`${y}${x}`);
    this.lastY  = y;
    this.lastX = x;
    if(item === undefined){
      return;
    }
    this.lastNodeValue = null;
    this.mousePress = false;
  }
  
  async breathFirst(){
    const queue = [];
    const visited = new Set();

    if (this.startNode && this.endNode) {
      queue.push(this.startNode);
      let counter = 0;
      while (queue.length > 0 && counter < 100){
        let currentNode = queue.shift();
        let neighbors = this.getNeighbors(currentNode);
        for (let neighbor in neighbors) {
          let myNeighbor = neighbors[neighbor];
          if (myNeighbor === this.endNode) {
            return;
          }
          if (myNeighbor["value"] === NODE_VALUES.WALL) {
            continue;
          }
          if (myNeighbor === this.startNode) {
            continue;
          }
          if (!visited.has(myNeighbor)) {
            if (myNeighbor["value"] !== NODE_VALUES.WALL) {
              this.searching(Math.floor(myNeighbor.y / NODE_HEIGHT), Math.floor(myNeighbor.x / NODE_WIDTH));
              await new Promise((resolve) =>
                setTimeout(() => {
                  this.searched(Math.floor(myNeighbor.y / NODE_HEIGHT), Math.floor(myNeighbor.x / NODE_WIDTH));
                  resolve();
                }, 100)
              );
            }
            queue.push(myNeighbor);
            visited.add(myNeighbor);
          }
        }
        counter++;
      }
    }
  }
  
  async aStarSearch() {
    const openSet = [];
    const closedSet = [];
  
    openSet.push(this.startNode);
    while (openSet.length > 0) {
      let winner = 0;
      for (let i = 0; i < openSet.length; i++) {
        if (openSet[i].f < openSet[winner].f) {
          winner = i;
        }
      }
  
      const current = openSet[winner];
      if (current === this.endNode) {
        const path = [];
        let temp = current;
        while (temp) {
          path.push(temp);
          temp = temp.previous;
        }
        console.log(path);
        path.map((element) => {
          if (element["value"] === NODE_VALUES.INIT || element["value"] === NODE_VALUES.END) {
            return [];
          }
          this.path(Math.floor(element.y / NODE_HEIGHT), Math.floor(element.x / NODE_WIDTH));
        });
        return path;
      }
  
      removeFromArray(openSet, current);
      closedSet.push(current);
  
      const neighbors = current.neighbors[0];
      for (let neigh in neighbors) {
        const neighbor = neighbors[neigh];
        if (neighbor["value"] === NODE_VALUES.WALL) {
          continue;
        }
        if (!closedSet.includes(neighbor)) {
          const tempG = current.g + 1;
          let newPath = false;
          if (openSet.includes(neighbor)) {
            if (tempG < neighbor.g) {
              neighbor.g = tempG;
              newPath = true;
            }
          } else {
            neighbor.g = tempG;
            newPath = true;
            openSet.push(neighbor);
            if (neighbor["value"] !== NODE_VALUES.WALL && neighbor["value"] !== NODE_VALUES.END) 
            {
              this.searching(Math.floor(neighbor.y / NODE_HEIGHT), Math.floor(neighbor.x / NODE_WIDTH));
              await new Promise((resolve) =>
                setTimeout(() => {
                  this.searched(Math.floor(neighbor.y / NODE_HEIGHT), Math.floor(neighbor.x / NODE_WIDTH));
                  resolve();
                }, 100)
              );
            }
          }
          if (newPath) {
            neighbor.h = heuristic(neighbor, this.endNode);
            neighbor.f = neighbor.g + neighbor.h;
            neighbor.previous = current;
          }
        }
      }
    }
    function heuristic(a, b) {
      return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }
    function removeFromArray(arr, elt) 
    {
      for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] === elt) {
          arr.splice(i, 1);
        }
      }
    }
    return [];
  }
}