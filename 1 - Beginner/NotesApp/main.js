//Import our Notes class from our notes.js module.
import Notes from './notes.js';

//Note widget counter for ID
const counter = {
  id: 0
};

//Local storage & Create universal copy of our note widget.
const noteStorage = window.localStorage;
const copy = document.querySelector('.notes-wrapper').cloneNode(true);

//Load initial note widget:
new Notes(document.querySelector('.notes-wrapper'), noteStorage, counter);

//Event listener for subsequent note widgets upon 'Add note' button press.
document.querySelector('#add-button').addEventListener('click', () => {
  //If all notepads were deleted and none exist in document, reset our counter.
  if(!document.querySelector('.notes-wrapper'))
    counter.id = 0;
  const clone = copy.cloneNode(true);
  const container = document.querySelector('#container');
  new Notes(clone, noteStorage, counter);

  //Scroll animation function. Will scroll to newly created notepad
  const smoothScroll = (element, duration) => {
    const yPosition = window.pageYOffset + document.getElementById(element.id).getBoundingClientRect().top;
    const startingY = window.pageYOffset;
    const diff = yPosition - startingY;
    let start;
    window.requestAnimationFrame(function step(timestamp){
      if(!start) 
        start = timestamp;
      let time = timestamp - start;
      let percent = Math.min(time / duration, 1);
      window.scrollTo(0, startingY + diff * percent);
      if(time < duration)
        window.requestAnimationFrame(step);
    })
  }

  //Unfade animation. Will cause new notepad to fade into the document
  const unfade = (element) => {
    container.appendChild(element);
    //Scroll down to the new notepad element
    smoothScroll(element, 300);
    let op = 0.1;  // initial opacity
    let timer = setInterval(function () {
        if (op >= 1)
          clearInterval(timer);
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 21);
  }

  //Execute unfade function which contains an execution of our smoothScroll function
  unfade(clone);
});