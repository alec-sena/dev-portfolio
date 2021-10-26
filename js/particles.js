const canvas = document.querySelector(".js-canvas");
const ctx = canvas.getContext("2d");
// const main = document.getElementById("js-main");
const rect = canvas.parentNode.getBoundingClientRect();

const resizeCanvas = () => {
  /* canvas.height = window.screen.height; //window.innerHeight;
  canvas.width = window.screen.width; //window.innerWidth; */
  
  canvas.width = rect.width;
  canvas.height = rect.height;
} 

resizeCanvas();

window.addEventListener('resize', resizeCanvas);

// --- helper
const getRandomNum = (max) => {
  return (Math.random() * (max - 1)) + 1;
}

// --- PARTICLES ---
class Particle {
  constructor(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
  }

  draw() {
    // boundary check
    if (this.x + this.vx >= canvas.width || this.x + this.vx <= 1) {
      this.vx *= -1;
    }

    if (this.y + this.vy >= canvas.height || this.y + this.vy <= 1) {
      this.vy *= -1;
    }

    this.x += this.vx;
    this.y += this.vy;

    ctx.beginPath();
    ctx.fillRect(this.x, this.y, 2, 2);
    ctx.fillStyle = 'white';
  }
}

const particles = [];

let nums = [];

const init = (numParticles) => {
  for (let x = 0; x < numParticles; x++) {

    //particles.push(new Particle(getRandomNum(window.innerWidth), getRandomNum(window.innerHeight), getRandomNum(3), getRandomNum(3)));
    particles.push(new Particle(getRandomNum(canvas.width), getRandomNum(canvas.height), getRandomNum(3), getRandomNum(3)));
    nums = [];
  }
}

init(50);



const drawLines = (particles) => {
  for (let x = 0; x < particles.length; x++) {
    for (let y = x + 1; y < particles.length; y++) {


      ctx.beginPath();
      ctx.moveTo(particles[x].x, particles[x].y);
      ctx.lineTo(particles[y].x, particles[y].y);
      let distance = Math.hypot(particles[y].x - particles[x].x, particles[y].y - particles[x].y);
    
      /* if (distance <= 100) {
        let opacity = (100 - distance) * 0.01;
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
      } else {
      	ctx.strokeStyle = `rgba(255, 255, 255, 0)`;
      } */
      if (distance <= 200) {
        let opacity = (100 - (distance/2)) * 0.01;
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
      } else {
      	ctx.strokeStyle = `rgba(255, 255, 255, 0)`;
      }
      ctx.stroke();
    }
  }
}

const animationLoop = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let x = 0; x < particles.length; x++) {
    particles[x].draw();
  }
  drawLines(particles);
  requestAnimationFrame(animationLoop);
}

animationLoop();