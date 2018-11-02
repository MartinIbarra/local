'use strict';
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
	$('#buscador').submit((e)=>{
		e.preventDefault();
	});
});
