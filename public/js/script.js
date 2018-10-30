'use strict';

let text = "sasdas";
function crearElemento(){
	$('<tr><td><input class="form-control" type="text">' +
	'</td><td><input class="form-control" type="text">' +
	'</td><td><input class="form-control" type="text">' +
	'</td><td><input class="form-control" type="text">' +
	'</td><td><button onClick="guardarInput()" class="btn btn-info" type="submit">guardar</button>' +
	'</td><tr>')
	.prependTo('tbody');
}
function guardarInput(){
	console.log('asdasd')
}
$(function() {
	let trs = $('tr'),
		search = $('#search');

	search.click((e)=>{
		let str = $('#text').val().toLowerCase(),
			res;
		trs.text((f,g)=>{
			if(g.toLowerCase().search(str) !== -1){
				$('#'+f).show('slow');
			} else{
				$('#'+f).hide('slow');
			}
		});
	});
	$('form').submit((e)=>{
		e.preventDefault();
	});
});
