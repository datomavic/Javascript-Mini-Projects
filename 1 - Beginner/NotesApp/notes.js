export default class Notes{

  /**
   * @constructor
   * @param {Object} element is a new document element for a newly created Notes object 
   * @param {Object} storage is the browser's localStorage object
   * @param {Object} counter a simple Global object containing only a counter to be incremented
   */
  constructor(element, id, content, storage){
    this.element = element;
    //Add ID to element based on counter
    this.element.id = id;
    this.element.querySelector('.notepadID').innerText = this.element.id;
    //Add event listener for this Notes buttons
    this.element.querySelectorAll('button').forEach((button) => {
      const type = ""+button.className.split(" ")[0];
      switch(type){
        case 'copy-button':
          button.addEventListener('click', this.copy.bind(this));
          break;
        case 'clear-button':
          button.addEventListener('click', this.clear.bind(this));
          break;
        case 'download-button':
          button.addEventListener('click', this.download.bind(this));
          break;
      }
    });

    this.content = content;

    //Update window.localStorage and set its value to content of this Notes
    this.storage = storage; 
    this.storage.setItem(this.element.id, this.content);

    //Query selector to grab the <textarea> element from this.element
    this.textbox = this.element.querySelector('.textbox');
    //Add event listener for this Notes textbox (<textarea>)
    this.textbox.addEventListener('input', this.update.bind(this));
    if(this.content){
      this.textbox.innerText = this.content;
    }
    //Boolean for copy() function. Prevents copy animation from running if it's already currently running.
    this.copyRunning = false;
  }

  /**
   * @memberof Notes
   * Updates our content whenever something is typed into this 
   * notes textbox.
   */
  update(){
    this.content = this.textbox.value;
    this.storage.setItem(this.element.id, this.content);
  }
  /**
   * @memberof Notes
   * Will copy the content of the note object to the users clipboard.
   */
  copy(){
    if(!this.content || this.copyRunning)
      return;
    this.copyRunning = true;
    //Function property to avoid code from executing twice asynchronously
    //Element selectors for copy-button icons
    let icon = this.element.querySelector(".copy-icon");
    let button = this.element.querySelector(".copy-button");
    let text = document.createElement("p");
    text.style.marginBottom = "0";
    text.style.color = "#3a3a3a";
    text.style.display = "none";
    text.style.fontWeight = 'bold';
    text.style.fontSize = '20px';
    text.style.margin = '0px';
    text.innerText = "Copied!";
    button.appendChild(text);

    //Copy output value to clipboard
    navigator.clipboard.writeText(""+this.content);
    //Fade in transition for element
    let fade = function(element){
      var op = 1;  // initial opacity
      var timer = setInterval(function () {
          if (op <= 0.1){
              clearInterval(timer);
              element.style.display = "none";
          }
          element.style.opacity = op;
          element.style.filter = 'alpha(opacity=' + op * 100 + ")";
          op -= op * 0.1;
      }, 3);
    }
    
    //Fade out transition for element
    let unfade = function(element){
      let op = 0.1;  // initial opacity
      element.style.display = 'block';
      let timer = setInterval(function () {
          if (op >= 1){
            clearInterval(timer);
          }
          element.style.opacity = op;
          element.style.filter = 'alpha(opacity=' + op * 100 + ")";
          op += op * 0.1;
      }, 2);
  }

  //Fade out copy icon, begin fading in 'Copied!'
  fade(icon);

  setTimeout(() => {
    unfade(text);
  }, 355);

  setTimeout(() => {
    fade(text);
  }, 1500);

  setTimeout(() => {
    unfade(icon);
    //Once this asynchronous call is done, set copy.running to false.
    this.copyRunning = false;
  }, 1800);
  }

  /**
   * @memberof Notes
   * Will clear the content of the notes object.
   */
  clear(){
    let fade = function(element){
      let op = 1;  // initial opacity
      let timer = setInterval(function () {
          if (op <= 0.1){
              clearInterval(timer);
              element.style.display = "none";
              element.remove();
          }
          element.style.opacity = op;
          element.style.filter = 'alpha(opacity=' + op * 100 + ")";
          op -= op * 0.1;
      }, 6);
    }

    fade(this.element);
    this.storage.removeItem(this.element.id);
  }

  /**
   * @memberof Notes
   * Will download the content of the notes object as a .txt file
   */
  download(){
    //if no content, return.
    if(!this.content)
      return;

    //Create a blob attached to file and anchor tag 'under-the-hood', and click it upon download button press
    const type = '.txt;charset=utf-8';
    const fileName = 'notes.txt';
    const blob = new Blob([this.content], {type});
    const anchor = document.createElement('a');
    const url = URL.createObjectURL(blob);
    anchor.href = url;
    anchor.download = fileName;
    document.body.append(anchor);

  //If user selects "yes", click the anchor tag under-the-hood.
  if(confirm("Are you sure you'd like to download your notes as a .txt file?"))
    anchor.click();

  }

  toString(){
    return ""+this.content;
  }
}