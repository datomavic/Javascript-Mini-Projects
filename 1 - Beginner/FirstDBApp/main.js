// Web page event handlers

const DBNAME = 'customer_db';

/**
 * Clear all customer data from the database
 */
const clearDB = () => {
  console.log('Deleting all rows from the Customers database');
  let customer = new Customer(DBNAME);
  customer.removeAllRows();
}

/**
 * Add customer data to the database
 */
const loadDB = () => {
  console.log('Loading the Customers database');

  // Customers to add to initially populate the database with
  const customerData = [
    { userid: '444', name: 'Bill', email: 'bill@company.com' },
    { userid: '555', name: 'Donna', email: 'donna@home.org' },
    { userid: '666', name: 'Jeff', email: 'jeff@google.com'}
  ];
  let customer = new Customer(DBNAME);
  customer.initialLoad(customerData);
}

/**
 * Query customer data from database
 */
const queryDB = async() => {
  let customer = new Customer(DBNAME);
  return await customer.getData();
}

//Initiate DB ?
loadDB();

//To grab result of queryDB(), we must wait for cusomer.getData() to finish.
//.then, we can get the result of our promise. 
queryDB().then(result => console.log(result));