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

app.post('/update/:id', (req, res) => {
  if (req.body.code.length < 3 || req.body.name < 3)
    res.send("Code and name must be longer than 3 characters");

  let q = {
    sql: 'update country set co_name = ?, co_details = ?',
    values: [req.body.name, req.body.details]
  };
  mysql.addCountry(q).then((result) => {
    res.send("Successfully updated");
  }).catch((err) => {
    console.log(err);
  })
})

app.get('/update/:id', (req, res) => {
  mysql.getCountryDetails(req.params.id).then((result) => {
    if (result.length !== 0)
      res.render('update', {country: result})
    else
      res.send("No results");
  }).catch((err) => {
    console.log(err);
  })
})

app.post('/create-hos', (req, res) => {
  if (!mysql.countryExists(req.body.code))
    res.send("Cannot add head of state for non-existent country " + req.body.code);
  if (req.body.code.length < 3 || req.body.name.length < 3)
    res.send("Country code and head of state must be at least 3 characters");
  
  let hos = {
    code: req.body.code,
    name: req.body.name
  };
  mongo.addHos(hos).then((result) => {
    res.render('hos');
  }).catch((err) => {
    console.log(err);
  })
})

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
    res.render('countries');
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