export const cloneWords = () => {
  const wordsUl = document.querySelectorAll('.marquee .marquee__content');

  if (!wordsUl) return;
  
  wordsUl.forEach((word) => {
    let wordsClone = word.cloneNode(true);
    
    word.after(wordsClone);
    wordsClone = word.cloneNode(true);
    word.after(wordsClone);
    wordsClone = word.cloneNode(true);
    word.after(wordsClone);
  })
};