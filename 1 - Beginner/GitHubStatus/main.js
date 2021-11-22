/**
 * @async
 * This will initialize our web-page with statuses fetched 
 * from fetchStatus().
 */
async function initialize(){
  const statusData = await fetchStatus();
  //If fetch request throws an error
  if(!statusData)
    return;
  console.log(statusData);
}

initialize();