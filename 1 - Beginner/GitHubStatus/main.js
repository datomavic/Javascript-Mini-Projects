//Query selectors for our needed webpage elements.
const overallStatus = document.querySelector('#overall-status')
const componentList = document.querySelectorAll('.status-label');
const lastUpdated = document.querySelector('#lastUpdated');

//Initialize our webpage.
initialize();


/**
 * @async
 * This will initialize our web-page with statuses fetched 
 * from fetchStatus().
 */
async function initialize(){
  const statusData = await fetchStatus();
  //If fetch request throws an error
  if(!statusData){
    overallStatus.innerText = 'Error fetching GitHubStatus API'
    overallStatus.style.color = 'red';
    return;
  }
  //Update frontend with data from fetched data from GitHubStatus.com
  setOverallStatus(statusData);
  setComponentStatus(statusData);
  setLastUpdated(statusData);
}

/**
 * Will update the overallStatus element in our webpage with the 
 * overallStatus property found in the fetched JSON.
 * @param {Object} statusData - A JSON Object with our fetched data
 * from https://www.githubstatus.com/api/v2/summary.json
 */
function setOverallStatus(statusData){
  //Set overall status to our fetched JSON's overallStatus property
  overallStatus.innerText = statusData.overallStatus;
  if(statusData.overallStatus == 'All Systems Operational'){
    overallStatus.innerText = overallStatus.innerText +" ✔";
    overallStatus.style.color = '#26a526';
  }
  if(statusData.overallStatus == 'Partial System Outage'){
    overallStatus.innerText = overallStatus.innerText +" ⚠";
    overallStatus.style.color = '#e2e25d';
  }
  if(statusData.overallStatus == 'Major Service Outage'){
    overallStatus.innerText = overallStatus.innerText +" 🚫";
    overallStatus.style.color = 'red';
  }
}

/**
 * Will update the components elements in our webpage with the 
 * appropriate component status found in the fetched JSON.
 * @param {Object} statusData - A JSON Object with our fetched data
 * from https://www.githubstatus.com/api/v2/summary.json
 */
function setComponentStatus(statusData){
  componentList.forEach((component) => {
    let id = component.id.split('-').join(" ");
    if(statusData.components[id] == 'Operational'){
      component.style.color = '#26a526';
      component.innerText = "Operational" + " ✔";
      let checkMark = document.querySelector('#'+component.id+'-Check');
      checkMark.style.visibility = 'visible';
    }
    if(statusData.components[id] == 'Degraded_performance' || statusData.components[id] == 'Partial_outage'){
      component.style.color = '#e2e25d';
      component.innerText = "Degraded Performance" + " ⚠";
    }
    if(statusData.components[id] == 'Major_outage'){
      component.style.color = 'red';
      component.innerText = "Major Outage" + " 🚫";
    }
  });
}

/**
 * Will grab and reformat the lastUpdated value from our fetched JSON and
 * display it to our lastUpdated element in our webpage.
 * @param {Object} statusData - A JSON Object with our fetched data
 * from https://www.githubstatus.com/api/v2/summary.json
 */
function setLastUpdated(statusData){
  const unformattedDate = statusData.lastUpdated;
  const dateRegex = /[\d-]*(?=T)+/gi;
  const timeRegex = /\d+:\d+:\d+/gi;
  let date = unformattedDate.match(dateRegex).join("");
  let time = unformattedDate.match(timeRegex).join("")+" UTC";
  const dateTime = date + " | "+ time;
  lastUpdated.innerText = dateTime;
}