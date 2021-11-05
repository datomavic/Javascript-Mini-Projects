let inputBoxes = document.querySelectorAll(".radius-input");
inputBoxes.forEach((element) => {
  element.addEventListener("input", updateRadius);
});

function updateRadius(){
  let box = document.querySelector("#box");
  switch(this.id){
    case "ri1": 
      box.style.borderTopLeftRadius = this.value+"px";
      break;
    case "ri2": 
      box.style.borderTopRightRadius = this.value+"px";
      break;
    case "ri3": 
      box.style.borderBottomLeftRadius = this.value+"px";
      break;
    case "ri4": 
      box.style.borderBottomRightRadius = this.value+"px";
      break;
  }
}