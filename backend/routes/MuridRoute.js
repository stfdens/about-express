const express = require('express');
const MuridController = require('../controller/MuridController');
const authenticateJwt = require('../middleware/authenticateJWT');
const authorize = require('../middleware/authorizeRole');

const app = express.Router();
app.use(authenticateJwt);

app.post('/murid', MuridController.addData);
app.get('/murid', authorize.admin, MuridController.getData);
app.get('/murid/:nama', authorize.guru, MuridController.getDataByNama);
app.get('/murid/nilai/:nama', MuridController.getDataAndNilai);
app.put('/murid/:id', MuridController.updateMuridByName);
app.delete('/murid/:id', MuridController.deleteMuridById);

module.exports = app;
