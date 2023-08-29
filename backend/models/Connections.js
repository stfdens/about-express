const { Client } = require('pg');

const client = new Client({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
});

client.on('connect', () => {
  console.log('db conected');
});

module.exports = client;
