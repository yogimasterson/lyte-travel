'use strict';

const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('I am a fun and simple app.')
});

app.listen(port, () => {
  console.log(`listening on localhost://${port}`);
});