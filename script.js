const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//ParticlesArray is used to draw them.
const particlesArray = [];

//This arr below is used to align our particles.
const particlesLeftAndRightPositions = [];

let hue = 0;
const middleX = canvas.width / 2;
const middleY = canvas.height;

const NODES_SIZE = 10;
const NODES_WIDTH_DISTANCE = 50;
const NODES_HEIGHT_DISTANCE = 100;
const RIGHTEST_lEFT_POSSIBLE = (middleX) - (NODES_SIZE * 3);
const LEFTEST_RIGHT_POSSIBLE = (middleX) + (NODES_SIZE * 3);



class Particle {
  constructor(
    positionX = 100, 
    positionY = 100,
    nodeSize = 50,
    parent = null,
    depth = 0,
    ) {
    this.x = positionX;
    this.y = positionY;
    this.size = nodeSize;
    this.color = `hsl(${hue}, 100%, 50%)`;
    this.left = null;
    this.right = null;
    this.isFromLeftRoot = false;
    this.isFromRightRoot = false;
    this.parent = parent;
    this.depth = depth;
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
  // proveRightOrLeftest(node) {
  //   if(node.isFromLeftRoot) {
  //     if(this.rightestLeftRoot < node.x) {
  //       this.rightestLeftRoot = node.x;
  //     }
  //   }
  //   if(node.isFromRightRoot) {
  //     if(this.leftestRightRoot > node.x) {
  //       this.leftestRightRoot = node.x;
  //     }
  //   }
  // }
  breathFirst(){
    return;
  }
}
const myTree = new Tree();
function handleParticlesArrPosition(node){
  try{
    if(particlesLeftAndRightPositions.length - 1 < node.depth) {
      particlesLeftAndRightPositions.push([[], []]);
      if(node.isFromLeftRoot) {
        particlesLeftAndRightPositions[node.depth][0].push(node);
      }
      if(node.isFromRightRoot) {
        particlesLeftAndRightPositions[node.depth][1].push(node);
      }
    }else{
      if(node.isFromLeftRoot) {
        particlesLeftAndRightPositions[node.depth][0].push(node);
      }
      if(node.isFromRightRoot) {
        particlesLeftAndRightPositions[node.depth][1].push(node);
      }
    };
  } catch(err) {
  }
}
function alignNodesPosition(){
  try{
    for(let i = particlesLeftAndRightPositions.length - 1; i > 0; i--) { 
      particlesLeftAndRightPositions[i].map((parHolder, parHolderPosition) => {
        if(parHolderPosition === 0 ) {
            const thisArrLength = particlesLeftAndRightPositions[i][parHolderPosition].length;
            if(thisArrLength === 0 ) {
              return;
            }
            const rightest = particlesLeftAndRightPositions[i][parHolderPosition][thisArrLength - 1];
            const rightestPosition = rightest.x; 
            if(rightestPosition > RIGHTEST_lEFT_POSSIBLE) { 
              particlesLeftAndRightPositions[i][parHolderPosition][thisArrLength - 1].x = RIGHTEST_lEFT_POSSIBLE;
              let last_Particle_Position = particlesLeftAndRightPositions[i][parHolderPosition][thisArrLength - 1].x;
              console.log("rightest : ", last_Particle_Position);
              for(let h = particlesLeftAndRightPositions[i][parHolderPosition].length - 2; h >= 0; h--) {
                particlesLeftAndRightPositions[i][parHolderPosition][h].x = last_Particle_Position - NODES_WIDTH_DISTANCE; 
                last_Particle_Position = particlesLeftAndRightPositions[i][parHolderPosition][h].x;
              }
            }
        }
        if(parHolderPosition === 1 ) {
          const thisArrLength = particlesLeftAndRightPositions[i][parHolderPosition].length;
          if(thisArrLength === 0 ) {
            return;
          }
          const lefTest = particlesLeftAndRightPositions[i][parHolderPosition][0];
          const lefTestPosition = lefTest.x; 
          if(lefTestPosition < LEFTEST_RIGHT_POSSIBLE) { 
            particlesLeftAndRightPositions[i][parHolderPosition][0].x = LEFTEST_RIGHT_POSSIBLE;
            let last_Particle_Position = particlesLeftAndRightPositions[i][parHolderPosition][0].x;
              
            for(let h = 1; h >= thisArrLength - 1; h--) {
              particlesLeftAndRightPositions[i][parHolderPosition][h].x = last_Particle_Position + NODES_WIDTH_DISTANCE; 
              last_Particle_Position = particlesLeftAndRightPositions[i][parHolderPosition][h].x;
            }
        } 
        }
      })

    }
  }catch(err) {

  }
}
function init() {
  for(let i = 0; i < 9; i++ ) {
    if(i === 0) {
      const node = new Particle(middleX + 0, 100, NODES_SIZE);
      particlesArray.push(node);
      particlesLeftAndRightPositions.push([node.x]);
      myTree.add(node);
      continue;
    }
    if(i === 1) {
      const lastNode = myTree.itemsQueue[0];
      const left = new Particle(
        lastNode.x - NODES_WIDTH_DISTANCE, 
        lastNode.y + NODES_HEIGHT_DISTANCE,
        NODES_SIZE,
        myTree.root,
        1
      );
      left.isFromLeftRoot = true;
      particlesArray.push(left);
      myTree.add(left);
      
      handleParticlesArrPosition(left);
      continue;
    }
    if(i === 2) {
      const lastNode = myTree.itemsQueue[0];
      const right = new Particle(
        lastNode.x + NODES_WIDTH_DISTANCE, 
        lastNode.y + NODES_HEIGHT_DISTANCE,
        NODES_SIZE,
        myTree.root,
        1
        );
      right.isFromRightRoot = true;
      particlesArray.push(right);
      handleParticlesArrPosition(right);
      myTree.add(right);
      continue;
    }

    if(i % 2 === 0) {
      const lastNode = myTree.itemsQueue[0];
      const right = new Particle(
        lastNode.x + NODES_WIDTH_DISTANCE, 
        lastNode.y + NODES_HEIGHT_DISTANCE,
        NODES_SIZE,
        lastNode,
        lastNode.depth + 1,
        );
      if(right.parent.isFromLeftRoot === true) {
        right.isFromLeftRoot = true;
      } else {
        right.isFromRightRoot = true;
      }
      particlesArray.push(right);
      handleParticlesArrPosition(right);
      myTree.add(right);
    } else { 
      const lastNode = myTree.itemsQueue[0];
      const left = new Particle(
        lastNode.x - NODES_WIDTH_DISTANCE, 
        lastNode.y + NODES_HEIGHT_DISTANCE,
        NODES_SIZE,
        lastNode,
        lastNode.depth + 1,

      );
      if(left.parent.isFromLeftRoot === true) {
        left.isFromLeftRoot = true;
      } else {
        left.isFromRightRoot = true;
      }
      particlesArray.push(left);
      handleParticlesArrPosition(left);
      myTree.add(left);
    }
  }
  alignNodesPosition();
  console.log(myTree);
  console.log(particlesLeftAndRightPositions);
}

function handleParticles() {
  for(let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].draw();
  }
  for(let i = 0; i < particlesArray.length; i++) {
    const currentParticle = particlesArray[i];

    if(currentParticle.left !== null) {
      const leftParticle = currentParticle.left;
      ctx.beginPath();
      ctx.strokeStyle = particlesArray[i].color;
      ctx.lineWidth = 1;
      ctx.moveTo(currentParticle.x, currentParticle.y);
      ctx.lineTo(leftParticle.x, leftParticle.y);
      ctx.stroke();
      ctx.closePath();
    }
    if(currentParticle.right !== null) {
      const rightParticle = currentParticle.right;
      ctx.beginPath();
      ctx.strokeStyle = particlesArray[i].color;
      ctx.lineWidth = 1;
      ctx.moveTo(currentParticle.x, currentParticle.y);
      ctx.lineTo(rightParticle.x, rightParticle.y);
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







