//Input and output textarea
let input = document.querySelector("#input-content");
let output = document.querySelector("#output-content");
//Booleans to keep track of current data type
let isCSV = false;
let isJSON = false;
let processed = false;
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

/**
 * upload
 * -------
 * When upload button is clicked, this function will 
 * allow user to upload a .csv or .json file. Then it will
 * convert this file into a string to be converted.
 */
function upload(){
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
  if(content.length == 0)
    return;

  if(content[0] == "{" || content[0] == "["){
    isJSON = true;
    isCsv = false;
    jsonToCsv(content);
  }
  else{
    isCsv = true;
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
  isCSV = true;
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
  processed = true;
}

/**
 * jsonToCsv
 * ---------
 * Will convert a string in JSON format into CSV format
 * @param {string} content - a string in JSON format to be converted to CSV
 */
function jsonToCsv(content){

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
  if(processed == false)
    return;
  let type = isJSON == true ? 'text/csv' : 'application/json';
  //type = `${type};charset=utf-8`;
  let fileName = "converted."+type.split('/')[1];
  let blob = new Blob([output.value], {type})
  a = document.createElement('a');
  url = URL.createObjectURL(blob);
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
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

}
