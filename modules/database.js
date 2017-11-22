var JsonDB = require('node-json-db');

let db = {};

class Database {
  constructor(config) {
    db = new JsonDB("db.json", true, true);
  }

  select(ref) {
    return db.getData(ref);
  }

  insert(ref, obj) {
    db.push(ref,obj);
  }

  update(ref, obj) {
    return new Promise((resolve, reject) => {
      db.push(ref,obj);
      resolve();
    });
  }

  delete(ref, obj) {
    return new Promise((resolve, reject) => {
      db.delete(ref);
      resolve();
    });
  }
}

module.exports = Database;