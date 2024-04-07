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
    number = 0,
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
    this.#ctx.font = '20px Arial';
    this.number = number;
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
    this.#ctx.fillStyle = 'white';
    this.#ctx.fillText(`${this.number}`, 
    this.x - (this.size / 2) - 2,
    this.y + ((this.size / 2)));
  }
}