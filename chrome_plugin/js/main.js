// this wrapper ensures script integrity
(function (window, document, undefined) {
	// this jQuery wrapper ensures that the function gets executed right after the DOM is ready
	$(document).ready(function () { console.log('dom ready'); });
	
	$(function () {
		ushout($(document.body));
	});
})(window, document);