const accordion = document.getElementsByClassName('accordion');

for (let i = 0; i < accordion.length; i++) {
  if(i === 0) {
    const details =  accordion[0].nextElementSibling

    accordion[0].classList.add('active')
    details.style.maxHeight = details.scrollHeight + 'px';

    console.log(details.style.scrollHeight)
  }

  accordion[i].addEventListener('click', function () {
    this.classList.toggle('active');
    const details = this.nextElementSibling;
    if (details.style.maxHeight) {
      details.style.maxHeight = null;
    } else {
      details.style.maxHeight = details.scrollHeight + 'px';
    }
  });
}
