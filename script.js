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
    particlesArray.push(new Particle(mouse.x, mouse.y));
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
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 17;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 -1.5;
    this.color = `hsl(${hue}, 100%, 50%)`
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
    // if(this.size > 0.2) this.size -= 0.1;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}
function init() {
  for (let i = 0; i < 30; i++) {
    hue += 2;
    const x = (Math.random() * canvas.width - 50) + 50;
    const y = (Math.random() * canvas.height - 50) + 50;
    particlesArray.push(new Particle(x, y));
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
      if(distance < 200) {
        ctx.beginPath();
        ctx.strokeStyle = particlesArray[i].color;
        // ctx.lineWidth = particlesArray[i].size / 10;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.stroke();
        ctx.closePath();

      }
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







