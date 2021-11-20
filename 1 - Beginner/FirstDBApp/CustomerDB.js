class Customer {

  constructor(dbName) {
    this.dbName = dbName;
    if (!window.indexedDB) {
      window.alert("Your browser doesn't support a stable version of IndexedDB. \
        Such and such feature will not be available.");
    }
  }

  /**
   * Populate the Customer database with an initial set of customer data
   * @param {[object]} customerData Data to add
   * @memberof Customer
   */
   initialLoad = (customerData) => {
     notify('Loading the customers database');
    const request = indexedDB.open(this.dbName, 1);
    request.onerror = (event) => {
      let msg = 'initialLoad - Database error: '+event.target.error.code+' - '+event.target.error.message;
      notify(msg);
      return;
    };

    request.onupgradeneeded = (event) => {
      notify('Populating customers...');
      const db = event.target.result;
      const objectStore = db.createObjectStore('customers', { keyPath: 'userid' });
      objectStore.onerror = (event) => {
        let msg = 'initialLoad - objectStore error: '+event.target.error.code+' - '+event.target.error.message;
        notify(msg);
      };

      // Create an index to search customers by name and email
      objectStore.createIndex('name', 'name', { unique: false });
      objectStore.createIndex('email', 'email', { unique: true });
      // Populate the database with the initial set of rows
      customerData.forEach( (customer) => {
        objectStore.put(customer);
      });
      db.close();
    };
    notify('Successfully loaded database');
  }
  
  /**
   * Remove all rows from the database
   * @memberof Customer
   */
  removeAllRows = () => {
    const request = indexedDB.open(this.dbName, 1);

    request.onerror = (event) => {
      let msg = 'removeAllRows - Database error: '+event.target.error.code+' - '+event.target.error.message;
      notify(msg);
    };

    request.onsuccess = (event) => {
      notify('Deleting all customers from database...');
      const db = event.target.result;
      const txn = db.transaction('customers', 'readwrite');
      txn.onerror = (event) => {
        let msg = 'removeAllRows - Txn error: '+event.target.error.code+' - '+event.target.error.message;
        notify(msg);
      };
      txn.oncomplete = (event) => {
        notify('All rows removed!');
      };
      const objectStore = txn.objectStore('customers');
      const getAllKeysRequest = objectStore.getAllKeys();
      getAllKeysRequest.onsuccess = (event) => {
        getAllKeysRequest.result.forEach(key => {
          objectStore.delete(key);
        });
      }
    }
  }

  /**
   * Get data (query) from the database. 
   * @memberof Customer
   * @returns {Promise} - a promise to retrieve data from DB.
   */
  getData = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);
      request.onerror = (event) => {
        let msg = 'getData - Query error: '+event.target.error.code+' - '+event.target.error.message;
        notify(msg);
        reject();
      };
  
      request.onsuccess = (event) => {
        notify('Querying database...');
        const db = event.target.result;
        const txn = db.transaction('customers', 'readwrite');
        txn.onerror = (event) => {
          let msg = 'getData - Txn error: '+event.target.error.code+' - '+event.target.error.message;
          notify(msg);
        };
        const objectStore = txn.objectStore('customers');
        const getAllKeysRequest = objectStore.getAll();
        getAllKeysRequest.onsuccess = () => {
          if(Object.keys(getAllKeysRequest.result).length == 0)
            notify('Queried, however database is empty.');
          else{
            notify('Queried.');
            resolve(getAllKeysRequest.result);
          }
        };
      }
    });
  }

}