var express = require('express');
const app = express();

var votes_controller = require('../controllers/votesController.js');

app.post('/', votes_controller.addVote);

module.exports = app;