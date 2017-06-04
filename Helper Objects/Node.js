var BoundingBox = require('./BoundingBox');
var Children = require('./Children');

function Node(originX, originY, width, height) {
  this.boundingBox = new BoundingBox(originX, originY, width, height);
  this.coordinates = null;
  this.children = new Children();
}

Node.prototype.findChildToInsertInto = function(coordinates) {
  var childWidth = this.boundingBox.width / 2;
  var childHeight = this.boundingBox.height / 2;

  var parentArea = this.boundingBox.width * this.boundingBox.height;
  var childArea = childWidth * childHeight;

  if (parentArea / childArea !== 4) {
    return null; // we can't divide by 2 forever (we can't keep track of infinitesimally small boxes)
  }

  var originX = this.boundingBox.origin.x;
  var originY = this.boundingBox.origin.y;

  var originXPlusOffset = originX + childWidth;
  var originYPlusOffset = originY + childHeight;

  var childDirection;
  var childOriginX;
  var childOriginY;

  if (coordinates.x < originXPlusOffset) {
    childOriginX = originX;

    if (coordinates.y < originYPlusOffset) {
      childDirection = 'southWest';
      childOriginY = originY;
    } else {
      childDirection = 'northWest';
      childOriginY = originYPlusOffset;
    }

  } else {
    childOriginX = originXPlusOffset;

    if (coordinates.y < originYPlusOffset) {
      childDirection = 'southEast';
      childOriginY = originY;
    } else {
      childDirection = 'northEast';
      childOriginY = originYPlusOffset;
    }

  }

  if (!this.children[childDirection]) {
    this.children[childDirection] = new Node(childOriginX, childOriginY, childWidth, childHeight);
  }

  return this.children[childDirection];
};

module.exports = Node;
