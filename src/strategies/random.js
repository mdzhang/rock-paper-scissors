'use strict';

/**
 * A RPS strategy that chooses a random move.
 */
var utils = require('../utils');

function RandomStrategy() {}

RandomStrategy.prototype.getMove = function() {
  return utils.getRandomMove();
};

RandomStrategy.prototype.toString = function() {
  return 'random';
};

module.exports = RandomStrategy;