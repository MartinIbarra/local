'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const mongoose = require('mongoose');
const routes = require('./routes/routes.js');

mongoose.connect('mongodb://localhost/localDb', (err) => {
	if (err) {
   		return err
   	};
   	console.log('Successfully connected');
});

app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/', routes);
app.use('/stock', routes);


module.exports = app;