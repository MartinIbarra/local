const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/products');

const excelToJson = require('convert-excel-to-json');

let text = excelToJson({
	sourceFile: './db/Lista de precios Computers-K O.xls'
});

let dV = 38,
	dC = 39.5;

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

router.get('/', (req, res) => {
	fixExcel();
	res.render('index', {
		layout: 'layout',
		title: 'Local',
		msg: text['Hoja1']
	});
});

router.get('/stock', (req, res) => {
	Product.find()
	.exec()
	.then(result =>{
		res.status(201).render('stock', {message:result});
	})
	.catch(err =>{
		console.log(err)
		res.status(500).render('stock', {err: err});
	});
});

router.post('/stock', (req, res) =>{
	const product = new Product ({
		categoria: req.body.cat,
		descripcion: req.body.desc,
		precioVenta: req.body.precioVenta,
		precioCompra: req.body.precioCompra,
		cantidad: req.body.cant
	});
	product.save()
	.then(result =>{
		console.log(result);
	}).catch(err =>{
		console.log(err);
	});
	res.status(201).render('stock');
});

module.exports = router;