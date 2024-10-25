import { scroll } from '../modules/scroll.js';
import { sendForm } from '../modules/sendForm.js';

const form = document.getElementById('form-contact');
const submitBtn = document.getElementById('form-submit');
let inputs = 0;

const showErrors = (arrayOfelement) =>
  arrayOfelement.forEach((el) => el.classList.add('show-text'));
const removeErrors = (arrayOfelement) =>
  arrayOfelement.forEach((el) => el.classList.remove('show-text'));

const checkAndRemoveStyleErrors = (input) => {
  if (input.value !== '' && input.value !== null && input.validity.valid) {
    removeErrors([input]);
    inputs++;
  }
  return;
};

function validateForm(e) {
  let isValid = false;
  inputs = 0;
  const inName = e.target[0];
  const inEmail = e.target[1];
  const inNumber = e.target[2];
  showErrors([inName, inEmail, inNumber]);

  checkAndRemoveStyleErrors(inName);
  checkAndRemoveStyleErrors(inEmail);
  checkAndRemoveStyleErrors(inNumber);

  if (inputs == 3) {
    isValid = true;
  }

  return isValid;
}

// To Listent if the user is filling any input and disabled the submit button
form.addEventListener('focusout', (e) => {
  inputs = 0;
  const inName = e.target.form[0];
  const inEmail = e.target.form[1];
  const inNumber = e.target.form[2];
  checkAndRemoveStyleErrors(inName);
  checkAndRemoveStyleErrors(inEmail);
  checkAndRemoveStyleErrors(inNumber);
});

const createMessageBody = (fullName, email, phone, message) => {  
  return (
    '<ul>' +
      '<li>Name: '+ fullName +'</li>' +
      '<li>Email: '+ email +'</li>' +
      '<li>Phone: '+ phone +'</li>' +
      '<li>Message: '+ message +'</li>' + 
    '</ul>'
  );
};


// To Listent the submit and validate all inputs
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (validateForm(e)) {
    const fullName = document.getElementById('fname').value;
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('phnum').value;
    const message = document.getElementById('msg').value;
    const messageBody = createMessageBody(fullName, email, phoneNumber, message)
    sendForm(messageBody, form);
    scroll.update(); // To solve the blank space in the bottom of the footer

    // This line should be uncomment once we decide how to deliver the Form Data.
    //setTimeout(() => form.submit(), 3000);
  }
});
