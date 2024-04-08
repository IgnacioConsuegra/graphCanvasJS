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
    console.log(this.graph)
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
    item.draw();
  }
  end(y, x){
    const item = this.items.get(`${y}${x}`);
    item.color = NODE_COLOR.END;
    item.lum = NODE_LUM;
    item.value = NODE_VALUES.END;
    item.draw();
  }
  empty(y, x){
    console.log("Empty here : ");
    const item = this.items.get(`${y}${x}`);
    item.lum = 100;
    item.color = NODE_COLOR.EMPTY;
    item.value = NODE_VALUES.EMPTY;
    console.log(item);
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
    console.log(item.value);
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
    if(y !== this.lastY || x !== this.lastX){
      const item = this.items.get(`${y}${x}`);
      this.lastY  = y;
      this.lastX = x;
      if(item === undefined){
        console.log("Item undefined.")
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