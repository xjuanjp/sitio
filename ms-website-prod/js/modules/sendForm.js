import {
    getDatabase,
    ref,
    onValue,
  } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js';
  import { initFirebase } from './firebase.js';
  
  initFirebase();
  const db = getDatabase();
  const relayRef = ref(db, 'relay');

  let sendForm;

  onValue(relayRef, (snapshot) => {
    const data = snapshot.val();
    sendForm = async(messageBody, form) => {
        form.classList.add('loading')
        try {
            const response = await fetch(
            `https://api.dopplerrelay.com/accounts/`+ data.account_id +`/messages?api_key=`+ data.api_key,
            {
                method: "POST",
                headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "from_name": "Web Contact Form",
                    "from_email": "hello@makingsense.com",
                    "messageId": "web",
                    "subject": "Contact from web",
                    "html": messageBody,
                    "recipients": [
                        {
                        "email": "marketing@makingsense.com",
                        "name": "Making Sense",
                        "type": "to"
                        }
                    ],
                }),
            }
            )
            if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
            }
            const result = await response.json();
            form.classList.remove('loading')
            form.classList.add('none');
            document.getElementById('form-success').classList.remove('none');
            return result;
        } catch (err) {
            console.log(err);
        }
    }    
});

export { sendForm };