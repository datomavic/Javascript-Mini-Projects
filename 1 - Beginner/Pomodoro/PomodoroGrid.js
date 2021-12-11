export default class PomodoroGrid{
  /**
   * @memberof PomodoroGrid
   * @param {Object} container - Grid's container DOM element 
   * @param {Integer} size - the size of our PomodoroGrid 
   */
  constructor(container, size){
    //Constructor fields
    this.container = container;
    this.size = size;
    //Additional fields for our grid class.
    this.pomArray;
    this.counter;
    //Initialize our grid with these fields/properties.
    this.initialize.call(this);
  }

  /**
   * Will initialize a new grid on the document based on the current this.size. Will set this.counter to 0.
   * @memberof PomodoroGrid
   */
  initialize(){
    this.pomArray = [];
    this.counter = 0;
    while(this.container.firstChild)
      this.container.removeChild(this.container.firstChild);
    const boxElement = document.createElement('div');
    boxElement.className = 'box';
    for(let i = 0; i < this.size; i++){
      const clone = boxElement.cloneNode(true);
      clone.id = i;
      this.container.appendChild(clone);
      this.pomArray.push(false);
    }
  }

  /**
   * This will add a new tomato to our grid.
   * @memberof PomodoroGrid 
   */
  addTomato(){
    const tomato = document.createElement('img');
    tomato.src = './tomato.png';
    document.getElementById(this.counter).appendChild(tomato);
    this.pomArray[this.counter] = true;
    this.counter++;
    console.log(this.pomArray);
  }

  /**
   * When called, will re-initialize the size of the Pomodoro Grid.
   * @memberof PomodoroGrid
   * @param Integer size - size of grid
   */
  setSize(size){
    this.size = size;
    this.initialize.call(this);
  }
}