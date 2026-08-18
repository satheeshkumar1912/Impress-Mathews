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
    desc: "Supporting schools, students, and educational initiatives to encourage learning and long-term development."
  },
  {
    title: "Community Growth",
    desc: "Contributing to religious institutions, community programs, and social welfare initiatives."
  },
  {
    title: "Sustainability",
    desc: "Creating sustainable career opportunities while nurturing talent and professional growth."
  },
  // {
  //   title: "Entrepreneurship Mentorship",
  //   desc: "Guiding aspiring entrepreneurs with strategic execution frameworks, resilience training, and business advice."
  // }
];

let currentCardIndex = 0;

function navigateCard(direction) {
  currentCardIndex += direction;
  if (currentCardIndex < 0) {
    currentCardIndex = impactCards.length - 1;
  } else if (currentCardIndex >= impactCards.length) {
    currentCardIndex = 0;
  }

  const titleEl = document.getElementById('card-title');
  const descEl = document.getElementById('card-desc');
  const cardBox = document.getElementById('impact-card-display');

  if (titleEl && descEl && cardBox) {
    // Subtle fade effect during slide change
    cardBox.style.opacity = '0';
    cardBox.style.transform = 'translateY(6px)';
    cardBox.style.transition = 'all 0.2s ease';

    setTimeout(() => {
      titleEl.textContent = impactCards[currentCardIndex].title;
      descEl.textContent = impactCards[currentCardIndex].desc;
      cardBox.style.opacity = '1';
      cardBox.style.transform = 'translateY(0)';
    }, 200);
  }
}


