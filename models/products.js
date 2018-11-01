const mongoose = require('mongoose');

const productoStock = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	nombre: String,
	descripcion: String,
	precioVenta: Number,
	precioCompra: Number,
	cantidad: Number,
	created: Date
});

module.exports = mongoose.model('Product', productoStock);