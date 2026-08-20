// Toggles .scrolled on the nav once the user scrolls past a threshold,
// so the nav flips from transparent-over-hero to solid-on-content.
// Pages without a hero (e.g. project case studies) mark their nav
// data-static="true" and want to stay solid always — skip the toggle
// entirely there rather than letting the initial scroll check strip
// the .scrolled class the page loaded with.

const nav = document.querySelector('.site-nav');
const SCROLL_THRESHOLD = 80; // px scrolled before nav goes solid

function updateNavState() {
  if (window.scrollY > SCROLL_THRESHOLD) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}

if (nav && nav.dataset.static !== 'true') {
  updateNavState(); // handle page loads that start mid-scroll (e.g. anchor links)
  window.addEventListener('scroll', updateNavState, { passive: true });
}
