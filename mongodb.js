const mongo = require('mongodb').MongoClient;

/* Connect to MongoDB database. */
mongo.connect('mongodb://localhost:27017').then((client) => {
  db = client.db('headsOfStateDB')
  coll = db.collection('headsOfState')
}).catch((err) => {
  console.log(err);
})

/* Function to add a head of state to database. */
var addHos = function(hos) {
  return new Promise((resolve, reject) => {
    coll.insertOne(hos).then((docs) => {
      resolve(docs);
    }).catch((err) => {
      reject(err);
    })
  })
}

/* Function to return all data in database. */
var getHos = function() {
  return new Promise((resolve, reject) => {
    coll.find().toArray().then((docs) => {
      resolve(docs)
    }).catch((err) => {
      reject(err);
    })
  })
}

module.exports = {getHos, addHos}