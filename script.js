// Floating Hearts Animation
function createHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
    heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
    document.getElementById('hearts').appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 5000);
}

// Floating Particles
function createParticle() {
    const particle = document.createElement('div');
    particle.innerHTML = '✨';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.animationDuration = (Math.random() * 4 + 3) + 's';
    particle.style.fontSize = (Math.random() * 15 + 10) + 'px';
    document.getElementById('particles').appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 7000);
}

// Message Carousel
let currentMessage = 0;
const messages = document.querySelectorAll('.message');

function showNextMessage() {
    messages[currentMessage].classList.remove('active');
    currentMessage = (currentMessage + 1) % messages.length;
    messages[currentMessage].classList.add('active');
}

function toggleMessages() {
    showNextMessage();
}

// Story Scroll
function scrollToStory() {
    document.getElementById('story').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Music Control
let isPlaying = false;
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.querySelector('.music-toggle');

function toggleMusic() {
    if (isPlaying) {
        bgMusic.pause();
        musicToggle.innerHTML = '<i class="fas fa-music"></i>';
        isPlaying = false;
    } else {
        bgMusic.play().catch(() => {
            // Fallback for mobile browsers
            alert('🎵 Romantic music playing in my heart! 💖');
        });
        musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
        isPlaying = true;
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Start animations
    setInterval(createHeart, 300);
    setInterval(createParticle, 500);
    
    // Auto message rotation
    setInterval(showNextMessage, 4000);
    
    // Initial message
    messages[0].classList.add('active');
    
    // Mouse move hearts
    document.addEventListener('mousemove', (e) => {
        createHeartAt(e.clientX, e.clientY);
    });
});

function createHeartAt(x, y) {
    const heart = document.createElement('div');
    heart.innerHTML = '💕';
    heart.style.position = 'fixed';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.pointerEvents = 'none';
    heart.style.fontSize = '30px';
    heart.style.zIndex = '1000';
    heart.style.animation = 'floatUp 2s ease-out forwards';
    document.body.appendChild(heart);
    
    setTimeout(() => heart.remove(), 2000);
}

// Add floatUp animation
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-100px) scale(0.5);
        }
    }
`;
document.head.appendChild(style);
