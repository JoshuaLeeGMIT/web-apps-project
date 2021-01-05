const { query } = require('express');
const mysql = require('promise-mysql');

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

var addCountry = function(code, name, details) {
  return new Promise((resolve, reject) => {
    let q = {
      sql: 'insert into country (co_code, co_name, co_details) values (?, ?, ?)',
      values: [code, name, details]
    };
    pool.query(q).then((result) => {
      resolve(result);
    }).catch((err) => {
      reject(err);
    })
  })
}

var getCityDetails = function(id) {
  return new Promise((resolve, reject) => {
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

var delCountry = function(id) {
  return new Promise((resolve, reject) => {
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

var getCountries = function() {
  return new Promise((resolve, reject) => {
    pool.query('select * from country').then((result) => {
      resolve(result);
    }).catch((err) => {
      reject(err);
    })
  })
}

var getCities = function() {
  return new Promise((resolve, reject) => {
    pool.query('select * from city').then((result) => {
      resolve(result);
    }).catch((err) => {
      reject(err);
    })
  })
}

module.exports = {getCountries, getCities, delCountry, getCityDetails, addCountry}