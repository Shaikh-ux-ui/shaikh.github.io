// Toggles .scrolled on the nav once the user scrolls past a threshold,
// so the nav flips from transparent-over-hero to solid-on-content.

const nav = document.querySelector('.site-nav');
const SCROLL_THRESHOLD = 80; // px scrolled before nav goes solid

function updateNavState() {
  if (window.scrollY > SCROLL_THRESHOLD) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}

if (nav) {
  updateNavState(); // handle page loads that start mid-scroll (e.g. anchor links)
  window.addEventListener('scroll', updateNavState, { passive: true });
}
