const express = require('express');
const AuthController = require('../controller/AuthController');

const app = express.Router();

app.post('/login', AuthController.login);

module.exports = app;
