
// code that should be taken care of right away

// window.onload = init;

// function init(){

  console.log('imported js file works');


	var textBody = document.getElementById('content');
	var highlightButton = document.getElementById('highlightButton');

	function getHighlighted() {

		//assign values to highlight substring (start, end)
			//get values using window.selection

		var selection = document.getSelection();
		var range = selection.getRangeAt(0);

		// if(range.startOffset > range.endOffset);

		var start = range.startOffset
		var end = range.endOffset

		// var textToHighlight = selection.anchorNode.parentElement.innerHTML;
		var targetElement = selection.anchorNode.parentElement.id;
		var targetTextBody = document.getElementById(targetElement); 

		targetTextBody.innerHTML = targetTextBody.innerHTML.substring(0, start).concat('<span class="highlighted">', targetTextBody.innerHTML.substring(start, end), '</span>', targetTextBody.innerHTML.substring(end));

		console.log('start: ' + start + 'end: ' + end);


		//document.getElementById(targetPar).innerHTML = targetTextBody;

		// console.log('selection: ' + selection);
		// console.log('targetEl: ' + targetEl);
		// console.log('range: ' + range);

		// console.log(typeof targetEl);
		// console.log(targetEl); 

		// console.log('start: ' + start + ' 	' + targetEl.charAt(start));

		// console.log('start: ' + start + '' + selection.charAt(start));
		// console.log('end: ' + end + '' + selection.charAt(end));
		// alert('start: ' + start + 'end: ' + end);
	}


	function setHighlight(start, end) {
		//insert span w/ class 'highlight' at start
		//insert /span at end
	}

	//TODO: create highlight button on onselect event


	function highlightHandler() {
		console.log('js button works');
		// alert('js button works');
		getHighlighted();
	}

	//Button Actions
	highlightButton.addEventListener('click', highlightHandler);
	// textBody.addEventListener('select', getHighlighted());

	// textBody.addEventListener('onselect', getHighlighted);
	textBody.onselect = getHighlighted();


// }





