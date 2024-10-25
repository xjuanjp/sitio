export const initInsightsDrag = () => {
  const glide = document.querySelector('#slider-products');

  if (!glide) return;

  // Set glide options for different breakpoints
  const breakpoints = {
    768: { gap: 16, perView: 1 },
    1279: { gap: 30, perView: 1 },
    4000: { gap: 20, perView: 3 },
  };

  // Init glide
  const instance = new Glide('#slider-products > .glide', {
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
