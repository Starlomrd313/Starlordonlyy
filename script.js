/* script.js - Cinematic Animations */

document.addEventListener("DOMContentLoaded", () => {
    // Initialize GSAP
    gsap.registerPlugin(ScrollTrigger);

    // Loader
    const loader = document.querySelector('.loader');
    
    setTimeout(() => {
        loader.classList.add('loaded');
        initHero();
    }, 2000);

    // Music Toggle
    const musicBtn = document.getElementById('musicBtn');
    const audio = document.getElementById('bgMusic');
    let isPlaying = false;

    if(musicBtn && audio) {
        musicBtn.addEventListener('click', () => {
            if (!isPlaying) {
                audio.volume = 0.4;
                audio.play().catch(e => console.log("Audio play failed (user interaction needed first):", e));
                musicBtn.querySelector('.icon').style.color = "#ff0055";
                isPlaying = true;
            } else {
                audio.pause();
                musicBtn.querySelector('.icon').style.color = "#d4af37";
                isPlaying = false;
            }
        });
    }

    // Hero Animation
    function initHero() {
        const tl = gsap.timeline();
        
        tl.from(".hero h1", {
            y: 50,
            opacity: 0,
            duration: 1.5,
            ease: "power3.out"
        })
        .from(".hero .typewriter", {
            opacity: 0,
            duration: 1
        }, "-=1")
        .from(".cta
