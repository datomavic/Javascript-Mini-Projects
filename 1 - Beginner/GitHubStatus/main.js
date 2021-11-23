const overallStatus = document.querySelector('#overall-status')
const componentList = document.querySelectorAll('.status-label');
const lastUpdated = document.querySelector('#lastUpdated');
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

  //Set overall status to our fetched JSON's overallStatus property
  overallStatus.innerText = statusData.overallStatus;
  if(statusData.overallStatus == 'All Systems Operational'){
    overallStatus.innerText = overallStatus.innerText +" ✔"
    overallStatus.style.color = '#26a526';
  }

  componentList.forEach((component) => {
    let id = component.id.split('-').join(" ");
    component.innerText = statusData.components[id];
    if(statusData.components[id] == 'Operational'){
      component.style.color = '#26a526'
      component.innerText = component.innerText + " ✔"
      let checkMark = document.querySelector('#'+component.id+'-Check');
      checkMark.style.visibility = 'visible';
    }
  });

  let unformattedDate = statusData.lastUpdated;
  let dateRegex = /[\d-]*(?=T)+/gi;
  let timeRegex = /\d+:\d+:\d+/gi;
  let date = unformattedDate.match(dateRegex).join("");
  let time = unformattedDate.match(timeRegex).join("")+" UTC";
  let dateTime = date + " | "+ time;
  lastUpdated.innerText = dateTime;
}

setTimeout(initialize, 5000);