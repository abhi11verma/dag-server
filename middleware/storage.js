const _ = require('lodash');
const JSONdb = require('simple-json-db');
const db = new JSONdb(__basedir+"/helper/database.json");
const KEY = "key";

function storeGraph(data) {
  db.set(KEY, data);
}

function getGraph(){
  return db.get(KEY);
}

function clearDB() {
  return db.deleteAll()
}


exports.storeGraph = storeGraph;
exports.getGraph = getGraph;


