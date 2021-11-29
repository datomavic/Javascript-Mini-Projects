//Import our Notes class from our notes.js module.
import Notes from './notes.js';

//Note widget counter for ID
let counter = 1;

//Local storage & Note widget HTML
const noteStorage = window.localStorage;
const noteClone = document.querySelector('.notes-wrapper').cloneNode(true);

//Initial note widget initialization
const notes1 = new Notes(document.querySelector('.notes-wrapper'), noteStorage);
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