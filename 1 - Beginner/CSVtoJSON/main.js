//Input and output textarea
let input = document.querySelector("#input-content");
let output = document.querySelector("#output-content");
//Booleans to keep track of current data type
let isCSV;
let isJSON;
//Add event listener to every button
document.querySelectorAll("button").forEach((element) => {
  element.addEventListener("click", onClickProcess);
});

/**
 * onClickProcess
 * ----------------
 * Function for processing our onClick events.
 * Sends off to appropriate function to execute.
 */
function onClickProcess(){
  //Execute function in global environment by id's first word.
  window[this.id.split("-")[0]]();
}

function upload(){
}

/**
 * convert
 * -------
 * Function for convert button. Will convert input data into
 * either JSON or CSV depending on detected type.
 */
function convert(){
  isCSV = false;
  isJSON = false;
  let content = input.value;

  if(content.length == 0)
    return;

  if(content[0] == "{" || content[0] == "[")
    isJSON = true;
  else
    isCSV = true;
  
  if(isCSV)
    csvToJson(content);
  if(isJSON)
    jsonToCsv(content);
}

/**
 * csvToJson
 * ---------
 * Will convert a string in csv format into JSON format
 * @param {string} content - a string in .csv format to be converted to JSON
 */
function csvToJson(content){
  const quoteChar = `"`;
  const delimiter = `,`;
  const regex = new RegExp(`\\s*(${quoteChar})?(.*?)\\1\\s*(?:${delimiter}|$)`, 'gs');
  const match = content => [...content.matchAll(regex)].map(match => match[2])
    .filter((_, i, a) => i < a.length - 1); // cut off blank match at end

  const lines = content.split('\n');
  const heads = match(lines.splice(0, 1)[0]);

  let json = lines.map(line => match(line).reduce((acc, cur, i) => ({
    ...acc,
    [heads[i] || `extra_${i}`]: (cur.length > 0) ? (Number(cur) || cur) : null
  }), {}));

  let outputText = JSON.stringify(json, null, 1);
  output.innerText = outputText;
}

function jsonToCsv(content){

}

function download(){

}

function copy(){

}

/**
 * displayToOutput
 * ---------------
 * Takes a string of data and displays it to page's output window.
 * @param {string} data - a string containing our data that we will output
 */
function displayToOutput(data){

}