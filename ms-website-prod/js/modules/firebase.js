import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-analytics.js';

const firebaseConfig = {
    apiKey: 'AIzaSyBCuGIRl2ujlhWLum1lXftatm8mMpgLJBw',
    authDomain: 'ms-website-3652d.firebaseapp.com',
    projectId: 'ms-website-3652d',
    storageBucket: 'ms-website-3652d.appspot.com',
    messagingSenderId: '598790738561',
    appId: '1:598790738561:web:5189866ee4b5410837f380',
    measurementId: 'G-JKRWQT742E',
    databaseURL: 'https://ms-website-3652d-default-rtdb.firebaseio.com/',
  };

export const initFirebase = () => {
  const app = initializeApp(firebaseConfig);
}
  
  export const initAnalytics = (cookieconsent) => {
    if (cookieconsent.allowedCategory('analytics')) {
      cookieconsent.loadScript('./js/lib/cookieconsent.js', function () {
        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app);
      });
    }
}