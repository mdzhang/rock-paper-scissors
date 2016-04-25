'use strict';

/**
 * A RPS strategy that chooses the move that will break the player's most commonly thrown move.
 */
var constants = require('../constants');
var utils = require('../utils');

function BeatFavoriteStrategy() {
  var self = this;

  self.opponentMoveFrequencyMap = {};     // maps all possible RPS moves to the number
                                          // of times the user has thrown that move
  self.opponentFavoriteMove = null;       // one of constants.RPS_MOVES; the opponent's most
                                          // most commonly thrown move

  constants.RPS_MOVE_NAMES.forEach(function(move) {
    self.opponentMoveFrequencyMap[move] = 0;
  });
}

BeatFavoriteStrategy.prototype.getMove = function(opponentLastMove) {
  var self = this;

  if (opponentLastMove) {
    self.opponentMoveFrequencyMap[opponentLastMove] += 1;

    if (self.opponentFavoriteMove) {
      if (self.opponentMoveFrequencyMap[opponentLastMove] >
          self.opponentMoveFrequencyMap[self.opponentFavoriteMove]) {
        self.opponentFavoriteMove = opponentLastMove;
      }
    } else {
      self.opponentFavoriteMove = opponentLastMove;
    }
  }

  return self.opponentFavoriteMove ? utils.getBreakingMove(self.opponentFavoriteMove) :
      utils.getRandomMove();
};

BeatFavoriteStrategy.prototype.toString = function() {
  return 'beat_favorite';
};

module.exports = BeatFavoriteStrategy;