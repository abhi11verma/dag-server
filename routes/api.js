var express = require('express');
const router = express.Router();
const db = require('../middleware/storage');
const dag = require('../helper/dag');
const _ = require('lodash');
/* GET PATHS */
router.get('/getpaths', function (req, res, next) {
  if (req.query.startnode) {
    const graph = db.getGraph();
    if (graph) {
      const paths = dag.getPaths(_.toNumber(req.query.startnode), graph);
      res.status(200).send(paths);
    } else {
      res.status(404).send("Graph is empty, create a graph first");
    }
  } else {
    res.status(404).send("Parameter startnode missing");
  }

});

router.get('/getgraph', function (req, res) {
  const graph = db.getGraph();
  if (graph) {
    res.status(200).send(graph);
  } else {
    res.status(404).send("Graph empty");
  }
});

router.post('/create', function (req, res, next) {
  db.storeGraph(req.body);
  res.status(200).send("SUCCESS");
  next();
});


router.post('/addnode', function (req, res) {
  const parent = req.body.parent;
  const newNode = req.body.value;
  const graph = db.getGraph();
  const map = new Map();
  const json = {};
  _.map(graph, (value, key) => map.set(key, value));

  if (map.has(parent.toString())) {
    let values = map.get(parent.toString());
    _.map(newNode, (node) => !_.includes(values, node) && values.push(node));
    map.set(parent, values);
    map.forEach((value, key) => json[key] = value);
    db.storeGraph(json);

  } else {
    map.set(parent, newNode);
    map.forEach((value, key) => json[key] = value);
    db.storeGraph(json);
  }
  res.status(200).send(db.getGraph());

});

module.exports = router;
