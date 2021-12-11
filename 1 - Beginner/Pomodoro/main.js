import PomodoroGrid from './PomodoroGrid.js';

const gridContainer = document.querySelector('#grid-container');
const grid = new PomodoroGrid(gridContainer, 240);


// let copy = gridContainer.querySelector('.box');
// for(let i = 0; i < 2400; i++){  
//   gridContainer.appendChild(copy.cloneNode(true));
// }