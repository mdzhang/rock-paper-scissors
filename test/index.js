'use strict';

var expect = require('chai').expect;
var assert = require('chai').assert;

var utils = require('../src/utils');
var constants = require('../src/constants');
var BeatFavoriteStrategy = require('../src/strategies/beat_favorite');
var RandomStrategy = require('../src/strategies/random');
var BeatLastMoveStrategy = require('../src/strategies/beat_last_move');
var Game = require('../src/game');

describe('rock-paper-scissor', function() {

  describe('utils', function() {

    describe('getBreakingMove', function() {
      it('should get the move that breaks the given move for all moves', function() {
        assert.equal(utils.getBreakingMove(constants.RPS_MOVES.ROCK), constants.RPS_MOVES.PAPER);
        assert.equal(utils.getBreakingMove(constants.RPS_MOVES.PAPER), constants.RPS_MOVES.SCISSOR);
        assert.equal(utils.getBreakingMove(constants.RPS_MOVES.SCISSOR), constants.RPS_MOVES.ROCK);
      });
    });

    describe('getRandomMove', function() {
      it('should get a valid, random move', function() {
        assert.notEqual(constants.RPS_MOVE_NAMES.indexOf(utils.getRandomMove()), -1);
      });
    });

  });

  describe('strategies', function() {

    describe('RandomStrategy', function() {
      it('should give any valid move', function() {
        var randomStrategy = new RandomStrategy();
        expect(constants.RPS_MOVE_NAMES).to.include(randomStrategy.getMove());
      });
    });

    describe('BeatFavoriteStrategy', function() {
      it('should give a valid move even when it has no move history for the opponent', function() {
        var beatFavoriteStrategy = new BeatFavoriteStrategy();
        expect(constants.RPS_MOVE_NAMES).to.include(beatFavoriteStrategy.getMove(null));
      });

      it('should choose the move that breaks the opponents most commonly used move', function() {
        var beatFavoriteStrategy = new BeatFavoriteStrategy();
        expect(beatFavoriteStrategy.getMove(constants.RPS_MOVES.ROCK)).to.equal(constants.RPS_MOVES.PAPER);
        expect(beatFavoriteStrategy.getMove(constants.RPS_MOVES.PAPER)).to.equal(constants.RPS_MOVES.PAPER);
        expect(beatFavoriteStrategy.getMove(constants.RPS_MOVES.PAPER)).to.equal(constants.RPS_MOVES.SCISSOR);
      });
    });

    describe('BeatLastMoveStrategy', function() {
      it('should give a valid move even when it has no move history for the opponent', function() {
        var beatLastMoveStrategy = new BeatLastMoveStrategy();
        expect(constants.RPS_MOVE_NAMES).to.include(beatLastMoveStrategy.getMove(null));
      });

      it('should choose the move that breaks the opponents last used move', function() {
        var beatLastMoveStrategy = new BeatLastMoveStrategy();
        expect(beatLastMoveStrategy.getMove(constants.RPS_MOVES.ROCK)).to.equal(constants.RPS_MOVES.PAPER);
        expect(beatLastMoveStrategy.getMove(constants.RPS_MOVES.PAPER)).to.equal(constants.RPS_MOVES.SCISSOR);
        expect(beatLastMoveStrategy.getMove(constants.RPS_MOVES.SCISSOR)).to.equal(constants.RPS_MOVES.ROCK);
      });

    });

  });

  describe('game', function() {

    describe('parseMove', function() {
      it('should parse a user formatted move into an internally formatted move', function() {
        assert.equal(Game.testables.parseMove('r'), constants.RPS_MOVES.ROCK);
        assert.equal(Game.testables.parseMove('p'), constants.RPS_MOVES.PAPER);
        assert.equal(Game.testables.parseMove('s'), constants.RPS_MOVES.SCISSOR);
      });

      it('should return already internally formatted move as is', function() {
        assert.equal(Game.testables.parseMove(constants.RPS_MOVES.ROCK), constants.RPS_MOVES.ROCK);
        assert.equal(Game.testables.parseMove(constants.RPS_MOVES.PAPER), constants.RPS_MOVES.PAPER);
        assert.equal(Game.testables.parseMove(constants.RPS_MOVES.SCISSOR), constants.RPS_MOVES.SCISSOR);
      });

      it('should throw an error on an unrecognized move', function() {
        try {
          Game.testables.parseMove('blah');
        } catch (e) {
          assert.equal(e.message, 'Unrecognized move: blah');
        }
      });
    });

  });

});