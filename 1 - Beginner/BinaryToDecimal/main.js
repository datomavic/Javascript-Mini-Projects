let input = document.querySelector("#binaryForm");
let regex = /[2-9]+/g;
let output = document.querySelector("#output");

input.addEventListener("submit", (event) => {
  event.preventDefault();
  let data = input.querySelector("#input").value;
  if(regex.test(data)){
    output.style = "none";
    output.style.fontSize = "20px";
    output.style.width = "max-content";
    output.textContent = "INVALID INPUT";
    return;
  }
  convert(data);
});

function convert(data){
  
  //trim leading zero's, then convert to string.
  data = +data;
  data = ""+data;

  let total = 0;
  let pos = 0;
  for(let i = data.length - 1; i >= 0; i--){
    if(data[i] != 0 && data[i] != 1)
      return;
    if(data[i] == '0'){
      pos++;
      continue;
    }
    total += Math.pow(2, pos);
    pos++;
  }
  output.style.fontSize = "50px";
  output.style.marginTop = "-.1em";
  output.style.width = "2.5em";
  output.style.textAlign = "center";
  output.style.border = "3px solid red";
  output.style.borderRadius = "5px";
  output.textContent = total;
}