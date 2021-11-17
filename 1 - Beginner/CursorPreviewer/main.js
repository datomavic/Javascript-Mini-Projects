//Add event listener for each radio-input button.
//When radio button is clicked, send off to inputSelected.
document.querySelectorAll('input[name="cursor-input"]').forEach((element) => {
  element.addEventListener("change", inputSelected);
});
//query selectors for our 'Result' and 'Output' box.
let result = document.querySelector("#result");
let output = document.querySelector("#output");
/**
 * Simple function that will alter the cursor for the 'result' box
 * and will output the code used for this cursor change to the 'output' box.
 */
function inputSelected(){
  output.innerHTML = "\n#result{\n  cursor: "+this.id+"; \n}";
  result.style.cursor = this.id;
}

