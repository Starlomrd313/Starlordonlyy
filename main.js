
/* =============================================
   DEAR SUMERAH — Main JS
   ============================================= */

(function () {
  'use strict';

  /* ---- CURSOR ---- */
  const cur = document.getElementById('cur');
  const curR = document.getElementById('curR');
  document.addEventListener('mousemove', e => {
    cur.style.left = e.clientX + 'px';
    cur.style.top  = e.clientY + 'px';
    curR.style.left = e.clientX + 'px';
    curR.style.top  = e.clientY + 'px';
  });

  /* ---- BACKGROUND LAYERS ---- */
  const BG_COUNT = 7;
  const bgLayers = [];
  for (let i = 0; i < BG_COUNT; i++) {
    const div = document.createElement('div');
    div.className = `bg-layer bg-${i}`;
    document.body.appendChild(div);
  }
  // show first bg
  bgLayers[0] = document.querySelector('.bg-0');
  document.querySelectorAll('.bg-layer').forEach((el, i) => { bgLayers[i] = el; });
  bgLayers[0].classList.add('visible');

  function showBg(index) {
    bgLayers.forEach((el, i) => el.classList.toggle('visible', i === index));
  }

  /* ---- STARS ---- */
  const canvas = document.getElementById('stars');
  const ctx    = canvas.getContext('2d');
  let stars    = [];

  function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = Array.from({ length: 140 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.3 + 0.2,
      a: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.008 + 0.002,
      color: Math.random() > 0.7 ? 'rgba(192,57,43,' : 'rgba(212,175,55,'
    }));
  }

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      s.a += s.speed;
      const alpha = 0.1 + 0.28 * Math.abs(Math.sin(s.a));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = s.color + alpha + ')';
      ctx.fill();
    });
    requestAnimationFrame(drawStars);
  }

  resizeCanvas();
  drawStars();
  window.addEventListener('resize', resizeCanvas);

  /* ---- PETALS ---- */
  const petalCont = document.getElementById('petals');
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    p.style.left              = Math.random() * 100 + 'vw';
    p.style.animationDuration = (9 + Math.random() * 14) + 's';
    p.style.animationDelay    = (Math.random() * 24) + 's';
    p.style.width             = (9 + Math.random() * 9) + 'px';
    p.style.height            = (13 + Math.random() * 12) + 'px';
    petalCont.appendChild(p);
  }

  /* ---- PAGES ---- */
  const pages  = document.querySelectorAll('.page');
  const total  = pages.length;
  let current  = 0;

  /* ---- LOADER ---- */
  const loader     = document.getElementById('loader');
  const loaderWord = document.getElementById('loaderWord');
  const loaderBar  = document.getElementById('loaderBar');
  const WORD       = 'STARLORD';

  function showLoader(callback) {
    loaderWord.innerHTML = '';
    loaderBar.style.width = '0%';
    loader.classList.add('show');

    // letter-by-letter
    WORD.split('').forEach(ch => {
      const sp = document.createElement('span');
      sp.textContent = ch;
      loaderWord.appendChild(sp);
    });
    const spans = loaderWord.querySelectorAll('span');
    let li = 0;
    const litv = setInterval(() => {
      if (li < spans.length) { spans[li].classList.add('show'); li++; }
      else clearInterval(litv);
    }, 85);

    // progress bar
    let pct = 0;
    const barTv = setInterval(() => {
      pct += Math.random() * 9 + 4;
      if (pct >= 100) { pct = 100; clearInterval(barTv); }
      loaderBar.style.width = pct + '%';
    }, 55);

    // hide + callback
    setTimeout(() => {
      loader.classList.remove('show');
      setTimeout(callback, 380);
    }, 1600);
  }

  /* ---- ANIMATE PAGE CHILDREN ---- */
  function animatePage(pg) {
    const els = pg.querySelectorAll(
      '.tag,.hero-name,.gold-line,.hero-sub,.chapter-label,.pg-title,.pg-film,' +
      '.pg-quote,.pg-sub,.letter-box,.final-verse,.final-name,.final-tag,.btn-cont'
    );
    els.forEach((el, i) => {
      el.style.animation = 'none';
      void el.offsetHeight; // reflow
      el.style.animation = `pgUp .72s ease ${i * 0.07}s both`;
    });
  }

  /* ---- GO NEXT ---- */
  window.goNext = function () {
    if (current >= total - 1) return;
    showLoader(() => {
      pages[current].classList.remove('active');
      current++;
      showBg(current);
      const pg = pages[current];
      pg.classList.add('active');
      animatePage(pg);
    });
  };

  // keyboard
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === 'Enter') window.goNext();
  });

  // animate first page on load
  window.addEventListener('load', () => {
    animatePage(pages[0]);
  });

  /* ---- AUTO-PLAY AMBIENT AUDIO ---- */
  // Uses a free royalty-free piano ambient from a CDN (no button needed)
  // Replace the src below with your own song.mp3 if you want a different track
  const audio = new Audio();
  audio.loop   = true;
  audio.volume = 0.28;
  // Royalty-free ambient piano — replace with your own track path e.g. 'song.mp3'
  audio.src = 'https://cdn.pixabay.com/audio/2022/10/30/audio_5c9e9d5f51.mp3';

  // Try autoplay; browsers require user interaction first
  function tryPlay() {
    audio.play().catch(() => {
      // Autoplay blocked — play on first click/tap
      document.addEventListener('click', () => audio.play(), { once: true });
      document.addEventListener('touchstart', () => audio.play(), { once: true });
    });
  }

  // Wait for load event so fonts are ready
  window.addEventListener('load', tryPlay);

})();
