const express = require('express');
const mongo = require('./mongodb');
const mysql = require('./mysql');

const app = express();

app.set('view engine', 'ejs');

app.get('/details/:id', (req, res) => {
  mysql.getCityDetails(req.params.id).then((result) => {
    res.render('city-details', {city: result})
  }).catch((err) => {
    res.send("No city with code " + id);
  })
})

app.get('/update/:id', (req, res) => {
  res.send(req.params.id);
})

app.get('/delete/:id', (req, res) => {
  mysql.delCountry(req.params.id).then((result) => {
    if (result.affectedRows > 0)
      res.send("Delete successful");
    else
      res.send("Non-existent country");
  }).catch((err) => {
    res.send(err);
  })
})

app.get('/hos', (req, res) => {
  mongo.getHos().then((result) => {
    res.render('hos', {heads: result})
  }).catch((err) => {
    res.send(err);
  })
})

app.get('/cities', (req, res) => {
  mysql.getCities().then((result) => {
    res.render('cities', {cities: result})
  }).catch((err) => {
    res.send(err);
  })
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