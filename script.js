/* script.js - Cinematic Animations */

document.addEventListener("DOMContentLoaded", () => {
    // Register GSAP Plugin
    gsap.registerPlugin(ScrollTrigger);

    // === 1. Loader Logic ===
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.classList.add('loaded');
        initHero(); // Start Hero Animations after loader
    }, 2500);

    // === 2. Music Toggle ===
    const musicBtn = document.getElementById('musicBtn');
    const audio = document.getElementById('bgMusic');
    let isPlaying = false;

    if(musicBtn) {
        musicBtn.addEventListener('click', () => {
            if (!audio) return;
            
            if (!isPlaying) {
                audio.volume = 0.3;
                audio.play().catch(e => console.log("Audio needs interaction"));
                musicBtn.querySelector('.icon').style.color = "#ff0055";
                isPlaying = true;
            } else {
                audio.pause();
                musicBtn.querySelector('.icon').style.color = "#d4af37";
                isPlaying = false;
            }
        });
    }

    // === 3. Hero Typewriter Effect ===
    const text = "Today isn't just another day. It's a celebration of a rare soul.";
    const typewriterEl = document.querySelector('.typewriter');
    let charIndex = 0;

    function typeWriter() {
        if (charIndex < text.length) {
            typewriterEl.innerHTML += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 50);
        }
    }

    // === 4. Start Journey Button ===
    const startBtn = document.getElementById('startBtn');
    if(startBtn) {
        startBtn.addEventListener('click', () => {
            document.getElementById('welcome').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // === 5. Hero Intro Animation ===
    function initHero() {
        typeWriter();
        
        gsap.from(".hero h1", {
            y: 100,
            opacity: 0,
            duration: 1.5,
            ease: "power4.out"
        });

        gsap.from("#startBtn", {
            y: 20,
            opacity: 0,
            duration: 1,
            delay: 1
        });
    }

    // === 6. Section 1: Welcome Scroll Animation ===
    gsap.from(".section-welcome .glass-card", {
        scrollTrigger: {
            trigger: "#welcome",
            start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out"
    });

    // === 7. Section 2: Timeline Animation ===
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        gsap.to(item, {
            scrollTrigger: {
                trigger: "#timeline",
                start: "top 70%",
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power2.out",
            onComplete: () => {
                // Add click event to reveal details
                item.addEventListener('click', () => {
                    gsap.to(item.querySelector('.content'), {
                        scale: 1.05,
                        duration: 0.3,
                        yoyo: true,
                        repeat: 1
                    });
                });
            }
        });
    });

    // === 8. Section 3: Flip Cards ===
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });

    // === 9. Section 4: Star Canvas (Interactive) ===
    const canvas = document.getElementById('starCanvas');
    const ctx = canvas.getContext('2d');
    let stars = [];
    let width, height;

    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Star {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2 + 1;
            this.blinkSpeed = Math.random() * 0.05 + 0.01;
            this.alpha = Math.random();
            this.direction = 1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
            ctx.fill();
        }

        update() {
            this.alpha += this.blinkSpeed * this.direction;
            if (this.alpha >= 1 || this.alpha <= 0.2) {
                this.direction *= -1;
            }
        }
    }

    for(let i = 0; i < 150; i++) {
        stars.push(new Star());
    }

    function animateStars() {
        ctx.clearRect(0, 0, width, height);
        stars.forEach(star => {
            star.update();
            star.draw();
        });
        requestAnimationFrame(animateStars);
    }
    animateStars();

    // Click Star Effect
    canvas.addEventListener('click', (e) => {
        // Create a ripple message
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.color = '#fff';
        ripple.style.fontFamily = 'var(--font-serif)';
        ripple.style.pointerEvents = 'none';
        ripple.style.fontSize = '1.2rem';
        ripple.style.textShadow = '0 0 10px #d4af37';
        
        const messages = ["Beautiful", "Radiant", "Graceful", "Unique", "Star"];
        ripple.innerText = messages[Math.floor(Math.random() * messages.length)];
        
        document.body.appendChild(ripple);
        
        gsap.to(ripple, {
            y: -50,
            opacity: 0,
            duration: 1.5,
            onComplete: () => ripple.remove()
        });
    });

    // === 10. Section 5: Memory Modal ===
    const memoryCards = document.querySelectorAll('.memory-card');
    const modal = document.getElementById('memoryModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalText = document.getElementById('modalText');
    const closeModal = document.querySelector('.close-modal');

    memoryCards.forEach(card => {
        card.addEventListener('click', () => {
            modalTitle.innerText = card.getAttribute('data-front');
            modalText.innerText = card.getAttribute('data-back');
            modal.classList.add('active');
        });
    });

    if(closeModal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    modal.addEventListener('click', (e) => {
        if(e.target === modal) modal.classList.remove('active');
    });

    // Animate Memory Cards Entrance
    gsap.from(".memory-card", {
        scrollTrigger: { trigger: "#memory", start: "top 75%" },
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1
    });

    // === 11. Section 6: Text Reveal on Scroll ===
    const lines = document.querySelectorAll('.line');
    lines.forEach((line, index) => {
        gsap.to(line, {
            scrollTrigger: {
                trigger: "#why",
                start: "top 70%",
            },
            opacity: 1,
            y: 0,
            duration: 1,
            delay: index * 0.5,
            ease: "power2.out"
        });
    });

    // === 12. Section 7: Surprise Wish ===
    gsap.from(".big-wish", {
        scrollTrigger: { trigger: "#surprise", start: "top 60%" },
        scale: 0.5,
        opacity: 0,
        duration: 2,
        ease: "elastic.out(1, 0.5)",
        color: "#fff",
        textShadow: "0 0 30px #ff0055"
    });

    // === 13. Final Section Fade In ===
    gsap.from(".final-message", {
        scrollTrigger: { trigger: ".final-screen", start: "top 80%" },
        y: 30,
        opacity: 0,
        duration: 2,
        delay: 0.5
    });

});
