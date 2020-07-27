const graph = new Map();
const _ = require('lodash');

var nodesToVisit = [];
var stack2 = [];
var VisitedLeaf = [];


function getPaths(startNode, data) {
  let graphPaths = [];
  _.map(data, (value, key) => graph.set(key, value));
  nodesToVisit.push(startNode);
  while (nodesToVisit.length !== 0) {
    let visitingVertex = nodesToVisit.pop();
    stack2.push(visitingVertex);
    if (nodeHasChildren(getLastNode(stack2))) {
      addChildrenToNodesToVisit(getChildrenOfNode(getLastNode(stack2)));
    } else {
      VisitedLeaf.push(getLastNode(stack2));
      graphPaths.push([...stack2]);
      stack2.pop();
      let children = getChildrenOfNode(getLastNode(stack2));
      if (allChildVisited(children)) {
        stack2.pop();
        VisitedLeaf.pop();
      }
    }
  }
  return graphPaths;
}

function allChildVisited(children) {
  for (let i in children) {
    if (!_.includes(VisitedLeaf, children[i])) {
      return false;
    }
  }
  return true;
}


function addChildrenToNodesToVisit(children) {
  _.map(children, child => nodesToVisit.push(child));
}

function getLastNode(stack) {
  return _.last(stack);
}

function nodeHasChildren(node) {
  return graph.has(node.toString());
}

function getChildrenOfNode(node) {
  return graph.get(node.toString());
}


exports.getPaths = getPaths;
