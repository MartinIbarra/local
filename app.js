'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const mongoose = require('mongoose');
const routes = require('./routes/routes.js');

mongoose.connect('mongodb://localhost/localDb', { useNewUrlParser: true },(err) => {
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

//Error handling
app.use((req, res, next) => {
	const error = new Error('not found');
	error.status('404');
	next(error);
});

app.use((error, req, res, next) =>{
	res.status(error.status || 500);
	res.render('error', {error});
})


module.exports = app;