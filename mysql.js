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
  pool.query('select * from city').then((result) => {
    res.send(result);
  }).catch((err) => {
    console.log(err);
  })
}