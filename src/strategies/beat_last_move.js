'use strict';

/**
 * A RPS strategy that chooses the move that will break the player's last thrown move.
 */
var utils = require('../utils');

function BeatLastMoveStrategy() {
}

BeatLastMoveStrategy.prototype.getMove = function(opponentLastMove) {
  return opponentLastMove ? utils.getBreakingMove(opponentLastMove) : utils.getRandomMove();
};

BeatLastMoveStrategy.prototype.toString = function() {
  return 'beat_last_move';
};

module.exports = BeatLastMoveStrategy;