const calculator = {
  "zero": undefined,
  "one": undefined,
  "two": undefined,
  "three": undefined,
  "four": undefined,
  "five": undefined,
  "six": undefined,
  "seven": undefined,
  "eight": undefined,
  "nine": undefined,
  "decimal": undefined,
  "all-clear": undefined,
  "clear": undefined,
  //"pos-neg": undefined,
  "divide": undefined,
  "multiply": undefined,
  "minus": undefined,
  "add": undefined,
  "equals": undefined
};

for(let key of Object.keys(calculator)){
  key = document.querySelector("#"+key).addEventListener("click", input);
}

let output = document.querySelector("#output");
let outputArray = output.innerText.split(" ");

function input(){
  let currentOutput = output.innerText;
  let lastItem = outputArray[outputArray.length - 1];

   //If entered value is equals sign "=", begin processing outputArray.
  if(this.innerText == "="){
    equals(outputArray);
    return;
  }

  /***Append entered values with spaces or no spaces, depending on input/current output***/

  //If entered value is an operator, add space before it and append to output string
  if(this.className == "operator"){
    if(isNaN(lastItem))
      output.innerText = currentOutput.substring(0, currentOutput.length-1) + this.innerText;
    else
      output.innerText = currentOutput +" "+this.innerText;
  }
  //Otherwise...
  else{
    //if last item in outputArray is an operator (and not a decimal), add space before entered value.
    if(isNaN(lastItem) && lastItem != ".")
      output.innerText = currentOutput+" "+this.innerText;
    //Otherwise if entered value is a number...
    else{
      //if calculator's output display only has a single 0, replace 0 with new entered number
      if(outputArray.length = 1 && lastItem == "0")
        output.innerText = this.innerText;
      //otherwise, append entered value without space
      else
        output.innerText = currentOutput + this.innerText;
    }
 
  }

  //After string is formatted for current input, update outputArray with string by splitting by spaces
  outputArray = output.innerText.split(" ");
  //Keep output scrolled to left in calculator's view.
  output.scrollLeft = output.scrollWidth;
  console.log(outputArray);
  console.log(output.innerText);
}


//to be finished
function equals(arr){
  if(arr.length < 3)
    return;
  while(hasOperator(arr)){
    for(let index in arr){
      if(arr[index] == "×"){
        let ans = +arr[arr.indexOf("×") - 1] * +arr[arr.indexOf("×") + 1];
        arr.splice(index-1, 3, ans);
        break;
      }
      if(arr[index] == "÷" && !arr.includes("×")){
        let ans = +arr[arr.indexOf("÷") - 1] / +arr[arr.indexOf("÷") + 1];
        arr.splice(index-1, 3, ans);
        break;
      }
      if(arr[index] == "+" && !arr.includes("×") && !arr.includes("÷")){
        let ans = +arr[arr.indexOf("+") - 1] + +arr[arr.indexOf("+") + 1];
        arr.splice(index-1, 3, ans);
        break;
      }
      if(arr[index] == "-" && !arr.includes("×") && !arr.includes("÷") && !arr.includes("+")){
        let ans = +arr[arr.indexOf("-") - 1] - +arr[arr.indexOf("-") + 1];
        arr.splice(index-1, 3, ans);
        break;
      }
    }
  }
  output.innerText = arr[0];
  console.log(arr);
}

function hasOperator(arr){
  let operators = ["×", "÷", "+", "-"];
  return arr.some((element) => operators.includes(element));
}
