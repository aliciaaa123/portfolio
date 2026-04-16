// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      // Close mobile menu if open
      navLinks.classList.remove('open');
    }
  });
});

// ===== FADE-IN ON SCROLL =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ===== NAVBAR SCROLL SHADOW =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 20
    ? '0 4px 20px rgba(13,148,136,0.15)'
    : '0 2px 12px rgba(13,148,136,0.08)';
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id], header[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => {
        a.style.color = '';
        a.style.background = '';
      });
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) {
        active.style.color = '#0d9488';
        active.style.background = '#f0fdfa';
      }
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('section[id]').forEach(s => sectionObserver.observe(s));

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// ===== STAT COUNTER ANIMATION =====
function animateCounter(el) {
  const raw = el.textContent.trim();
  const match = raw.match(/([\d,]+)/);
  if (!match) return;
  const end = parseInt(match[1].replace(',', ''));
  const suffix = raw.replace(match[1], '');
  let start = 0;
  const duration = 1200;
  const step = Math.ceil(end / (duration / 16));
  const timer = setInterval(() => {
    start = Math.min(start + step, end);
    el.textContent = start.toLocaleString() + suffix;
    if (start >= end) clearInterval(timer);
  }, 16);
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(animateCounter);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const impactSection = document.querySelector('.impact-section');
if (impactSection) statsObserver.observe(impactSection);
