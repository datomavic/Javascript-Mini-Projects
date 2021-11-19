// Web page event handlers

//Global variables to access later:
const DBNAME = 'customer_db';
const notifications = [];
const data = [];

/**
 * Clear all customer data from the database
 */
const clearDB = () => {
  let customer = new Customer(DBNAME);
  customer.removeAllRows();
}

/**
 * Add customer data to the database
 */
const loadDB = () => {
  // Customers to add to initially populate the database with
  const customerData = [
    { userid: '333', name: 'Bill', email: 'bill@company.com' },
    { userid: '444', name: 'Donna', email: 'donna@home.org' },
    { userid: '555', name: 'Jeff', email: 'jeff@google.com' }
  ];

  let customer = new Customer(DBNAME);
  customer.initialLoad(customerData);
}

/**
 * Query customer data from database.
 * Once promise is fulfilled, populate data[] with our database entries
 */
const queryDB = async() => {
  let customer = new Customer(DBNAME);
  customer.getData().then((result) => {result.forEach((element) => data.push(element))});
}

/**
 * Send info to notification panel
 * @param {string} - a string representing the message to send to notification panel
 */
const notify = (msg) => {
  console.log(msg);
  notifications.push(msg);
}

/*To grab result of queryDB(), we must wait for cusomer.getData() to finish.
*.then, we can get the result of our promise. 
* 
*   queryDB().then(result => {
*     do something with result
*   });
*
*/

loadDB();
queryDB();

// setTimeout(() => {
//   console.log(data);
// }, 50);