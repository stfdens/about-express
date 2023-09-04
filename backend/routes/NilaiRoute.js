const express = require('express');
const NilaiController = require('../controller/NilaiController');

const app = express.Router();

app.post('/nilai', NilaiController.addNilai);
app.put('/nilai/:nama', NilaiController.updateNilai);

module.exports = app;
