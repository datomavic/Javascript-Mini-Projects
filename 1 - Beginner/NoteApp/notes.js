class Notes{
  #content;
  #prev;
  textbox;

  constructor(textbox){
    this.#content = null;
    this.#prev = null;
    this.textbox = textbox;
  }

  /**
   * @memberof Notes
   * Will copy the content of the note object to the users clipboard.
   */
  copy(){
    if(!this.#content || this.copy.running)
      return;
    //Function property to avoid code from executing twice asynchronously
    this.copy.running = true;
    console.log(this.copy.running);
    //Element selectors for copy-button icons
    let icon = document.querySelector("#copy-icon");
    let button = document.querySelector("#copy-button");
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
    navigator.clipboard.writeText(""+this.#content);
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
      var op = 0.1;  // initial opacity
      element.style.display = 'block';
      var timer = setInterval(function () {
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
    this.copy.running = false;
  }, 1800);
  }

  /**
   * @memberof Notes
   * Will clear the content of the notes object.
   */
  clear(){
    this.#prev = this.#content;
    this.textbox.value = "";
    this.#content = "";
  }

  /**
   * @memberof Notes
   * Will undo the previous clear function in case user accidentally
   * clicks clear button.
   */
  undo(){
    if(!this.#prev)
      return;
    this.#content = this.#prev;
    this.textbox.value = this.#content;
  }

  /**
   * @memberof Notes
   * Will download the content of the notes object as a .txt file
   */
  download(){
    //if no content, return.
    if(!this.#content)
      return;

    //Create a blob attached to file and anchor tag 'under-the-hood', and click it upon download button press
    const type = '.txt;charset=utf-8';
    const fileName = 'notes.txt';
    const blob = new Blob([this.#content], {type});
    const anchor = document.createElement('a');
    const url = URL.createObjectURL(blob);
    anchor.href = url;
    anchor.download = fileName;
    document.body.append(anchor);

  //If user selects "yes", click the anchor tag under-the-hood.
  if(confirm("Are you sure you'd like to download your notes as a .txt file?"))
    anchor.click();

  }

  /**
   * @memberof Notes
   * This is a getter for our #content field, the text within our
   * notes object. 
   * @return {String} a string of our this Notes #content.
   */
  get content(){
    return this.#content;
  }

  /**
   * @memberof Notes
   * This is a setter for our #content field.
   * @param {String} data - a string to be set to this Notes
   * #content field.
   */
  set content(data){
    this.#content = data;
  }

  toString(){
    return ""+this.#content;
  }
}