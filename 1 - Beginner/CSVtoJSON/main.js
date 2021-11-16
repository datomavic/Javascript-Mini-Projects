//Input and output textarea elements
let input = document.querySelector("#input-content");
let output = document.querySelector("#output-content");

//Booleans to keep track of current data type
let isCSV = false;
let isJSON = false;

//Boolean for keeping track of converted or not.
let converted = false;

//Global variables for storing converted data
let convertedJSON;
let convertedCSV;

//Add event listener to every button
document.querySelectorAll("button").forEach((element) => {
  element.addEventListener("click", onClickProcess);
});
//Add event listener to our upload file button
document.querySelector("#myFile").addEventListener("change", upload);

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

/**
 * upload
 * -------
 * When upload button is clicked, this function will 
 * allow user to upload a .csv or .json file. Then it will
 * convert this file into a string to be converted.
 */
function upload(){
  debugger;
  let fileReader = new FileReader();
  fileReader.readAsText(this.files[0]);
  fileReader.onload = () => {
    input.value = ""+fileReader.result;
    convert(fileReader.result);
  };
}

/**
 * convert
 * -------
 * Function for convert button. Will convert input data into
 * either JSON or CSV depending on detected type.
 * @param {string} content - An optional string representing a JSON or CSV. 
 * If no parameter is provided, 'content' will be grabbed from
 * input textarea.
 */
function convert(content = input.value){
  //Trim out any beginning/trailing spaces
  content = content.trim();
  if(content.length == 0)
    return;

  //If our content string begins with { or [, we know it's possible JSON format
  if(content[0] == "{" || content[0] == "["){
    isJSON = true;
    isCSV = false;
    jsonToCsv(content);
  }
  //Otherwise it's a possible CSV format.
  else{
    isCSV = true;
    isJSON = false;
    csvToJson(content);
  }
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
  //Regex to account for possible non-delimeter commas within our CSV.
  const regex = new RegExp(`\\s*(${quoteChar})?(.*?)\\1\\s*(?:${delimiter}|$)`, 'gs');
  const match = content => [...content.matchAll(regex)].map(match => match[2])
    .filter((_, i, a) => i < a.length - 1); // cut off blank match at end

  const lines = content.split('\n');
  const heads = match(lines.splice(0, 1)[0]);

  let json = lines.map(line => match(line).reduce((acc, cur, i) => ({
    ...acc,
    [heads[i] || `extra_${i}`]: (cur.length > 0) ? (Number(cur) || cur) : null
  }), {}));

  //Conversion complete. Stringify our JSON to output to output display
  let convertedJSON = JSON.stringify(json, null, 1);
  output.value = convertedJSON;
  converted = true;
}

/**
 * jsonToCsv
 * ---------
 * Will convert a string in JSON format into CSV format
 * @param {string} content - a string in JSON format to be converted to CSV
 */
function jsonToCsv(content){
  let json;
  //Attempt to parse 'content' into JSON object
  try{
    json = JSON.parse(content);
  }
  catch(err){
    output.innerText = err.message;
  }

  //Headers will be our CSV's 'row titles'. Use a Set to prevent duplication.
  let headers = new Set();
  let values = [];
  //If json is a single object, rather than array of objects
  if(!Array.isArray(json)){
    json = [json];
  }

  //Gather 'headers' from each object's keys.
  //Push a new array into 'values' (represents each row in CSV)
  for(object of json){
    for(key of Object.keys(object))
      headers.add(key);
    values.push([]);
  }

  //Start gathering CSV 'values' from object's properties via its 'header'. 
  //Push this value into appropriate sub-array
  let i = 0;
  for(object of json){
    for(title of headers){
      if(object[title] == undefined){
        values[i].push("");
      }
      else
        values[i].push(object[title]);
    }
    i++;
  }

  //Print to convertedCSV our 'headers'.
  let convertedCSV = "";
  for(header of headers){
    convertedCSV += ""+header+",";
  }
  convertedCSV += "\n"

  //Begin printing our values to convertedCSV. 
  for(let i = 0; i < values.length; i++){ //Rows
    for(value of values[i]){ //Columns
      convertedCSV += ""+value+",";
    }
    convertedCSV += "\n";
  }

  //Conversion complete. Output to our output display.
  output.value = convertedCSV;
  converted = true;
}

/**
 * download
 * --------
 * When download button is clicked, this function will
 * create an appropriate file-type|file containing converted data and
 * bind it to a newly created anchor tag inside the HTML.
 * Then it will 'click' this anchor tag, causing the file
 * to be downloaded.
 */
function download(){
  if(converted == false || output.value == "")
    return;
  //Get file type based on isJSON boolean
  let type = isJSON == true ? 'text/csv' : 'application/json';
  let extension = type.split('/')[1];
  type = `${type};charset=utf-8`;
  let fileName = "converted."+extension;
  //Create the file with Blob, sending in output value, file type
  let blob = new Blob([output.value], {type})
  a = document.createElement('a');
  //Create URL link for our file
  url = URL.createObjectURL(blob);
  a.href = url;
  //Set download to be file's name
  a.download = fileName;
  document.body.appendChild(a);

  //If user selects "yes", click the anchor tag under-the-hood.
  if(confirm("Are you sure you'd like to download your converted file?"))
    a.click();
}

/**
 * copy
 * -----
 * When copy button is clicked,
 * this function will copy whatever is inside the output
 * textarea and copy it to user's clipboard.
 */
function copy(){
  if(output.value.length == 0 || copy.running)
    return;
  //Function property to avoid code from executing twice asynchronously
  copy.running = true;
  //Element selectors for copy-button icons
  let icon = document.querySelector("#copy-icon");
  let button = document.querySelector("#copy-button");
  let text = document.createElement("p");
  text.style.marginBottom = "0";
  text.style.color = "#3a3a3a";
  text.style.display = "none";
  text.innerText = "Copied!";
  button.appendChild(text);

  //Copy output value to clipboard
  navigator.clipboard.writeText(output.value);

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
    copy.running = false;
  }, 1800);
}

/**
 * clear
 * -----
 * Will clear the output box when clear button is clicked
 */
function clear(){output.value = ""}


