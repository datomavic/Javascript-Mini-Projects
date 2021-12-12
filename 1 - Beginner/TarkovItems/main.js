

//usage:
readFile((text) =>{
  const items = JSON.parse(text);
  for(i in items){
    console.log(i)
  }
});

/**
 * This function will read our items.json file then send it
 * off to our callback for use.
 * @param {Object} callback - our callback function 
 */
function readFile(callback){
  let itemsJson = new XMLHttpRequest();
  itemsJson.overrideMimeType("application/json");
  itemsJson.open("GET", './items.json', true);
  itemsJson.onreadystatechange = function() {
   if (itemsJson.readyState === 4 && itemsJson.status == "200")
    callback(itemsJson.responseText);
  }
  itemsJson.send(null);
}
