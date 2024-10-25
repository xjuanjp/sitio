import { initTestimonialsDrag } from './modules/testimonials.js';
import { initInsightsDrag } from './modules/insights-slider.js';
import { scroll } from './modules/scroll.js';
import { initCasesSlider } from './modules/cases.js';
import { initProgressSlider } from './modules/progress-slider.js';
import { setStickyHeader, triggerMobileMenu } from './modules/headers.js';
import { cloneGallery } from './modules/gallery.js';
import { subscribe } from './modules/suscribe.js';
import { initFirebase } from './modules/firebase.js';
import { cloneWords } from './modules/words.js';
import { cookieConsent } from './modules/cookie-consent.js';
import { responsiveVideo } from './modules/hero.js';

initTestimonialsDrag();
initInsightsDrag();
initCasesSlider();
initProgressSlider();
setStickyHeader();
triggerMobileMenu();
cloneGallery();
initFirebase();
subscribe();
cloneWords();
const body = document.querySelector('body')

window.addEventListener('load', () => {
  const images = document.querySelectorAll('img');
  const allImages = Array.from(images);
  const imgsAreTrue = allImages.every((img) => img.complete);
  const imgsHaveFullHeight = allImages.every((img) => img.naturalHeight !== 0);
  if(body.classList.contains('home')) {
    responsiveVideo()
  }
  if (imgsAreTrue || imgsHaveFullHeight) {
    scroll.update();
    console.log('Is full loaded');
  }
});

function debounce(func, time){
  var time = time || 100; // 100 by default if no param
  var timer;
  return function(event){
      if(timer) clearTimeout(timer);
      timer = setTimeout(func, time, event);
  };
}

window.addEventListener("resize", debounce( () => {
  if(body.classList.contains('home')) {
    responsiveVideo();
  }
}, 150 ));
