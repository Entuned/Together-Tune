const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


/// this connected to the client side; uncomment this when working in the client side
const CLIENT_PATH = path.resolve(__dirname, '../client/dist');
const app = express();

app.use(bodyParser.json());
app.use(express.static(CLIENT_PATH));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

module.exports = {
  app,
};