const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];
let hue = 0;
const mouse = {
  x : undefined,
  y : undefined
}
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
canvas.addEventListener('click', (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
  for(let i = 0; i < 10; i++) {
    particlesArray.push(new Particle());
  }
});
canvas.addEventListener('mousemove', (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
  for(let i = 0; i < 10; i++) {
    particlesArray.push(new Particle());
  }

});

class Particle {
  constructor(positionX = 100, 
    positionY = 100,
    nodeSize = 50,
    ) {
    this.x = positionX;
    this.y = positionY;
    this.size = nodeSize;
    this.color = `hsl(${hue}, 100%, 50%)`;
    this.left = null;
    this.right = null;
  }
  update() {
    // this.x += this.speedX;
    // this.y += this.speedY;
    // if(this.size > 0.2) this.size -= 0.1;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}
class Tree{
  constructor(){
    this.root = null;
    this.length = 0;
    this.items = new Map();
    //This items queue i'll using it to add nodes, that all.
    this.itemsQueue = [];
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
        return;
      }
      if(nodeToPush.right === null) {
        nodeToPush.right = node;
        this.items.set(`${this.length}${node.size}`, node);
        this.itemsQueue.push(node);
        this.itemsQueue.shift();
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
  breathFirst(){
    return;
  }
}
const myTree = new Tree();

function init() {
  const middleX = canvas.width / 2;
  const middleY = canvas.height;
  const NODES_SIZE = 10;
  const NODES_WIDTH_DISTANCE = 50;
  const NODES_HEIGHT_DISTANCE = 100;
  for(let i = 0; i <= 6; i++ ) {
    if(i === 0) {
      const particle = new Particle(middleX + 0, 100, NODES_SIZE);
      particlesArray.push(particle)
      myTree.add(particle);
      continue;
    }
    if(i % 2 === 0) {
      console.log("Modulo 2", i)
      const lastNode = myTree.itemsQueue[0];
      const right = new Particle(
        lastNode.x + NODES_WIDTH_DISTANCE, 
        lastNode.y + NODES_HEIGHT_DISTANCE,
        NODES_SIZE
        );
      particlesArray.push(right)
      myTree.add(right);
    } else { 
      const lastNode = myTree.itemsQueue[0];
      const left = new Particle(
        lastNode.x - NODES_WIDTH_DISTANCE, 
        lastNode.y + NODES_HEIGHT_DISTANCE,
        NODES_SIZE
        );
      particlesArray.push(left)
      myTree.add(left);
    }
  }
  console.log(myTree)
}
function handleParticles() {
  for(let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].draw();
    for( let j = i; j < particlesArray.length; j++) {
      const dx = particlesArray[i].x - particlesArray[j].x;
      const dy = particlesArray[i].y - particlesArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      ctx.beginPath();
      ctx.strokeStyle = particlesArray[i].color;
      ctx.lineWidth = 1;
      ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
      ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
      ctx.stroke();
      ctx.closePath();
    }
  }
}
function animate() {
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  // handleParticles();
  // ctx.fillStyle = `rgba(0, 0, 0, 0.02)`;
  // ctx.fillRect(0, 0, canvas.width, canvas.height);
  // handleParticles();
  // hue += 2;
  // ctx.fillStyle = 'white';
  // ctx.beginPath();
  // ctx.arc(100, 100, 50, 0, Math.PI * 2);
  // ctx.fill();

 
  // ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
  // ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
  // ctx.stroke();
  // ctx.closePath();


  // ctx.fillStyle = 'white';
  // ctx.beginPath();
  ctx.arc(300, 100, 50, 0, Math.PI * 2);
  ctx.fill();
  requestAnimationFrame(animate);
}
init();
handleParticles();
// animate();







