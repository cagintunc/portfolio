/* =====================================================
   ÇAĞIN TUNÇ PORTFOLIO — SCRIPT 2025
   ===================================================== */

// ── Navbar: scroll class & active link ──────────────
const navbar   = document.getElementById('navbar');
const sections = Array.from(document.querySelectorAll('section[id]'));
const navLinks = Array.from(document.querySelectorAll('.nav-link'));

function onScroll() {
  // scrolled class
  navbar.classList.toggle('scrolled', window.scrollY > 40);

  // active nav link
  const mid = window.scrollY + window.innerHeight / 3;
  let current = '';
  sections.forEach(s => { if (s.offsetTop <= mid) current = s.id; });
  navLinks.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + current);
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ── Mobile nav toggle ────────────────────────────────
const navToggle  = document.getElementById('navToggle');
const navLinksEl = document.getElementById('navLinks');

navToggle.addEventListener('click', () => navLinksEl.classList.toggle('open'));
navLinks.forEach(l => l.addEventListener('click', () => navLinksEl.classList.remove('open')));

// ── Scroll reveal (Intersection Observer) ───────────
const revealObs = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ── Typed role animation ─────────────────────────────
const roles = [
  'AI/ML Engineer',
  'Computer Vision Engineer',
  'Software Engineer',
  'Bioengineer',
];

const typedEl = document.getElementById('typedRole');
let rIdx = 0, cIdx = 0, deleting = false;

function type() {
  const word = roles[rIdx];
  typedEl.textContent = deleting ? word.slice(0, cIdx - 1) : word.slice(0, cIdx + 1);
  deleting ? cIdx-- : cIdx++;

  let delay = deleting ? 55 : 95;
  if (!deleting && cIdx === word.length)      { delay = 2000; deleting = true; }
  else if (deleting && cIdx === 0)            { deleting = false; rIdx = (rIdx + 1) % roles.length; delay = 380; }

  setTimeout(type, delay);
}
type();

// ── Particle canvas ──────────────────────────────────
(function () {
  const canvas = document.getElementById('heroCanvas');
  const ctx    = canvas.getContext('2d');
  let   pts    = [];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function Pt() {
    this.reset = function () {
      this.x  = Math.random() * canvas.width;
      this.y  = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.38;
      this.vy = (Math.random() - 0.5) * 0.38;
      this.r  = Math.random() * 1.4 + 0.4;
      this.a  = Math.random() * 0.38 + 0.08;
    };
    this.reset();
    this.update = function () {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
    };
    this.draw = function () {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(34,211,238,' + this.a + ')';
      ctx.fill();
    };
  }

  function init() {
    pts = [];
    const n = Math.min(Math.floor(canvas.width * canvas.height / 11000), 130);
    for (let i = 0; i < n; i++) pts.push(new Pt());
  }

  function connect() {
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x;
        const dy = pts[i].y - pts[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 105) {
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = 'rgba(34,211,238,' + (0.07 * (1 - d / 105)) + ')';
          ctx.lineWidth   = 0.6;
          ctx.stroke();
        }
      }
    }
  }

  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pts.forEach(p => { p.update(); p.draw(); });
    connect();
    requestAnimationFrame(frame);
  }

  window.addEventListener('resize', () => { resize(); init(); });
  resize(); init(); frame();
})();

// ── Project expand / collapse ────────────────────────
function toggleProject(card) {
  const isOpen = card.classList.contains('open');
  // Close all open cards first (accordion)
  document.querySelectorAll('.project-card.open').forEach(c => c.classList.remove('open'));
  if (!isOpen) {
    card.classList.add('open');
    setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 80);
  }
}

// ── Gallery carousels ────────────────────────────────
document.querySelectorAll('.achievement-gallery, .program-gallery').forEach(gallery => {
  // Skip galleries with only one image
  if (gallery.children.length < 2) return;

  // Wrap in relative container
  const wrap = document.createElement('div');
  wrap.className = 'gallery-wrap';
  gallery.parentNode.insertBefore(wrap, gallery);
  wrap.appendChild(gallery);

  // Build nav buttons
  const STEP = 230;
  const chevronPrev = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>';
  const chevronNext = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>';

  const prev = document.createElement('button');
  prev.className = 'gallery-nav prev';
  prev.setAttribute('aria-label', 'Previous');
  prev.innerHTML = chevronPrev;

  const next = document.createElement('button');
  next.className = 'gallery-nav next';
  next.setAttribute('aria-label', 'Next');
  next.innerHTML = chevronNext;

  wrap.appendChild(prev);
  wrap.appendChild(next);

  function updateNav() {
    prev.classList.toggle('hidden', gallery.scrollLeft < 4);
    next.classList.toggle('hidden', gallery.scrollLeft + gallery.clientWidth >= gallery.scrollWidth - 4);
  }

  prev.addEventListener('click', () => gallery.scrollBy({ left: -STEP, behavior: 'smooth' }));
  next.addEventListener('click', () => gallery.scrollBy({ left:  STEP, behavior: 'smooth' }));
  gallery.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // Touch swipe (horizontal drag)
  let startX = 0;
  gallery.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  gallery.addEventListener('touchend',   e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) gallery.scrollBy({ left: diff > 0 ? STEP : -STEP, behavior: 'smooth' });
  }, { passive: true });
});

// ── Lightbox ─────────────────────────────────────────
const lightbox    = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

function openLightbox(src) {
  lightboxImg.src = src;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
