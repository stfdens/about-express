/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
require('dotenv').config();
const AccountRoute = require('./routes/AccountRoute');

// database
const client = require('./models/Connections');

const app = express();
const cors = require('cors');

client.connect();

const port = process.env.PORTS;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(AccountRoute);

app.listen(port, () => {
  console.log(`this backend runing on http://localhost:${port}`);
});
