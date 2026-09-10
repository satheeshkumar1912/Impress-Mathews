/* ==========================================================================
   Mathew Personal Portfolio - Interactive Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', initMarquee);

/* --------------------------------------------------------------------------
   1. Seamless Infinite Marquee Cloning
   -------------------------------------------------------------------------- */
function initMarquee() {
  const track = document.getElementById('marquee-track');
  if (!track) return;

  // Duplicate 4 items once (8 items total) so 5 items are visible at a glance
  const items = Array.from(track.children);
  items.forEach(item => {
    const clone = item.cloneNode(true);
    track.appendChild(clone);
  });
}

/* --------------------------------------------------------------------------
   2. Interactive Impact Cards Carousel
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


