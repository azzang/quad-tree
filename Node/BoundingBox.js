var Vector = require('./Vector');

module.exports = function(originX, originY, width, height) {
  this.origin = new Vector(originX, originY);
  this.width = width;
  this.height = height;
};
