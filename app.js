'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const mongoose = require('mongoose');
const Product = require('./models/products.js');

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

app.use((req, res, next) => {
	const error = new Error("Not found");
  	error.status = 404;
  	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
  	res.json({
    	error: {
      		message: error.message
    	}
  	});
});

let server = app.listen(process.env.PORT || 80, listen);

// This call back just tells us that the server has started
function listen() {
	let host = server.address().address;
	let port = server.address().port;
	console.log('listening at http://' + host + ':' + port);
}

module.exports = app;