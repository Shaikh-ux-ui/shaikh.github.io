// Builds a table of contents from every h2 inside .case-study-content,
// so it stays in sync automatically even as sections are added, removed,
// or renamed per project — no manual TOC editing required.

const toc = document.getElementById('toc');
const headings = document.querySelectorAll('.case-study-content h2');

if (toc && headings.length > 0) {

  headings.forEach((heading, index) => {
    // Give each heading a stable id to link to, if it doesn't have one
    if (!heading.id) {
      const slug = heading.textContent
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      heading.id = slug || `section-${index}`;
    }

    const link = document.createElement('a');
    link.href = `#${heading.id}`;
    link.setAttribute('aria-label', heading.textContent);

    const dot = document.createElement('span');
    dot.className = 'toc-dot';
    dot.setAttribute('aria-hidden', 'true');

    const label = document.createElement('span');
    label.className = 'toc-label';
    label.textContent = heading.textContent;

    link.appendChild(dot);
    link.appendChild(label);
    toc.appendChild(link);
  });

  // Highlight the current section as the user scrolls past it
  const tocLinks = toc.querySelectorAll('a');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = toc.querySelector(`a[href="#${entry.target.id}"]`);
        if (!link) return;
        if (entry.isIntersecting) {
          tocLinks.forEach((l) => l.classList.remove('active'));
          link.classList.add('active');
        }
      });
    },
    { rootMargin: '-40% 0px -50% 0px' } // triggers when a heading crosses the middle of the viewport
  );

  headings.forEach((heading) => observer.observe(heading));
}
