//Import our Notes class from our notes.js module.
import Notes from './notes.js';

//Note widget counter for ID
let counter = {
  id: 0
};


//Local storage & Create copy of note widget
const noteStorage = window.localStorage;
const noteWidget = document.querySelector('.notes-wrapper');
const copy = noteWidget.cloneNode(true);

//Load initial note widget:
new Notes(noteWidget, noteStorage, counter);

document.querySelector('#add-button').addEventListener('click', () => {
  const clone = copy.cloneNode(true);
  const container = document.querySelector('#container');
  new Notes(clone, noteStorage, counter);

  const scroll= (element, duration) => {
    const yPosition = window.pageYOffset + document.getElementById(element.id).getBoundingClientRect().top;
    const startingY = window.pageYOffset;
    const diff = yPosition - startingY;
    let start;

    window.requestAnimationFrame(function step(timestamp){
      if(!start) 
        start = timestamp;
      let time = timestamp - start;
      let percent = Math.min(time / duration, 1);
      

      console.log(startingY + diff * percent);
      window.scrollTo(0, startingY + diff * percent);

      if(time < duration)
        window.requestAnimationFrame(step);
    })
  }

  const unfade = (element) => {
    container.appendChild(element);
    scroll(element, 300);
    let op = 0.1;  // initial opacity
    let timer = setInterval(function () {
        if (op >= 1){
          clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 21);
  }

  unfade(clone);
  
});
//Query selectors
// const buttons = document.querySelectorAll('button');
// const notepad = document.querySelector('.textbox');

//Our notes object
//const notes = new Notes(notepad, noteStorage);

//Add event listeners
// notepad.addEventListener('input', updateNotes);
// buttons.forEach(element => {
//   element.addEventListener('click', processButtonClick);
// });

// for(let i = 0; i < 5; i++){
// const element = document.querySelector('.notes-wrapper');
// const newElement = element.cloneNode(true);
// const container = document.querySelector('#container');
// container.appendChild(newElement);
// }



/**
 * Updater for our notepad event listener. Will update
 * our Notes object with the content of the notepad.
 */
// function updateNotes(){
//   notes.storage.setItem('currentNotes', ""+this.value);
//   notes.content = notes.storage.getItem('currentNotes');
// }

/**
 * Process function for our buttons event listeners. Will send off
 * to appropriate button function. 
 */
// function processButtonClick(){
//   const type = ""+this.className.split(" ")[0];
//   switch(type){
//     case 'copy-button':
//       notes.copy();
//       break;
//     case 'clear-button':
//       notes.clear();
//       break;
//     case 'download-button':
//       notes.download();
//       break;
//   }
// }