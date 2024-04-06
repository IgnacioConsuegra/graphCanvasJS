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
  function handleXOverflow() {
    const particlesLRLength = particlesLeftAndRightPositions.length;
    for(let row = particlesLRLength - 1; row > 0; row--) {
      const leftArrLength = particlesLeftAndRightPositions[row][0].length;
      const rightArrLength = particlesLeftAndRightPositions[row][1].length;

      
      let rightLeftNode = -Infinity;
      let leftestRightNode = Infinity;
      if(leftArrLength){rightLeftNode = particlesLeftAndRightPositions[row][0][leftArrLength - 1].x}
      if(rightArrLength){leftestRightNode = particlesLeftAndRightPositions[row][1][0].x}
      if(rightLeftNode >= RIGHTEST_lEFT_POSSIBLE) {
        //Let's align rightest particle, and let's align all row. 
        particlesLeftAndRightPositions[row][0][leftArrLength - 1].x = RIGHTEST_lEFT_POSSIBLE;
        let lastParticle = particlesLeftAndRightPositions[row][0][leftArrLength - 1].x;
        for(let particle = leftArrLength - 2; particle >= 0; particle--) {
          const particlePosition = particlesLeftAndRightPositions[row][0][particle].x;
          if(lastParticle - particlePosition < 30){
            particlesLeftAndRightPositions[row][0][particle].x = lastParticle - NODES_WIDTH_DISTANCE;
          }
          lastParticle = particlesLeftAndRightPositions[row][0][particle].x;
        }
        //Let's align uppers rows.
        for(let rowsA = row - 1; rowsA > 0; rowsA--) {
          const thisArrLength = particlesLeftAndRightPositions[rowsA][0].length;
          for(let particle = 0; particle < thisArrLength; particle++){
            const thisParticle = particlesLeftAndRightPositions[rowsA][0][particle];
            if(thisParticle.left) {
              thisParticle.x = thisParticle.left.x + NODES_WIDTH_DISTANCE  / 2;
              continue;
            }
            if(thisParticle.right) {
              console.log("Particle right : ", thisParticle.right)
              thisParticle.x = thisParticle.right.x - NODES_WIDTH_DISTANCE / 2;
              continue;
            }
          }
        }
      }
      if(leftestRightNode <= LEFTEST_RIGHT_POSSIBLE) {
        //Let's align rightest particle, and let's align all row. 
        particlesLeftAndRightPositions[row][1][0].x = LEFTEST_RIGHT_POSSIBLE;
        let lastParticle = particlesLeftAndRightPositions[row][1][0].x;

        for(let particle = 1; particle <= rightArrLength - 1; particle++) {
          const particlePosition = particlesLeftAndRightPositions[row][1][particle].x;
          if(particlePosition - lastParticle  < 30){
            particlesLeftAndRightPositions[row][1][particle].x = lastParticle + NODES_WIDTH_DISTANCE;
          }
          lastParticle = particlesLeftAndRightPositions[row][1][particle].x;
        }
        //Let's align uppers rows.
        for(let rowsA = row - 1; rowsA > 1; rowsA--) {
          const thisArrLength = particlesLeftAndRightPositions[rowsA][1].length;

          for(let particle = 1; particle < thisArrLength; particle++){
            const thisParticle = particlesLeftAndRightPositions[rowsA][1][particle];
            if(thisParticle.left) {
              thisParticle.x = thisParticle.left.x - NODES_WIDTH_DISTANCE  / 2;
              continue;
            }
            if(thisParticle.right) {
              thisParticle.x = thisParticle.right.x + NODES_WIDTH_DISTANCE / 2;
              continue;
            }
          }
        }
      }
    }
  }
  function respectSpaces() {
    const particlesLRLength = particlesLeftAndRightPositions.length;
    for(let row = particlesLRLength - 1; row > 0; row--) {
      const leftArrLength = particlesLeftAndRightPositions[row][0].length;
      const rightArrLength = particlesLeftAndRightPositions[row][1].length;

      if(leftArrLength > 1) {
        let lastParticle = particlesLeftAndRightPositions[row][0][leftArrLength - 1].x;
        for(let particle = leftArrLength - 2; particle >= 0; particle--) {
          const particlePosition = particlesLeftAndRightPositions[row][0][particle].x;
          if(lastParticle - particlePosition < 30){
            particlesLeftAndRightPositions[row][0][particle].x = lastParticle - NODES_WIDTH_DISTANCE;
          }
          lastParticle = particlesLeftAndRightPositions[row][0][particle].x;
        }
      } 

      if(rightArrLength > 1) {
        let lastParticle = particlesLeftAndRightPositions[row][1][0].x;
        for(let particle = 1; particle <= rightArrLength - 1; particle++) {
          const particlePosition = particlesLeftAndRightPositions[row][1][particle].x;
          if(particlePosition - lastParticle < 30){
            particlesLeftAndRightPositions[row][1][particle].x = lastParticle + NODES_WIDTH_DISTANCE;
          }
          lastParticle = particlesLeftAndRightPositions[row][1][particle].x;
        }
      } 
    }
  }
  try{
    handleXOverflow();
    respectSpaces();

  }catch(err) {
    console.log(err)
  }
}
function init() {
  for(let i = 0; i < 26; i++ ) {
    if(i === 0) {
      const node = new Particle(middleX + 0, 100, NODES_SIZE);
      particlesArray.push(node);
      particlesLeftAndRightPositions.push([node]);
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
  console.log(myTree);
  console.log(particlesLeftAndRightPositions);
  alignNodesPosition();
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







