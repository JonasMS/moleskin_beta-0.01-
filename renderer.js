//place file contents on screen

var fs = require('fs');

function writeHTML(fileName, values, response) {
	var fileContents = fs.readFileSync('./views/' + fileName + '.html', {encoding: 'utf-8'});

	// console.log('values.content: ' + values.content);

	//insert <p></p> into article content
	if(values.content !== undefined) { 
		values.content = insertFormat(values.content); 
	} 

	// console.log('values.content: ' + values.content);

	fileContents = mergeValues(fileContents, values);


	response.write(fileContents);
}

function writeStyle(fileName, response) {
	var fileContents = fs.readFileSync(__dirname + fileName);
	response.write(fileContents);
}

function mergeValues(fileContents, values){

	for(var key in values){
		fileContents = fileContents.replace('{{' + key + '}}', values[key]);
	}
	return fileContents;
}

//insert paragraphs <p></ps>'s
function insertFormat (textBody) {
	//indicators
	var startedNewPar = false;
	var hasInputText = false;
	var idCount = 1;

	//prepend <p> to beginning of first paragraph
	textBody = '<p id="par0">'.concat(textBody);

	//cycle over every char of inputed body of text
	for(var i = 0; i < textBody.length; i++){

		var char = textBody.charAt(i);

		if(char === '\n' || char === '\r\n'){

			if(hasInputText) {
				textBody = textBody.replace(char, '</p><p id="par' + idCount +  '">');
				hasInputText = false;

				//to stop 'p' in <p> from tripping isLetter(char)
				i += 16;
				idCount++;

			//remove spurious \n's
			} else {
				textBody = textBody.replace(char, '');
			}

		//if char is a letter & paragraph has NOT started
		} else if (isLetter(char) && !hasInputText) { 
			hasInputText = true;
				// console.log('index: ' + i + ' char: ' + char);
			}

	}
	return textBody;
}


// function insertFormat (textBody) {
// 	//indicators
// 	var startedNewPar = false;
// 	var hasInputText = false;
// 	//cycle over every char of inputed body of text
// 	for(var i = 0; i < textBody.length; i++){

// 		var char = textBody.charAt(i);
// 		// console.log('char: ' + char + '  i: ' + i);

// 		if(char === '\n'){
// 				// console.log('index: ' + i + ' char: ' + char);

// 			if(!startedNewPar) {
// 				textBody = textBody.replace(char, '<p>');
// 				startedNewPar = true;
// 				hasInputText = false;

// 				//to stop 'p' in <p> from tripping isLetter(char)
// 				i++;

// 			//if hasInputText === T && char == '\n'
// 			} else if (hasInputText){ 
// 				textBody = textBody.replace(char, '</p>');

// 				//reset indicators
// 				startedNewPar = false;
// 				hasInputText = false;
// 			} else {
// 				textBody = textBody.replace(char, '');
// 			}

// 		//if char is a letter & startedNewPar === T
// 		} else if (isLetter(char) && startedNewPar) { 
// 			hasInputText = true;
// 				// console.log('index: ' + i + ' char: ' + char);
// 			}
// 	}

// 	console.log('textBody: ' + textBody);
// 	return textBody;
// }

function isLetter(char) {
	var charCode = char.charCodeAt(0); 
	if(charCode > 64 && charCode < 123) {
		return true;
	} else return false;
}


//Fetch HTML (article content)
function produceArticle(request, response) {
	//write all html that goes above the article contents
	response.writeHead(200, {'Content-Type': 'text/html'});
	writeHTML('header', response);
	
	//retrieve the article contents

	//write the article contents
	writeHTML('article', response);

	//write all the html that goes below the article contents
	
	response.end(writeHTML('footer', response));
}


module.exports.writeStyle = writeStyle;
module.exports.writeHTML = writeHTML;