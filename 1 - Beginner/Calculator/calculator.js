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
  "ans": undefined,
  "divide": undefined,
  "multiply": undefined,
  "minus": undefined,
  "add": undefined,
  "equals": undefined
};

for(let key of Object.keys(calculator)){
  button = document.querySelector("#"+key);
  button.addEventListener("click", input);
}

let output = document.querySelector("#output");
let ansOutput = document.querySelector("#answer");
ansOutput.answer = 0;
let inputArray = output.innerText.split(" ");

//User has clicked a button, do stuff.
function input(){
   //If user clicks equals "="
  if(this.innerText == "="){
    equals();
    return;
  }
  //If user clicks clear "C"
  if(this.innerText == "C"){
    clear();
    return;
  }
  //If user clicks all clear "AC"
  if(this.innerText == "AC"){
    allClear();
    return;
  }

  /***Start appending entered values as string with spaces or no spaces, depending on current output***/
  let outputString;
  let currentOutput = output.innerText;
  let lastItem = ""+inputArray[inputArray.length - 1];

  if(this.innerText == "Ans")
    outputString = clickedAns();
  else if(this.innerText == "." && lastItem.includes("."))
    return;
  else{
  //If entered value is an operator, check if last item in inputArray is also operator
    if(this.className == "operator"){
      if(isNaN(lastItem)){
        if(lastItem == ".")
          outputString = currentOutput.substring(0, currentOutput.length - 3) + this.innerText;
        else
          outputString = currentOutput.substring(0, currentOutput.length-1) + this.innerText;
      }
      else
        outputString = currentOutput +" "+this.innerText;
    }
    //Otherwise...
    else{
      //if last item in inputArray is an operator (and not a decimal), add space before entered value.
      if(isNaN(lastItem) && lastItem != ".")
        outputString = currentOutput+" "+this.innerText;
      //Otherwise if entered value is a number...
      else{
        //if calculator's output display only has a single 0, 
        //or has done previous calculation, replace with new entered number
        if(inputArray.length = 1 && lastItem == "0" || equals.previouslyCalculated)
          outputString = this.innerText;
        //otherwise, append entered value without space
        else{
          if(lastItem == ansOutput.answer)
            outputString = currentOutput + " × " +this.innerText;
          else
            outputString = currentOutput + this.innerText;

        } 
      }
    }
  }
  //Update output.innerText to be outputString
  output.innerText = outputString;
  //After string is formatted for current input, update inputArray with string separated by spaces
  inputArray = outputString.split(" ");
  //Keep output scrolled to left in calculator's view.
  output.scrollLeft = output.scrollWidth;
  //Update equals.previouslyCalculated sentinel back to false.
  equals.previouslyCalculated = false;
}



/***When user clicks equals "=" on calculator, begin calculation of inputArray***/
function equals(){
  equals.previouslyCalculated = false;

  //If current input doesnt have enough elements to process or has trailing operator/decimal, return.
  let lastItem = inputArray[inputArray.length - 1];
  if(inputArray.length < 3 || hasOperator([lastItem]) || lastItem == ".")
    return;

  //function for check if input array contains specific operator
  let contains = (operator) => {
    return inputArray.includes(operator);
  }

  //function that returns operands "x" or "y" to be calculated. 
  //x will be one index behind operator, y is one index ahead of operator.
  let operand = (operator, operand) => {
    if(operand == "x")
      return +inputArray[inputArray.indexOf(operator) - 1]
    else
      return +inputArray[inputArray.indexOf(operator) + 1]
  }

  //while our inputArray still has operators, continue processing.
  while(hasOperator(inputArray)){
    for(let index in inputArray){
      //following if statements is basically the P.E.M.D.A.S. process.
      if(inputArray[index] == "×"){
        let ans = operand("×", "x") * operand("×", "y");
        inputArray.splice(index-1, 3, ans);
        break;
      }
      if(inputArray[index] == "÷" && !contains("×")){
        let ans = operand("÷", "x") / operand("÷", "y"); 
        inputArray.splice(index-1, 3, ans);
        break;
      }
      if(inputArray[index] == "+" && !contains("×") && !contains("÷")){
        let ans = operand("+", "x") + operand("+", "y");
        inputArray.splice(index-1, 3, ans);
        break;
      }
      if(inputArray[index] == "-" && !contains("×") && !contains("÷") && !contains("+")){
        let ans = operand("-", "x") - operand("-", "y");
        inputArray.splice(index-1, 3, ans);
        break;
      }
    }
  } //Calculation complete. 

  //inputArray has been reduced to a single element which is our answer.
  //Display to output. 
  output.innerText = inputArray[0];
  output.scrollLeft = output.scrollWidth;
  ansOutput.innerText = "Ans = "+inputArray[0];
  ansOutput.scrollLeft = ansOutput.scrollWidth;
  ansOutput.answer = inputArray[0];

  //Calculation was completed, so update sentinel to true.
  equals.previouslyCalculated = true;
}



/***When user clicks clear "C", clear last character of inputArray***/
function clear(){
  //if equals was previously called, dont use clear. exit.
  if(equals.previouslyCalculated)
   return;
  
  let arrLength = inputArray.length;
  let lastItem = ""+inputArray[arrLength - 1];

  //If inputArray has a single element of length 1, clear and replace with "0".
  if(arrLength == 1 && inputArray[0].length == 1)
    inputArray.splice(arrLength - 1, 1, "0");
  //Otherwise, clear last character of last element in inputArray
  else{
    //if last item's length is only 1, clear element from inputArray
    if(lastItem.length == 1)
      inputArray.splice(arrLength - 1, 1);
    //otherwise, remove last character from last element of inputArray.
    else
      inputArray[arrLength - 1] = lastItem.slice(0, lastItem.length - 1)
  }

  //Update calculator's output display
  output.innerText = inputArray.join(" ");
}



/***When user clicks all clear "AC", clear entire inputArray (and insert 0)***/
function allClear(){
  inputArray = ["0"];
  output.innerText = inputArray[0];
}



/***When user clicks "Ans", enter previously calculated value***/
function clickedAns(){
  let lastItem = inputArray[inputArray.length - 1];
  if(hasOperator([lastItem]))
    inputArray.push(ansOutput.answer);
  else
    inputArray[inputArray.length - 1] = ansOutput.answer;
  return inputArray.join(" ");
}



/***Helper function for checking if inputArray has any operators***/
function hasOperator(inputArray){
  let operators = ["×", "÷", "+", "-"];
  return inputArray.some((element) => operators.includes(element));
};