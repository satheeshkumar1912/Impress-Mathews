/* ==========================================================================
   Mathew Personal Portfolio & Gallery - Interactive Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMarquee();
  initGallery();
  initScrollReveals();
  initGalleryMotionBackground();
});

/* --------------------------------------------------------------------------
   1. Header Sticky Scroll & Mobile Navigation
   -------------------------------------------------------------------------- */
function initHeader() {
  const header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Close mobile menu when clicking outside or on a link
  document.addEventListener('click', (e) => {
    const navMenu = document.getElementById('nav-menu');
    const mobileToggle = document.getElementById('mobile-toggle');
    if (!navMenu || !mobileToggle) return;

    if (navMenu.classList.contains('active')) {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('active');
      }
    }
  });
}

function toggleMobileMenu() {
  const navMenu = document.getElementById('nav-menu');
  if (navMenu) {
    navMenu.classList.toggle('active');
  }
}

/* --------------------------------------------------------------------------
   2. Seamless Infinite Marquee Cloning
   -------------------------------------------------------------------------- */
function initMarquee() {
  const track = document.getElementById('marquee-track');
  if (!track) return;

  // Duplicate items once so seamless continuous scroll occurs
  const items = Array.from(track.children);
  items.forEach(item => {
    const clone = item.cloneNode(true);
    track.appendChild(clone);
  });
}

/* --------------------------------------------------------------------------
   3. Interactive Impact Cards Carousel
   -------------------------------------------------------------------------- */
const impactCards = [
  {
    title: "Education",
    desc: "Supporting schools, students, and educational initiatives to encourage learning and long-term development.",
    image: "images/indian_education_community.webp",
    alt: "Supporting educational initiatives and students"
  },
  {
    title: "Community Growth",
    desc: "Contributing to religious institutions, community programs, and social welfare initiatives.",
    image: "images/community_growth_indian_welfare.webp",
    alt: "Community outreach and social welfare programs"
  },
  {
    title: "Sustainability",
    desc: "Creating sustainable career opportunities while nurturing talent and professional growth.",
    image: "images/sustainability_indian_visual.webp",
    alt: "Sustainable development and professional craftsmanship"
  }
];

let currentCardIndex = 0;

function navigateCard(direction) {
  currentCardIndex += direction;
  if (currentCardIndex < 0) {
    currentCardIndex = impactCards.length - 1;
  } else if (currentCardIndex >= impactCards.length) {
    currentCardIndex = 0;
  }
  updateImpactCard();
}

function goToCard(index) {
  if (index >= 0 && index < impactCards.length && index !== currentCardIndex) {
    currentCardIndex = index;
    updateImpactCard();
  }
}

function updateImpactCard() {
  const titleEl = document.getElementById('card-title');
  const descEl = document.getElementById('card-desc');
  const imgEl = document.getElementById('card-image');
  const cardBox = document.getElementById('impact-card-display');
  const dots = document.querySelectorAll('.card-dot');

  const current = impactCards[currentCardIndex];

  if (imgEl) {
    imgEl.style.opacity = '0.35';
    imgEl.style.transform = 'scale(1.03)';
  }

  if (cardBox) {
    cardBox.style.opacity = '0';
    cardBox.style.transform = 'translateY(6px)';
    cardBox.style.transition = 'all 0.2s ease';
  }

  setTimeout(() => {
    if (titleEl) titleEl.textContent = current.title;
    if (descEl) descEl.textContent = current.desc;
    if (imgEl) {
      imgEl.src = current.image;
      imgEl.alt = current.alt;
      imgEl.style.opacity = '1';
      imgEl.style.transform = 'scale(1)';
    }
    if (cardBox) {
      cardBox.style.opacity = '1';
      cardBox.style.transform = 'translateY(0)';
    }
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentCardIndex);
    });
  }, 200);
}

/* --------------------------------------------------------------------------
   4. Gallery & Interactive Lightbox Logic
   -------------------------------------------------------------------------- */
const galleryImages = [
  "images/gallery/UKC04678.webp",
  "images/gallery/UKC04700.webp",
  "images/gallery/UKC04705.webp",
  "images/gallery/UKC04733.webp",
  "images/gallery/UKC04739.webp",
  "images/gallery/UKC04753.webp",
  "images/gallery/UKC04755.webp",
  "images/gallery/UKC04773.webp",
  "images/gallery/UKC04804.webp",
  "images/gallery/UKC04842.webp",
  "images/gallery/UKC04873.webp",
  "images/gallery/UKC04893.webp",
  "images/gallery/UKC04902.webp",
  "images/gallery/UKC04913.webp",
  "images/gallery/UKC04927.webp",
  "images/gallery/UKC04945.webp",
  "images/gallery/UKC04980.webp",
  "images/gallery/UKC04995.webp",
  "images/gallery/UKC05061.webp",
  "images/gallery/UKC05065.webp",
  "images/gallery/UKC05066.webp",
  "images/gallery/UKC05070.webp",
  "images/gallery/UKC05080.webp",
  "images/gallery/UKC05097.webp",
  "images/gallery/UKC05100.webp",
  "images/gallery/UKC05113.webp",
  "images/gallery/UKC05127.webp",
  "images/gallery/UKC05145.webp",
  "images/gallery/UKC05165.webp",
  "images/gallery/UKC05177.webp",
  "images/gallery/UKC05192.webp",
  "images/gallery/UKC05196.webp",
  "images/gallery/UKC05206.webp",
  "images/gallery/UKC05225.webp",
  "images/gallery/UKC05248.webp",
  "images/gallery/UKC05253.webp",
  "images/gallery/UKC05260.webp",
  "images/gallery/UKC05281.webp",
  "images/gallery/UKC05303.webp",
  "images/gallery/UKC05315.webp"
];

let currentLightboxIndex = 0;
let touchStartX = 0;
let touchEndX = 0;
let isZoomed = false;

function initGallery() {
  const modal = document.getElementById('lightbox-modal');
  if (!modal) return;

  renderLightboxThumbnails();

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      navigateLightbox(-1);
    } else if (e.key === 'ArrowRight') {
      navigateLightbox(1);
    } else if (e.key === 'z' || e.key === 'Z') {
      toggleLightboxZoom();
    }
  });

  // Touch gesture listeners for mobile swipe
  modal.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  modal.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleTouchSwipe();
  }, { passive: true });

  // Add keyboard accessibility to gallery cards
  const cards = document.querySelectorAll('.gallery-card');
  cards.forEach(card => {
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const index = parseInt(card.getAttribute('data-index'), 10);
        if (!isNaN(index)) {
          openLightbox(index);
        }
      }
    });
  });
}

/* --------------------------------------------------------------------------
   5. Dynamic Layout Switcher (Bento / Masonry / Grid)
   -------------------------------------------------------------------------- */
function switchGalleryLayout(layoutType) {
  const container = document.getElementById('gallery-container');
  if (!container) return;

  // Remove existing layout classes
  container.classList.remove('layout-bento', 'layout-masonry', 'layout-grid');
  container.classList.add(`layout-${layoutType}`);

  // Update button active states
  const buttons = document.querySelectorAll('.switcher-btn');
  buttons.forEach(btn => btn.classList.remove('active'));

  const activeBtn = document.getElementById(`btn-layout-${layoutType}`);
  if (activeBtn) {
    activeBtn.classList.add('active');
  }
}

/* --------------------------------------------------------------------------
   6. Lightbox Controls, Thumbnails & Zoom
   -------------------------------------------------------------------------- */
function renderLightboxThumbnails() {
  const thumbsContainer = document.getElementById('lightbox-thumbnails');
  if (!thumbsContainer) return;

  thumbsContainer.innerHTML = '';
  galleryImages.forEach((imgSrc, idx) => {
    const thumb = document.createElement('div');
    thumb.className = `lightbox-thumb ${idx === currentLightboxIndex ? 'active' : ''}`;
    thumb.setAttribute('data-thumb-index', idx);
    thumb.onclick = () => jumpToLightboxImage(idx);
    thumb.innerHTML = `<img src="${imgSrc}" alt="Thumbnail ${idx + 1}" loading="lazy">`;
    thumbsContainer.appendChild(thumb);
  });
}

function updateActiveThumbnail() {
  const thumbs = document.querySelectorAll('.lightbox-thumb');
  thumbs.forEach((thumb, idx) => {
    const isActive = idx === currentLightboxIndex;
    thumb.classList.toggle('active', isActive);
    if (isActive) {
      thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  });
}

function handleTouchSwipe() {
  const swipeThreshold = 45;
  const diff = touchEndX - touchStartX;
  if (Math.abs(diff) > swipeThreshold) {
    if (diff < 0) {
      navigateLightbox(1);
    } else {
      navigateLightbox(-1);
    }
  }
}

function openLightbox(index) {
  if (index < 0 || index >= galleryImages.length) return;
  currentLightboxIndex = index;
  isZoomed = false;

  const modal = document.getElementById('lightbox-modal');
  const imgEl = document.getElementById('lightbox-img');
  const counterEl = document.getElementById('lightbox-counter');
  const imgContainer = document.getElementById('lightbox-img-container');

  if (!modal || !imgEl) return;

  if (imgContainer) {
    imgContainer.classList.remove('zoomed');
  }

  imgEl.src = galleryImages[currentLightboxIndex];
  imgEl.alt = `RM Mathew - Master Photograph ${currentLightboxIndex + 1}`;
  if (counterEl) {
    counterEl.textContent = `Image ${String(currentLightboxIndex + 1).padStart(2, '0')} of ${galleryImages.length}`;
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  updateActiveThumbnail();
  preloadAdjacentImages(currentLightboxIndex);
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function jumpToLightboxImage(index) {
  if (index === currentLightboxIndex) return;
  currentLightboxIndex = index;
  updateLightboxView();
}

function navigateLightbox(direction) {
  currentLightboxIndex += direction;
  if (currentLightboxIndex < 0) {
    currentLightboxIndex = galleryImages.length - 1;
  } else if (currentLightboxIndex >= galleryImages.length) {
    currentLightboxIndex = 0;
  }
  updateLightboxView();
}

function updateLightboxView() {
  isZoomed = false;
  const imgContainer = document.getElementById('lightbox-img-container');
  if (imgContainer) {
    imgContainer.classList.remove('zoomed');
  }

  const imgEl = document.getElementById('lightbox-img');
  const counterEl = document.getElementById('lightbox-counter');

  if (imgEl) {
    imgEl.style.opacity = '0.35';
    imgEl.style.transform = 'scale(0.97)';

    setTimeout(() => {
      imgEl.src = galleryImages[currentLightboxIndex];
      imgEl.alt = `RM Mathew - Master Photograph ${currentLightboxIndex + 1}`;
      imgEl.style.opacity = '1';
      imgEl.style.transform = 'scale(1)';

      if (counterEl) {
        counterEl.textContent = `Image ${String(currentLightboxIndex + 1).padStart(2, '0')} of ${galleryImages.length}`;
      }

      updateActiveThumbnail();
      preloadAdjacentImages(currentLightboxIndex);
    }, 120);
  }
}

function toggleLightboxZoom() {
  const imgContainer = document.getElementById('lightbox-img-container');
  if (imgContainer) {
    isZoomed = !isZoomed;
    imgContainer.classList.toggle('zoomed', isZoomed);
  }
}

function preloadAdjacentImages(currentIndex) {
  const nextIndex = (currentIndex + 1) % galleryImages.length;
  const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;

  const nextImg = new Image();
  nextImg.src = galleryImages[nextIndex];

  const prevImg = new Image();
  prevImg.src = galleryImages[prevIndex];
}

function handleLightboxBackdropClick(event) {
  if (
    event.target.classList.contains('lightbox-body') ||
    event.target.classList.contains('lightbox-img-container')
  ) {
    closeLightbox();
  }
}

/* --------------------------------------------------------------------------
   7. Smooth Scroll Reveals
   -------------------------------------------------------------------------- */
function initScrollReveals() {
  const cards = document.querySelectorAll('.gallery-card');
  if (!cards.length) return;

  if (!('IntersectionObserver' in window)) {
    cards.forEach(card => card.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, (idx % 6) * 50);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -30px 0px'
  });

  cards.forEach(card => {
    observer.observe(card);
  });
}

/* --------------------------------------------------------------------------
   8. Interactive Live Motion Background with Glow
   -------------------------------------------------------------------------- */
function initGalleryMotionBackground() {
  const canvas = document.getElementById('gallery-motion-bg');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let mouseX = width / 2;
  let mouseY = height / 2;
  let targetMouseX = mouseX;
  let targetMouseY = mouseY;

  window.addEventListener('mousemove', (e) => {
    targetMouseX = e.clientX;
    targetMouseY = e.clientY;
  }, { passive: true });

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }, { passive: true });

  // Floating Glowing Orbs definition (Gold, Emerald, Champagne, Deep Jade)
  const glowOrbs = [
    { x: width * 0.2, y: height * 0.25, vx: 0.45, vy: 0.35, radius: 340, color: 'rgba(200, 161, 101, ', baseAlpha: 0.24, pulseSpeed: 0.008, phase: 0 },
    { x: width * 0.8, y: height * 0.3, vx: -0.35, vy: 0.45, radius: 400, color: 'rgba(16, 94, 57, ', baseAlpha: 0.36, pulseSpeed: 0.006, phase: 2.1 },
    { x: width * 0.5, y: height * 0.75, vx: 0.5, vy: -0.4, radius: 360, color: 'rgba(247, 223, 181, ', baseAlpha: 0.2, pulseSpeed: 0.009, phase: 4.2 },
    { x: width * 0.15, y: height * 0.85, vx: -0.3, vy: -0.35, radius: 320, color: 'rgba(7, 44, 26, ', baseAlpha: 0.42, pulseSpeed: 0.007, phase: 1.3 },
  ];

  // Floating ambient glowing particles
  const particleCount = 45;
  const particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: -Math.random() * 0.7 - 0.2,
      size: Math.random() * 3 + 1,
      alpha: Math.random() * 0.6 + 0.25,
      pulse: Math.random() * Math.PI * 2,
      color: Math.random() > 0.4 ? 'rgba(200, 161, 101, ' : 'rgba(247, 223, 181, '
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Smooth mouse lerp
    mouseX += (targetMouseX - mouseX) * 0.04;
    mouseY += (targetMouseY - mouseY) * 0.04;

    // 1. Interactive Cursor Glow Spotlight
    const cursorGlow = ctx.createRadialGradient(mouseX, mouseY, 10, mouseX, mouseY, 420);
    cursorGlow.addColorStop(0, 'rgba(200, 161, 101, 0.16)');
    cursorGlow.addColorStop(0.5, 'rgba(16, 94, 57, 0.09)');
    cursorGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = cursorGlow;
    ctx.fillRect(0, 0, width, height);

    // 2. Render and update Glowing Orbs
    glowOrbs.forEach(orb => {
      orb.x += orb.vx;
      orb.y += orb.vy;

      // Bounce smoothly off boundaries
      if (orb.x < -120 || orb.x > width + 120) orb.vx *= -1;
      if (orb.y < -120 || orb.y > height + 120) orb.vy *= -1;

      orb.phase += orb.pulseSpeed;
      const currentAlpha = orb.baseAlpha + Math.sin(orb.phase) * 0.06;
      const currentRadius = orb.radius + Math.sin(orb.phase * 0.8) * 28;

      const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, currentRadius);
      grad.addColorStop(0, orb.color + currentAlpha + ')');
      grad.addColorStop(0.5, orb.color + (currentAlpha * 0.45) + ')');
      grad.addColorStop(1, orb.color + '0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(orb.x, orb.y, currentRadius, 0, Math.PI * 2);
      ctx.fill();
    });

    // 3. Render and update Floating Light Particles
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.pulse += 0.02;

      // Wrap around screen edge
      if (p.y < -10) p.y = height + 10;
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      const currentAlpha = (p.alpha + Math.sin(p.pulse) * 0.2) * 0.85;

      // Particle halo
      const haloGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3.5);
      haloGrad.addColorStop(0, p.color + currentAlpha + ')');
      haloGrad.addColorStop(1, p.color + '0)');

      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Particle center dot
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(render);
  }

  render();
}

