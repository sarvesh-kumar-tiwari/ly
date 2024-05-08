const express = require('express');
const mongoose = require('mongoose');
const urlRoutes = require('./routes/urlRoutes');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(urlRoutes);
let PORT = process.env.PORT | 5000;
app.listen(PORT, () => console.log('Server is running on port 5000'));
