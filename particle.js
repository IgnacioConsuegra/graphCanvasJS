export default class Particle {
  #ctx;
  constructor(
    positionX = 100, 
    positionY = 100,
    nodeSize = 50,
    parent = null,
    depth = 0,
    hue = 0,
    ctx, 
    ) {
    this.x = positionX;
    this.y = positionY;
    this.size = nodeSize;
    this.hue = this.hue;
    this.color = `hsl(${hue}, 100%, 50%)`;
    this.left = null;
    this.right = null;
    this.isFromLeftRoot = false;
    this.isFromRightRoot = false;
    this.parent = parent;
    this.depth = depth;
    this.#ctx = ctx;
  }
  update() {
    // this.x += this.speedX;
    // this.y += this.speedY;
    // if(this.size > 0.2) this.size -= 0.1;
  }
  draw() {
    this.#ctx.fillStyle = this.color;
    this.#ctx.beginPath();
    this.#ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.#ctx.fill();
  }
}