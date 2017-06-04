var Node = require('./Node/Node');
var Vector = require('./Node/Vector');

function QuadTree() {
  this.root = new Node(0, 0, 100, 20);
}

QuadTree.prototype.searchAndInsert = function(node, coordinates) {
  if (node.coordinates === null) return node.coordinates = coordinates;
  var child = node.findChildToInsertInto(coordinates);
  this.searchAndInsert(child, coordinates);
};

QuadTree.prototype.insert = function(x, y) {
  var point = new Vector(x, y);
  this.searchAndInsert(this.root, point);
};

module.exports = QuadTree;
