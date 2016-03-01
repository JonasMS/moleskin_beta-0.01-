var EventEmitter = require('events'); 
var util = require('util');
var https = require('https');
var http = require('http');
var extractor  = require('unfluff');

function Article(articleUrl) {

	EventEmitter.call(this);
	var articleEmitter = this;

	var request = http.get(articleUrl, function (response){

		var body = '';

		if(response.statusCode != 200){
			console.log(response.statusCode); 
			request.abort();
			//emit statusCode error
			articleEmitter.emit('error', new Error('there was an error getting the article'));
			 }

		//concatenate JSON response data chunks
		response.on('data', function(chunk) {
			body += chunk;
			// console.log(body);
		});

		response.on('end', function() {

			// console.log('made it to Articles response.on(end)');

			if(response.statusCode === 200){
				try {
					var articleData = extractor(body); 

				// console.log('made it to Articles JSON.parse');
					//produce 'end' listener for Article, return articleData when called
					articleEmitter.emit('end', articleData);

				} catch (error) {
					console.log('error: ' + error);
					articleEmitter.emit('error', error);

				}
			}
		}).on('error', function(error){
			console.log('error: ' + error);
		});

	});
}

util.inherits(Article, EventEmitter);

module.exports = Article;