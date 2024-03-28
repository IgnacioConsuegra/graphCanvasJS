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
  for(let i = 0; i < 1; i++) {
    particlesArray.push(new Particle());
  }
});
canvas.addEventListener('mousemove', (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
  // for(let i = 0; i < 10; i++) {
  //   particlesArray.push(new Particle());
  // }

});


class Particle {
  constructor() {
    this.size = 40;
    this.x = (Math.random() * (canvas.width - (this.size + 20))) + this.size;
    this.y = (Math.random() * (canvas.height - (this.size + 20))) + this.size;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 -1.5;
    this.color = `hsla(${hue}, 100%, 50%, 1)`;
    this.background = `hsla(${hue}, 50%, 20%, 1)`
  }
  update() {
    if(this.x <= 0 + this.size 
      || this.x >= canvas.width - this.size) {
      this.speedX = this.speedX * - 1;
    }
    if(this.y <= 0 + this.size 
      || this.y >= canvas.height - this.size) {
      this.speedY = this.speedY * - 1;
    }
    this.x += this.speedX;
    this.y += this.speedY;
  }
  reverseSX() {
    this.speedX = this.speedX * - 1;
  }
  reverseSY() {
    this.speedY = this.speedY * - 1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.strokeStyle = this.color;
    ctx.stroke();

    const gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x - 10,
      this.y - 10,
      this.size - 10
    );
    gradient.addColorStop(0.25, "white");
    gradient.addColorStop(1, this.color);
    ctx.fillStyle = gradient;
    ctx.fill();
  }
}
function init() {
  for (let i = 0; i < 20; i++) {
    hue += 6;
    particlesArray.push(new Particle());
  }
}
function handleParticles() {
  for(let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
    for( let j = i; j < particlesArray.length; j++) {
      const dx = particlesArray[i].x - particlesArray[j].x;
      const dy = particlesArray[i].y - particlesArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      // if(distance < 100) {
      //   ctx.beginPath();
      //   ctx.strokeStyle = particlesArray[i].color;
      //   ctx.lineWidth = particlesArray[i].size / 10;
      //   ctx.lineWidth = 0.5;
      //   ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
      //   ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
      //   ctx.stroke();
      //   ctx.closePath();
      // }
    }
    if(particlesArray[i].size <= 0.3){
      particlesArray.splice(i, 1);
      console.log(particlesArray.length)
      i--;
    }
  }
}
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // ctx.fillStyle = `rgba(0, 0, 0, 0.02)`;
  // ctx.fillRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  hue += 2;
  requestAnimationFrame(animate);
}
init();
animate();







