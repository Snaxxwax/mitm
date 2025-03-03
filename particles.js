class Particle {
  constructor(svg, x, y) {
    this.element = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    this.element.setAttribute("cx", x);
    this.element.setAttribute("cy", y);
    this.element.setAttribute("r", Math.random() * 1.5 + 0.5);
    this.element.setAttribute("fill", "#ffffff");
    this.element.classList.add("particle");
    this.element.style.animationDelay = `${Math.random() * 3}s`;
    svg.querySelector(".particles").appendChild(this.element);
    
    setTimeout(() => {
      this.element.remove();
    }, 3000);
  }
}

function generateParticles() {
  const svg = document.getElementById("headerSvg");
  const viewBox = svg.viewBox.baseVal;
  
  setInterval(() => {
    const x = Math.random() * viewBox.width;
    const y = Math.random() * (viewBox.height / 2);
    new Particle(svg, x, y);
  }, 200);
}

document.addEventListener("DOMContentLoaded", generateParticles);