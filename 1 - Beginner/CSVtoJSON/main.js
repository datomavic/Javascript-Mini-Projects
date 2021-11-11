let inputText = document.querySelector("#input-content");

//Add event listener to every button
document.querySelectorAll("button").forEach((element) => {
  element.addEventListener("click", onClickProcess);
});


/***Button clicked. Send off to appropriate function***/
function onClickProcess(){
  //Execute function in global environment by id's first word.
  window[this.id.split("-")[0]]();
}

function upload(){
}

function convert(){
  let content = inputText.value;
  if(content.length == 0)
    return;

  let csv = false;
  let json = false;

  if(content[0] == "{" || content[0] == "[")
    json = true;
  else
    csv = true;
  
  if(csv)
    csvToJson(content);
  if(json)
    jsonToCsv(content);

}

function csvToJson(content){
  let csvArray = content.split(/\n/g);
  csvArray.map((element, index) => {
    csvArray[index] = element.split(",")
  });

  //If csv only has one or none rows, nothing to process. Return.
  if(csvArray.length <= 1)
    return;

  let labels = csvArray[0];
}

function jsonToCsv(content){

}

function download(){

}

function copy(){

}