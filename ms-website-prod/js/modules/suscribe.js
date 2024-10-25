import {
  getDatabase,
  ref,
  onValue,
} from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js';
import { initFirebase } from './firebase.js';

initFirebase();
const db = getDatabase();
const dopplerRef = ref(db, 'doppler');

let newsletterSubscription;

const formControl = document.getElementById('form-control');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');
const subscriptionForm = document.getElementById('subscription');
const emailInput = document.getElementById('email');

export const subscribe = () => {
  subscriptionForm.onsubmit = (event) => {
    const emailValue = emailInput.value;
    newsletterSubscription(emailValue, subscriptionForm);
    event.preventDefault();
  }
  emailInput.onchange = () => {
    
      if(validateEmail(emailInput.value)) {
        errorMessage.classList.add('none');
        formControl.classList.remove('error')
      } else {
        errorMessage.innerHTML = 'Please enter valid email address.';
        errorMessage.classList.remove('none');
        formControl.classList.add('error')
        successMessage.classList.add('none');
      }
    }
  
}


const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

onValue(dopplerRef, (snapshot) => {
  const data = snapshot.val();
  newsletterSubscription = async (email, form) => {

    if(email != ''){
      if(validateEmail(email)){
        form.classList.add('loading')
        try {
          const response = await fetch(
            // TODO: update template
            `https://restapi.fromdoppler.com/accounts/`+ data.account_name +`/lists/`+ data.list_id +`/subscribers/doble-optin/277?api_key=`+ data.api_key,
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ name:'NA',email: email }),
            }
          )
          if (!response.ok) {
            form.classList.remove('loading');
            errorMessage.innerHTML = 'Something went wrong, please try again.';
            errorMessage.classList.remove('none');
            formControl.classList.add('error')
            throw new Error(`Error! status: ${response.status}`);
          }
          const result = await response.json();
          form.classList.remove('loading')
          successMessage.classList.remove('none');
          successMessage.innerHTML =  '<span class="title"><i class="icon-ic-check"></i>Thanks for Subscribing</span>' +
                                      '<span class="message">We’ve emailed '+ email +' to confirm your email. Don’t see our email? Check your spam/junk folder.</span>'
          return result;
        } catch (err) {
          console.log(err);
          form.classList.remove('loading')
        }
      } else {
        errorMessage.innerHTML = 'Please enter valid email address.';
        errorMessage.classList.remove('none');
        formControl.classList.add('error')
      }
    } else {
      errorMessage.innerHTML = 'This field is required.';
      errorMessage.classList.remove('none');
      formControl.classList.add('error')
    }
  }
});

export { newsletterSubscription };