// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
  link.addEventListener('click', () => navToggle.setAttribute('aria-expanded', 'false'));
});

// Typewriter effect
const roles = [
  'Software Developer',
  'AI/ML Enthusiast',
  'Full-Stack Developer',
  'Published Researcher',
  'Java Developer',
];

let roleIndex   = 0;
let charIndex   = 0;
let isDeleting  = false;
const roleEl    = document.getElementById('roleText');
const TYPING_SPEED   = 80;
const DELETING_SPEED = 40;
const PAUSE_DURATION = 2000;

function typeWriter() {
  const current = roles[roleIndex];

  if (isDeleting) {
    roleEl.textContent = current.slice(0, --charIndex);
  } else {
    roleEl.textContent = current.slice(0, ++charIndex);
  }

  let delay = isDeleting ? DELETING_SPEED : TYPING_SPEED;

  if (!isDeleting && charIndex === current.length) {
    delay = PAUSE_DURATION;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting  = false;
    roleIndex   = (roleIndex + 1) % roles.length;
    delay = 300;
  }

  setTimeout(typeWriter, delay);
}

typeWriter();

// Intersection Observer for fade-in animations
const fadeEls = document.querySelectorAll(
  '.section-title, .about-grid, .skills-grid, .projects-grid, ' +
  '.edu-grid, .contact-links, ' +
  '.stat-card, .skill-category, .project-card, .edu-card, .contact-card'
);

fadeEls.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

fadeEls.forEach(el => observer.observe(el));

// Active nav link highlighting
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navItems.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
