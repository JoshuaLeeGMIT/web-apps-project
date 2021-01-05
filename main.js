const ejs = require('ejs');
const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.get('/hos', (req, res) => {
  res.render('hos');
})

app.get('/cities', (req, res) => {
  res.render('cities');
})

app.get('/countries', (req, res) => {
  res.render('countries');
})

app.get('/', (req, res) => {
  res.render('index');
})

app.listen(3004, () => {
  console.log("Listening on port 3004");
})