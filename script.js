// Particle System
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.hue = Math.random() * 60 + 300; // Purple-pink tones
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= 0.002;
        if (this.opacity < 0) this.opacity = 0;
    }
    
    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = `hsl(${this.hue}, 70%, 60%)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (particles.length < 100) {
        particles.push(new Particle(
            Math.random() * canvas.width,
            Math.random() * canvas.height
        ));
    }
    
    particles.forEach((particle, i) => {
        particle.update();
        particle.draw();
        if (particle.opacity <= 0) particles.splice(i, 1);
    });
    
    requestAnimationFrame(animateParticles);
}

// Carousel
let currentThought = 0;
const thoughts = document.querySelectorAll('.thought-card');

function nextThought() {
    thoughts[currentThought].classList.remove('active');
    currentThought = (currentThought + 1) % thoughts.length;
    thoughts[currentThought].classList.add('active');
}

setInterval(nextThought, 4500);

// Star Shower
function starShower() {
    for (let i = 0; i < 80; i++) {
        setTimeout(() => {
            const star = document.createElement('div');
            star.innerHTML = '✨';
            star.style.cssText = `
                position: fixed;
                font-size: ${Math.random() * 20 + 10}px;
                left: ${Math.random() * 100}vw;
                top: -20px;
                pointer-events: none;
                z-index: 1000;
                animation: starFall ${Math.random() * 3 + 2}s linear forwards;
            `;
            document.body.appendChild(star);
            setTimeout(() => star.remove(), 5000);
        }, i * 30);
    }
}

// Gratitude Message
function showGratitude() {
    const msg = document.createElement('div');
    msg.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(30px);
            padding: 40px 60px;
            border-radius: 25px;
            border: 1px solid rgba(255,255,255,0.2);
            text-align: center;
            font-family: 'Playfair Display', serif;
            z-index: 1001;
            box-shadow: 0 30px 80px rgba(0,0,0,0.7);
        ">
            <h3 style="color: #ff6b9d; margin-bottom: 15px; font-size: 2rem;">Thank You</h3>
            <p style="opacity: 0.9; line-height: 1.6; max-width: 300px;">
                For bringing light into my world ✨
            </p>
        </div>
    `;
    document.body.appendChild(msg);
    
    setTimeout(() => msg.remove(), 3000);
}

// Mouse Trail
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.85) {
        particles.push(new Particle(e.clientX, e.clientY));
    }
});

// Timeline Animation
document.addEventListener('DOMContentLoaded', () => {
    animateParticles();
    
    // Add star fall animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes starFall {
            0% {
                opacity: 1;
                transform: translateY(0) rotate(0deg);
            }
            100% {
                opacity: 0;
                transform: translateY(100vh) rotate(720deg);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Initial active thought
    thoughts[0].classList.add('active');
});

// Resize handler
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
