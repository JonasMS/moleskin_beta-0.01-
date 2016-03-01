//pull content of web files
var querystring = require('querystring');
var url = require('url');

var renderer = require('./renderer.js');
var Article = require('./article.js');

function home(request, response) {

	// console.log(request.url + ' has entered home function');

	if (request.url === '/'){
		if(request.method.toLowerCase() === 'get'){

			// console.log(request.url + ' has entered home function IF');

			response.writeHead(200, {'Content-Type': 'text/html'});		
			renderer.writeHTML('header', {}, response);
			renderer.writeHTML('search', {}, response);
			renderer.writeHTML('footer', {},  response);
			response.end();
		} else { //if '/' && POST
			// console.log('have entered home function ELSE')
			request.on('data', function (postBody) {

				// console.log('postBody: ' + postBody);

				var link = decodeURIComponent(postBody);
				link = querystring.parse(link);

				// console.log('link: ' + link.url);
				
				response.writeHead(303, {'Location': '/' + link.url});
				response.end();				
			});
		}
	}

}

function article(request, response) {
	var articleUrl = request.url.replace('/', '');

	// console.log('have entered article function');
	// console.log('articleUrl: ' + articleUrl);

	//TODO: make isNotFileType([css, ico, js]) function
 	if(articleUrl.length > 0 && articleUrl.indexOf('.css') === -1 && articleUrl.indexOf('.ico') === -1 && articleUrl.indexOf('.js') === -1 ){

		console.log(articleUrl + ' has entered article functions IF');

		response.writeHead(200, {'Content-Type': 'text/html'});
		renderer.writeHTML('header', {}, response);

		//write article content
			//fetch article content
			var importedArticle = new Article(articleUrl);
			importedArticle.on('end', function(articleData) {

				var articleValues = {
					title: articleData.title,
					publisher: articleData.publisher,
					authors: articleData.author,
					date: articleData.date,
					url: articleUrl,
					content: articleData.text
				};

				console.log(articleValues);

				renderer.writeHTML('article', articleValues,  response);

				console.log('wrote article');

				renderer.writeHTML('footer', {},  response);
				response.end();
		});

		importedArticle.on('error', function(error){
			console.log('article error: ' + error.message);
		});

	}
} 


function style(request, response) {
	// console.log('have entered style function');
	// console.log('request.url: ' + request.url.toString());

	if(request.url.indexOf('.css') != -1){

		// console.log(request.url + ' has entered style functions IF');

		response.writeHead(200, {'Content-Type': 'text/css'});
		renderer.writeStyle('/views' + request.url, response);
		response.end();
	}

	else if (request.url.indexOf('.js') != -1){

		console.log(request.url + ' has entered style functions IF');
		setTimeout(function() {
			response.writeHead(200, {'Content-Type': 'text/javascript'});
			renderer.writeStyle(request.url, response);

			console.log(request.url + ' has written in style functions IF');

			response.end();
		}, 1000);
	}
}


module.exports.home = home;
module.exports.article = article;
module.exports.style = style;
