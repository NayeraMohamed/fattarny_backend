var express = require('express');
const app = express();

var winner_controller = require('../controllers/winnerRestaurantsController.js');

app.post('/:date', winner_controller.getTodaysWinner);

module.exports = app;