/* Includes/requires. */
const parser = require('body-parser');
const express = require('express');
const mongo = require('./mongodb');
const mysql = require('./mysql');

/* Assign app. */
const app = express();

/* Set up ejs and body-parser. */
app.set('view engine', 'ejs');
app.use(parser.urlencoded({
  extended: false
}));
app.use(parser.json());

/* Handle POST for updates page, taking in id and passing it
 * to MySQL DOA for handling.
 */
app.post('/update/:id', (req, res) => {
  /* Ensure data meets minimum requirements. */
  if (req.body.code.length < 3 || req.body.name < 3)
    res.send("Code and name must be longer than 3 characters");

  /* Construct MySQL query. */
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

/* Handle GET for updates page. Importantly, get the details for
 * the co_code to use as placeholders for the form.
 */
app.get('/update/:id', (req, res) => {
  mysql.getCountryDetails(req.params.id).then((result) => {
    /* Ensure a result came back. */
    if (result.length !== 0)
      res.render('update', {country: result})
    else
      res.send("No results");
  }).catch((err) => {
    console.log(err);
  })
})

/* Handle POST for create heads of state page. */
app.post('/create-hos', (req, res) => {
  /* Check if co_code exists in DB. */
  if (!mysql.countryExists(req.body.code))
    res.send("Cannot add head of state for non-existent country " + req.body.code);
  /* Ensure data meets minimum requirements. */
  if (req.body.code.length < 3 || req.body.name.length < 3)
    res.send("Country code and head of state must be at least 3 characters");
  
  /* Construct MongoDB statement. */
  let hos = {
    code: req.body.code,
    name: req.body.name
  };
  mongo.addHos(hos).then((result) => {
    /* On success, return to the hos page. */
    res.render('hos');
  }).catch((err) => {
    console.log(err);
  })
})

/* Handle POST on create page. Get the data with body-parser and
 * send it to the MySQL DOA for handling.
 */
app.post('/create', (req, res) => {
  /* Check if co_code exiss in database. */
  if (mysql.countryExists(req.body.code))
    res.send("Code " + req.body.code + " already exists")
  /* Ensure data meets minimum requirements. */
  if (req.body.code.length < 3 || req.body.name < 3)
    res.send("Code and name must be longer than 3 characters");

  /* Construct MySQL statement. */
  let q = {
    sql: 'insert into country (co_code, co_name, co_details) values (?, ?, ?)',
    values: [req.body.code, req.body.name, req.body.details]
  };
  mysql.addCountry(q).then((result) => {
    /* On success, return to countries page. */
    res.render('countries');
  }).catch((err) => {
    console.log(err);
  })
})

/* Handle GET on create page. */
app.get('/create', (req, res) => {
  res.render('create');
})

/* Handle GET for details page based on id. */
app.get('/details/:id', (req, res) => {
  mysql.getCityDetails(req.params.id).then((result) => {
    /* Ensure a result was returned from query. */
    if (result.length !== 0)
      /* Render city-details page. */
      res.render('city-details', {city: result})
    else
      res.send("No results");
  }).catch((err) => {
    res.send("No city with code " + id);
  })
})

/* Handle POST on update page. */
app.post('/update/:id', (req, res) => {
  res.send(req.params.id);
})

/* Handle GET for delete page and pass id to MySQL DOA. */
app.get('/delete/:id', (req, res) => {
  mysql.delCountry(req.params.id).then((result) => {
    /* Ensure deletion was actually done before returning
     * success message to user.
     */
    if (result.affectedRows > 0)
      res.send("Delete successful");
    else
      res.send("Non-existent country");
  }).catch((err) => {
    res.send(err);
  })
})

/* Handle GET on heads of state page. */
app.get('/hos', (req, res) => {
  mongo.getHos().then((result) => {
    res.render('hos', {heads: result})
  }).catch((err) => {
    res.send(err);
  })
})

/* Handle GET on cities page. */
app.get('/cities', (req, res) => {
  mysql.getCities().then((result) => {
    res.render('cities', {cities: result})
  }).catch((err) => {
    res.send(err);
  })
})

/* Handle GET on countries page. */
app.get('/countries', (req, res) => {
  mysql.getCountries().then((result) => {
    res.render('countries', {countries: result})
  }).catch((err) => {
    res.send(err);
  })
})

/* Handle GET on index. */
app.get('/', (req, res) => {
  res.render('index');
})

app.listen(3004, () => {
  console.log("Listening on port 3004");
})