var express = require('express');
const app = express();

var user_controller = require('../controllers/userController.js');

app.post('/register', user_controller.register);
app.post('/login', user_controller.login);

module.exports = app;