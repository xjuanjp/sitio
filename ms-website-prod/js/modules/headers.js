import { scroll } from './scroll.js';

export const setStickyHeader = () => {
  const header = document.querySelector('#header');
  const isMobile = window.innerWidth < 768;
  const yOffset = 100;

  if (isMobile) {
    document.addEventListener('scroll', () => {
      window.scrollY > yOffset
        ? header.classList.add('header--sticky')
        : header.classList.remove('header--sticky');
    });
  } else {
    scroll.on('scroll', ({ scroll }) => {
      const { y } = scroll;
      y > yOffset
        ? header.classList.add('header--sticky')
        : header.classList.remove('header--sticky');
    });
  }
};

export const triggerMobileMenu = () => {
  const triggerIn = document.getElementById('mobile-menu-trigger-in');
  const triggerOut = document.getElementById('mobile-menu-trigger-out');
  const menu = document.getElementById('__overlays');
  const body = document.getElementsByTagName('body');

  triggerIn.addEventListener('click', () => {
    menu.classList.add('slide-from-right');
    menu.classList.remove('slide-to-right');
    body[0].style.overflow = 'hidden';
  });

  triggerOut.addEventListener('click', () => {
    menu.classList.remove('slide-from-right');
    menu.classList.add('slide-to-right');
    body[0].style.overflow = 'initial';
  });
};
