//Our notes object
let notes = new Notes();

//Query selectors
let buttons = document.querySelectorAll('button');
let notepad = document.querySelector('#textbox');

//Add event listeners
buttons.forEach(element => {
  element.addEventListener('click', processButtonClick);
});
notepad.addEventListener('input', updateNotes);

/**
 * Process function for our notepad event listener. Will update
 * our Notes object with the content of the notepad.
 */
function updateNotes(){
  notes.content = ""+this.value;
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