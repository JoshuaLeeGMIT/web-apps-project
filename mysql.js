/* Includes/requires. */
const { query } = require('express');
const mysql = require('promise-mysql');

/* Connect. */
mysql.createPool({
  connectionLimit: 2,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'geography'
}).then((result) => {
  pool = result;
}).catch((err) => {
  console.log(err);
})

/* Simple function to check if a co_code already exists
 * in table.
 */
var countryExists = function(code) {
  let q = {
    sql: 'select * from country where co_code = ?',
    values: [code]
  };
  new Promise((resolve, reject) => {
    pool.query(q).then((result) => {
      if (result.length === 0)
        resolve(false);
      else
        resolve(true);
    }).catch((err) => {
      console.log(err);
    })
  })
}

/* Function to add country to database, based on query
 * constructed in main.js.
 */
var addCountry = function(query) {
  return new Promise((resolve, reject) => {
    pool.query(query).then((result) => {
      resolve(result);
    }).catch((err) => {
      reject(err);
    })
  })
}

/* Function to get single row from database country table
 * based on id passed in from main.js.
 */
var getCountryDetails = function(id) {
  return new Promise((resolve, reject) => {
    /* Construct query. */
    let q = {
      sql: 'select * from country where co_code = ?',
      values: [id]
    };
    pool.query(q).then((result) => {
      resolve(result);
    }).catch((err) => {
      reject(err);
    })
  })
}

/* Function to get single row from database city table
 * based on id passed in from main.js.
 */
var getCityDetails = function(id) {
  return new Promise((resolve, reject) => {
    /* Construct query. */
    let q = {
      sql: 'select * from city where cty_code = ?',
      values: [id]
    };
    pool.query(q).then((result) => {
      resolve(result);
    }).catch((err) => {
      reject(err);
    })
  })
}

/* Function to delete row from country table based
 * on id passed in from main.js.
 */
var delCountry = function(id) {
  return new Promise((resolve, reject) => {
    /* Construct query. */
    let q = {
      sql: 'delete from country where co_code = ?',
      values: [id]
    };
    pool.query(q).then((result) => {
      resolve(result);
    }).catch((err) => {
      console.log(err);
    })
  })
}

/* Function to get all rows from country table. */
var getCountries = function() {
  return new Promise((resolve, reject) => {
    pool.query('select * from country').then((result) => {
      resolve(result);
    }).catch((err) => {
      reject(err);
    })
  })
}

/* Function to get all rows from city table. */
var getCities = function() {
  return new Promise((resolve, reject) => {
    pool.query('select * from city').then((result) => {
      resolve(result);
    }).catch((err) => {
      reject(err);
    })
  })
}

module.exports = {getCountries, getCities, delCountry, getCityDetails, getCountryDetails, addCountry, countryExists}