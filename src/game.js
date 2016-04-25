'use strict';

/**
 * A game of RPS that can be interacted with through the command line.
 */
var strategies = require('./strategies');
var readline = require('readline');
var constants = require('./constants');
var util = require('util');

var USER_TO_RPS_MOVE_MAP = {
  'r': constants.RPS_MOVES.ROCK,
  'p': constants.RPS_MOVES.PAPER,
  's': constants.RPS_MOVES.SCISSOR
};

var RPS_TO_USER_MOVE_MAP = {
  ROCK: 'r',
  PAPER: 'p',
  SCISSOR: 's'
};

/**
 * Parse a move given by a user into the its corresponding internal representation.
 *
 * @param  {String} move - as given by a user
 * @return {String} one of constants.RPS_MOVES
 */
function _parseMove(move) {
  if (constants.RPS_MOVE_NAMES.indexOf(move) > -1) {
    return move;
  }

  if (move in USER_TO_RPS_MOVE_MAP) {
    return USER_TO_RPS_MOVE_MAP[move];
  }

  throw new Error('Unrecognized move: ' + move);
}

function Game(strategy) {
  var self = this;

  self.strategy = null; // the strategy the player will play against
  self.rl = null; // used to interact with the command line
  self.lastPlayerMove = null;
  self.playerWins = 0;
  self.strategyWins = 0;
  self.ties = 0;

  function _init() {
    if (strategies[strategy]) {
      self.strategy = new strategies[strategy]();
    } else {
      throw new Error('Unrecognized strategy: ' + strategy);
    }

    self.rl = readline.createInterface(process.stdin, process.stdout);
    self.lastPlayerMove = null;
  }

  _init();
}

/**
 * Start a game of RPS by printing introductory text and getting ready to read from stdin.
 */
Game.prototype.start = function() {
  var self = this;

  self.rl.write(util.format("You are playing against strategy '%s'.\nType 'r', 'p', or 's'.\n", self.strategy));
  self.rl.write("Type 'q' to quit.\n");
  self.rl.setPrompt('>');
  self.rl.prompt();

  self.rl.on('line', (move) => {
    move = move.trim();
    try {
      switch (move) {
        case '':
          break;
        case 'q':
          self.quit();
          break;
        default:
          move = _parseMove(move.trim());
          self.showResults(move, self.strategy.getMove(self.lastPlayerMove));
          self.lastPlayerMove = move;
      }

      self.rl.prompt();
    } catch (e) {
      console.log(e.message);
      self.rl.prompt();
    }
  })
    .on('close', () => {
      self.quit();
    });
};

Game.prototype.quit = function() {
  console.log('Exiting Rock, Paper, Scissors');
  process.exit(0);
};

/**
 * Show the results of the last RPS round, as represented by the provided arguments.
 *
 * @param  {String} playerMove - one of constants.RPS_MOVES
 * @param  {String} strategyMove - one of constants.RPS_MOVES
 */
Game.prototype.showResults = function(playerMove, strategyMove) {
  var self = this;
  var message = 'I chose \'' + RPS_TO_USER_MOVE_MAP[strategyMove] + '\'. ';

  if (constants.RPS_BREAKING_MOVES[playerMove] === strategyMove) {
    self.strategyWins++;
    message += 'I win!';
  } else if (constants.RPS_BREAKING_MOVES[strategyMove] === playerMove) {
    self.playerWins++;
    message += 'You win!';
  } else {
    self.ties++;
    message += 'It\'s a tie!';
  }

  console.log(message);
  console.log('You won ' + self.playerWins + ' time(s).');
  console.log('You lost ' + self.strategyWins + ' time(s).');
  console.log('We tied ' + self.ties + ' time(s).');
};

module.exports = Game;
module.exports.testables = {
  parseMove: _parseMove
};