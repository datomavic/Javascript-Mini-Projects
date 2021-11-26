class Notes{
  #content;

  constructor(){
    this.#content = null;
  }

  /**
   * @memberof Notes
   * Will copy the content of the note object to the users clipboard.
   */
  copy(){

  }

  /**
   * @memberof Notes
   * Will clear the content of the notes object.
   */
  clear(){

  }

  /**
   * @memberof Notes
   * Will save the content of the notes object as a .txt file
   */
  save(){

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
}