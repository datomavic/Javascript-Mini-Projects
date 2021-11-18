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
    const request = indexedDB.open(this.dbName, 1);
    request.onerror = (event) => {
      console.log('initialLoad - Database error: ', event.target.error.code,
        " - ", event.target.error.message);
    };

    request.onupgradeneeded = (event) => {
      console.log('Populating customers...');
      const db = event.target.result;
      const objectStore = db.createObjectStore('customers', { keyPath: 'userid' });
      objectStore.onerror = (event) => {
        console.log('initialLoad - objectStore error: ', event.target.error.code,
          " - ", event.target.error.message);
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
  }
  
  /**
   * Remove all rows from the database
   * @memberof Customer
   */
  removeAllRows = () => {
    const request = indexedDB.open(this.dbName, 1);

    request.onerror = (event) => {
      console.log('removeAllRows - Database error: ', event.target.error.code,
        " - ", event.target.error.message);
    };

    request.onsuccess = (event) => {
      console.log('Deleting all customers...');
      const db = event.target.result;
      const txn = db.transaction('customers', 'readwrite');
      txn.onerror = (event) => {
        console.log('removeAllRows - Txn error: ', event.target.error.code,
          " - ", event.target.error.message);
      };
      txn.oncomplete = (event) => {
        console.log('All rows removed!');
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

  getData = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);
      request.onerror = (event) => {
        console.log('getData - Query error: ', event.target.error.code,
           " - ", event.target.error.message);
        reject();
      };
  
      request.onsuccess = (event) => {
        console.log("Querying database...");
        const db = event.target.result;
        const txn = db.transaction('customers', 'readwrite');
        txn.onerror = (event) => {
          console.log('getData - Txn error: ', event.target.error.code,
            " - ", event.target.error.message);
        };
        txn.oncomplete = (event) => {
          console.log("Queried.");
        };
        const objectStore = txn.objectStore('customers');
        const getAllKeysRequest = objectStore.getAll();
        getAllKeysRequest.onsuccess = () => {
          resolve(getAllKeysRequest.result);
        };
      }
    });
  }

}