const express = require('express');
const mysql = require('promise-mysql');

const app = express();
const pool = mysql.createPool({
  connectionLimit: 16,
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'geography'
})

app.get('/', (req, res) => {
  res.send("Hello, world!");
})

app.listen(3004, () => {
  console.log("Listening on port 3004");
})