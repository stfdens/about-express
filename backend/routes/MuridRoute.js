const MuridController = require('../controller/MuridController');
const express = require('express')

const app = express.Router();

app.post('/murid', MuridController.addData);
app.get('/murid', MuridController.getData);
app.get('/murid/:nama', MuridController.getDataByNama);
app.put('/murid/:id', MuridController.updateMuridByName);
app.delete('/murid/:nama', MuridController.deleteMuridByName);

module.exports = app;
