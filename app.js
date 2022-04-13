const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');
const app = express();

app.listen(PORT, () => {
});

app.get('/', (req, res) => {
  res.send('Есть коннект');
});
