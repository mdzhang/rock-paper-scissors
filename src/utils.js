'use strict';

var constants = require('./constants');

function getBreakingMove(move) {
  return constants.RPS_BREAKING_MOVES[move];
}

function getRandomMove() {
  return constants.RPS_MOVES[
    constants.RPS_MOVE_NAMES[Math.floor(Math.random() * constants.RPS_MOVE_NAMES.length)]
  ];
}

module.exports = {
  getBreakingMove: getBreakingMove,
  getRandomMove: getRandomMove
};