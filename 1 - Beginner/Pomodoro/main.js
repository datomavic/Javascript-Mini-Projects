import PomodoroGrid from './PomodoroGrid.js';

let gridContainer = document.querySelector('#grid-container');
let copy = gridContainer.querySelector('.box');
for(let i = 0; i < 2400; i++){  
  gridContainer.appendChild(copy.cloneNode(true));
}