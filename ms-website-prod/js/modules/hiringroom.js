import { scroll } from './scroll.js';
import {
  getDatabase,
  ref,
  onValue,
} from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js';

const REQUIREMENTS_TEXT_LENGTH = 160;

const db = getDatabase();
const loginRef = ref(db, 'login');
onValue(loginRef, (snapshot) => {
  const data = snapshot.val();
  async function getVacancies() {
    const response = await fetch('https://api.hiringroom.com/v0/authenticate/login/users', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data),
    });
    const token = await response.json();

    const vacanciesResponse = await fetch(
      'https://api.hiringroom.com/v0/vacancies?listStatus=activa&resp=json&page=0&pageSize=-1&token=' +
        token.token
    );
    const vacancies = await vacanciesResponse.json();
    const vacanciesList = [];
    vacancies.vacantes
      .filter(
        (vacancy) =>
          vacancy.area &&
          vacancy.area.nombre === 'Servicios' &&
          vacancy.publicada === 'si' &&
          vacancy.tags == 'hiring'
      )
      .forEach((vacancy) => {
        const vacancyData = {
          id: vacancy.id,
          name: vacancy.nombre,
          area: vacancy.area.nombre,
          jobModality: vacancy.modalidadTrabajo,
          requirements: getRequirements(vacancy.requisitos),
          tags: vacancy.tags,
          url: `https://makingsense.hiringroom.com/jobs/get_vacancy/${vacancy.id}`,
        };
        vacanciesList.push(vacancyData);
      });

    const container = document.getElementById('positions-wrapper');

    container.innerHTML = vacanciesList
      .map((vacancy) => {
        return `<div class="card-position"> 
            <div class="card-position__left">
              <h3 class="card-position__title">${vacancy.name}</h3>
              <div class="card-position__mode">${vacancy.jobModality}</div>
            </div>
            <div class="card-position__icon-wrapper">
              <img src="./assets/svgs/footer-right-arrow.svg" alt="" />
            </div>
            <div class="card-position__rigth">
              <p class="card-position__description">${vacancy.requirements}</p>
              <div class="arrow-link">
                <a class="arrow-link__anchor" href="${vacancy.url}" target="_blank">Apply now</a>
                <div class="arrow-link__icon-wrapper">
                  <i class="arrow-link__icon icon-ic-right_arrow"></i>
                </div>
              </div>
            </div>
          </div>  
      `;
      })
      .join('');

    scroll.update();
  }

  getVacancies();
});

const getRequirements = (requirements) => {
  let requirementsList = requirements
    .replace(/<strong>.*?<\/strong>:|<strong>.*?<\/strong>|<p\s.*?>.*?<\/p>/gim, '')
    .split(/<li>|●&nbsp;|<br \/>/);
  let requirementsText = '';
  const cleanText = (element, index) => {
    element = element
      .replace(/&nbsp;&nbsp;/gim, '')
      .replace(/&nbsp;/gim, ' ')
      .replace(/<[^>]*>|\n|\t|●/gim, '')
      .trim();
    if (element != '') {
      if (requirementsText.length < REQUIREMENTS_TEXT_LENGTH) {
        requirementsText += element;
        let lastChar = element.substr(-1);
        if (lastChar != '.' && lastChar != ':') {
          requirementsText += '. ';
        } else {
          requirementsText += ' ';
        }
      }
    }
  };
  requirementsList.forEach(cleanText);
  return requirementsText;
};
