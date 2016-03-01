
var router = require('./router');
var http = require('http');

http.createServer(function(request, response){
	router.home(request, response);
	router.article(request, response);
	router.style(request, response);
	// response.end();
}).listen(8080, '127.0.0.1');

console.log('server running successfully at 127.0.0.1');


//Fetch CSS, JavaScript, Images, etc.









