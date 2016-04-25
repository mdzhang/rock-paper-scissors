'use strict';

var Game = require('./src/game');

if (process.argv.length !== 3) {
  console.log('Usage: npm start [strategy]');
  process.exit(1);
}

try {
  var g = new Game(process.argv[2]);
  g.start();
} catch (e) {
  console.log(e.message);
  process.exit(1);
}