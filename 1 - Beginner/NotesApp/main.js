//Import our Notes class from our notes.js module.
import Notes from './notes.js';

//Local storage
const noteStorage = window.localStorage;

//Query selectors
const textbox = document.querySelector('#textbox');
const buttons = document.querySelectorAll('button');
const notepad = document.querySelector('#textbox');

//Our notes object
const notes = new Notes(textbox, noteStorage);

//Add event listeners
notepad.addEventListener('input', updateNotes);
buttons.forEach(element => {
  element.addEventListener('click', processButtonClick);
});

/**
 * Updater for our notepad event listener. Will update
 * our Notes object with the content of the notepad.
 */
function updateNotes(){
  notes.storage.setItem('currentNotes', ""+this.value);
  notes.content = notes.storage.getItem('currentNotes');
}

/**
 * Process function for our buttons event listeners. Will send off
 * to appropriate button function. 
 */
function processButtonClick(){
  if(this.id == 'copy-button')
    notes.copy();
  if(this.id == 'download-button')
    notes.download();
  if(this.id == 'clear-button')
    notes.clear();
}