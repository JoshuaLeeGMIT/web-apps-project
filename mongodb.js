const mongo = require('mongodb').MongoClient;

mongo.connect('mongodb://localhost:27017').then((client) => {
  db = client.db('headsOfStateDB')
  coll = db.collection('headsOfState')
}).catch((err) => {
  console.log(err);
})

var addHos = function(hos) {
  return new Promise((resolve, reject) => {
    coll.insertOne(hos).then((docs) => {
      resolve(docs);
    }).catch((err) => {
      reject(err);
    })
  })
}

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