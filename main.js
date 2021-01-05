const express = require('express');
const app = express();

app.get('/', (res, req) => {
  res.send("Hello, world!");
})

app.listen(3004, () => {
  console.log("Listening on port 3004");
})