const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, err =>{
	if(err){
		console.log(err)
	}
	console.log('the magick happens on port:' + port)
});