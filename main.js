const parser = require('body-parser');
const express = require('express');
const mongo = require('./mongodb');
const mysql = require('./mysql');

const app = express();

app.set('view engine', 'ejs');
app.use(parser.urlencoded({
  extended: false
}));
app.use(parser.json());

app.post('/create', (req, res) => {
  if (mysql.countryExists(req.body.code))
    res.send("Code " + req.body.code + " already exists")
  if (req.body.code.length < 3 || req.body.name < 3)
    res.send("Code and name must be longer than 3 characters");

  let q = {
    sql: 'insert into country (co_code, co_name, co_details) values (?, ?, ?)',
    values: [req.body.code, req.body.name, req.body.details]
  };
  mysql.addCountry(q).then((result) => {
    res.send("Successfully added");
  }).catch((err) => {
    console.log(err);
  })
})

app.get('/create', (req, res) => {
  res.render('create');
})

app.post('/create', (req, res) => {
  let q = {
    sql: 'insert into country (co_code, co_name, co_details) values (?, ?, ?)',
    values: [req.body.code, req.body.name, req.body.details]
  };
  mysql.addCountry(q).then((result) => {
    res.send("Successfully added");
  }).catch((err) => {
    console.log(err);
  })
})

app.get('/create', (req, res) => {
  res.render('create');
})

app.get('/details/:id', (req, res) => {
  mysql.getCityDetails(req.params.id).then((result) => {
    if (result.length !== 0)
      res.render('city-details', {city: result})
    else
      res.send("No results");
  }).catch((err) => {
    res.send("No city with code " + id);
  })
})

app.post('/update/:id', (req, res) => {
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