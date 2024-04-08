import { NODE_COLOR, NODE_HEIGHT, NODE_LUM, NODE_VALUES, NODE_WIDTH } from "./constants.js";

export class Node{
  #ctx;
  constructor(
    x = 0,
    y = 0,
    width = NODE_WIDTH,
    height = NODE_HEIGHT,
    value = NODE_VALUES.EMPTY,
    color,
    ctx,
  ){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.value = value;
    this.nodeId = value;
    this.color = NODE_COLOR.EMPTY;
    this.lum = NODE_LUM;
    this.#ctx = ctx;
    this.fontSize = 20;
    this.left = null;
    this.right = null;
    this.top = null;
    this.bottom = null;
    this.topLeft = null;
    this.topRight = null;
    this.bottomLeft = null;
    this.bottomRight = null;
    this.neighbors = null;
    this.parent = null;
    this.f = 0;
    this.g = 0;
    this.previous = null;
  }
  draw(){
    this.#ctx.fillStyle = `hsl(${this.color}, 100%, ${this.lum}%)`; 
    this.#ctx.fillRect(this.x, this.y, this.width, this.height);
    this.#ctx.font = `${this.fontSize}px Arial`; 

    this.#ctx.fillStyle = 'darkblue';
    this.#ctx.fillText(`${this.nodeId}`,
    this.x + (this.width / 2) - (this.fontSize / 2),
    this.y + (this.height / 2) + (this.fontSize / 2)
    );
    this.#ctx.strokeStyle = 'black'; 
    this.#ctx.lineWidth = 2; 
    this.#ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}