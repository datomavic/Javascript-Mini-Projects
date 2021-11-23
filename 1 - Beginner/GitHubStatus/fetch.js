/**
 * @async
 * @returns {Promise} - a Promise to fetch data from 
 * 'https://www.githubstatus.com/api/v2/summary.json'
 *  and resolve an object containing filtered data from the fetch request.
 *  We will use this resolved object for displaying statuses on our web page.
 * @returns {Boolean} - a false boolean if error occurs during fetch request.
 */
async function fetchStatus(){
  let fetchData;
  let statusData;

  try{
    fetchData = await fetch("https://www.githubstatus.com/api/v2/summary.json");
    statusData = await fetchData.json();
  }
  catch{
    return false;
  }

  return new Promise((resolve) => {
    const status = {};
    status.lastUpdated = statusData.page.updated_at;
    status.overallStatus = statusData.status.description;
    status.components = {};
    for(let component of statusData.components){
      //Skip this component from API, not a real component
      if(component.name == 'Visit www.githubstatus.com for more information')
        continue;
      status.components[component.name] = component.status.charAt(0).toUpperCase() + component.status.substring(1);
    }
    resolve(status);
  });

}