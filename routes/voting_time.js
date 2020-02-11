var express = require('express');
const app = express();

var time_controller = require('../controllers/votingTimeController.js');

app.put('/:start_time', time_controller.update_start_time);
app.get('/', time_controller.get_start_time);

module.exports = app;