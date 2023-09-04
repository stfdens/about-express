const express = require('express');
const MuridController = require('../controller/MuridController');
const authenticateJwt = require('../middleware/authenticateJWT');

const app = express.Router();
app.use(authenticateJwt);

app.post('/murid', MuridController.addData);
app.get('/murid', MuridController.getData);
app.get('/murid/:nama', MuridController.getDataByNama);
app.put('/murid/:id', MuridController.updateMuridByName);
app.delete('/murid/:id', MuridController.deleteMuridById);

module.exports = app;
