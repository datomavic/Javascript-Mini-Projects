//Import our Notes class from our notes.js module.
import Notes from './Notes.js';

//Local storage
const noteStorage = window.localStorage;

//Notepad counter for setting ID
const counter = { id: 1 };

//Create universal copy of our note widget.
const copy = document.querySelector('#template').cloneNode(true);

//Event listener for subsequent note widgets upon 'Add note' button press.
document.querySelector('#add-button').addEventListener('click', addNote);

//If notestorage is empty, initialize our first notepad and add to storage
if(noteStorage.length == 0){
  //Attach & load an initial Notes widget to our document. Add to localStorage;
  new Notes(document.querySelector('#template'), counter.id, "", noteStorage);
  counter.id++;
}
else{   
  //Remove 'template' from HTML if localStorage has items 
  document.querySelector('#template').remove();
  const container = document.querySelector('#container');

  for(let key of Object.keys(orderedStorage(noteStorage))){
    const clone = copy.cloneNode(true);
    new Notes(clone, key, noteStorage.getItem(key), noteStorage);
    container.appendChild(clone);
    counter.id = key;
  }
  counter.id++;
}

/**
 * Will append a new Notes object (widget) to our document.
 */
function addNote(){
  //If all notepads were deleted and none exist in document, reset our counter.
  if(noteStorage.length == 0)
    counter.id = 0;
  else
    counter.id = lastItem(orderedStorage(noteStorage)) + 1;


  const clone = copy.cloneNode(true);
  const container = document.querySelector('#container');
  const newNote = new Notes(clone, counter.id, "", noteStorage);
  noteStorage.setItem(newNote.element.id, newNote.content);

  /**Animation functions**/

  /**
   * Animation for scrolling to newly added note element
   * @param {Object} element an element to scroll to 
   * @param {Integer} duration duration for scroll animation 
   */
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
  };

  /**
   * Animation function for 'unfading' a new note element in document.
   * @param {Object} element the note element we will add an 'unfade' animation to. 
   */
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
  };

  //Execute unfade function which contains an execution of our smoothScroll function
  unfade(clone);
}

/**
 * Will create a new object of our window.localStorage, but sorted by keys.
 * @param {Object} noteStorage our localStorage that we need to sort
 * @returns {Object} a new object with our localStorage values but sorted.
 */
function orderedStorage(noteStorage){
  return Object.keys(noteStorage).sort().reduce((obj, key) => {
    obj[key] = noteStorage[key];
    return obj;
  }, {});
}

/**
 * Will return the last key # in the passed storage object. 
 * To be used with our counter.id.
 * @param {Object} storage an object representing our localStorage
 * @returns the last key # in our storage object.
 */
function lastItem(storage){
  let last;
  for(let key of Object.keys(storage))
    last = key;
  return +last;
}