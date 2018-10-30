'use strict';

const excelToJson = require('convert-excel-to-json');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');

let text = excelToJson({
	sourceFile: './db/Lista de precios Computers-K O.xls'
});

let dV = 38,
	dC = 39.5;

fs.writeFile('log.txt', JSON.stringify(text['Hoja1']), (err) => {
	if (err){
		console.log(err);
	};
	console.log('The file has been saved!');
});

function fixExcel(){
	let res;
	Object.keys(text['Hoja1']).forEach((e, i)=>{
		Object.keys(text['Hoja1'][i]).forEach((elem, index)=>{
			if(index == 3){
				if(text['Hoja1'][e][elem].indexOf('.') !== -1 && text['Hoja1'][e][elem].indexOf(',') !== -1){
					text['Hoja1'][e][elem] = text['Hoja1'][e][elem].replace('.','');
				}
				res = text['Hoja1'][e][elem].replace(',', '.').split(' ')[1];
				if(text['Hoja1'][e][elem].indexOf(',') !== -1){
					text['Hoja1'][e][elem] = (parseFloat(res)*dV/dC).toFixed(2);
				}
			}
		});
	});
};

app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
	fixExcel();
	res.render('index', {
		layout: 'layout',
		title: 'Local',
		msg: text['Hoja1']
	});
});

app.get('/stock', function (req, res){
	console.log(req.statusCode);
	res.render('stock');
});

let server = app.listen(process.env.PORT || 80, listen);

// This call back just tells us that the server has started
function listen() {
	let host = server.address().address;
	let port = server.address().port;
	console.log('listening at http://' + host + ':' + port);
}
