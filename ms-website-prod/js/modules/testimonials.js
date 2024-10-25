export const initTestimonialsDrag = () => {
  const glide = document.querySelector('.testimonials > .glide');

  if (!glide) return;

  // Set event listeners to change cursors
  const setCursorStyle = (cursorType) => (glide.style.cursor = cursorType);

  glide.addEventListener('mouseenter', () => setCursorStyle('grab'));
  glide.addEventListener('mouseleave', () => setCursorStyle('default'));
  glide.addEventListener('mousedown', () => setCursorStyle('grabbing'));
  glide.addEventListener('mouseup', () => setCursorStyle('grab'));

  // Set glide options for different breakpoints
  const breakpoints = {
    414: { peek: 16, gap: 16, perView: 1 },
    768: { peek: 40, gap: 16, perView: 1 },
    1024: { peek: 100, gap: 24, perView: 1 },
    1280: { peek: 260, gap: 30, perView: 1 },
    1440: { peek: 320, gap: 30, perView: 1 },
    1600: { peek: 380, gap: 30, perView: 1 },
    1920: { peek: 500, gap: 30, perView: 1 }, // en este bkp me aparecen 3 en lugar de 1
    2560: { peek: 700, gap: 30, perView: 1 },
    3440: { peek: 700, gap: 60, perView: 1 },
    4000: { peek: 800, gap: 60, perView: 1 },
  };

  // Init glide
  const instance = new Glide('.testimonials > .glide', {
    type: 'carousel',
    startAt: 0,
    breakpoints: breakpoints,
  }).mount();

  // Disable scroll
  const html = document.querySelector('html');

  instance.on('swipe.move', () => {
    html.classList.add('stop-scroll');
  });

  instance.on('swipe.end', () => {
    html.classList.remove('stop-scroll');
  });
};
