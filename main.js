const ejs = require('ejs');
const express = require('express');
const mysql = require('./mysql');

const app = express();

app.set('view engine', 'ejs');

app.get('/hos', (req, res) => {
  res.render('hos');
})

app.get('/cities', (req, res) => {
  res.render('cities');
})

app.get('/countries', (req, res) => {
  mysql.getCountries().then((result) => {
    res.render('countries', {countries: result})
  }).catch((err) => {
    res.send(err);
  })
})

app.get('/', (req, res) => {
  res.render('index');
})

app.listen(3004, () => {
  console.log("Listening on port 3004");
})