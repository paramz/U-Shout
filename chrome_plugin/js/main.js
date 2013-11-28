// this wrapper ensures script integrity
(function (window, document, undefined) {
	var $document = $(document);
	
	// this jQuery wrapper ensures that the function gets executed right after the DOM is ready
	$document.ready(function () {
		console.log('dom ready');
	});

	// macro functions for logs
	function log(msg) {
		console.log('ushout: ' + String(msg));
	}
	function warn(msg) {
		console.warn('ushout: ' + String(msg));
	}
	// this function adds the prefix 'ushout_' to the given string to avoid conflicts
	function _u(str) {
		var result = '';
		for (var i = 0, n = arguments.length; i < n; ++i) {
			if (result !== '') result += ' ';
			result += 'ushout_' + String(arguments[i]);
		}
		return result;
	}

	// setup to receive signals
	window.addEventListener("message", function(event) {
		// We only accept messages from ourselves
		if (event.source != window)
			return;
		
		if (event.data.signature && (event.data.signature === 'ushout')) {
			var signal = event.data.content;
			var funcName = String(signal.name);
			var funcVal = [];
			// swallow copy the array signal.val
			$.each(signal.val, function (index, value) {funcVal[index] = value;});
			
			if (typeof window[funcName] === 'function') {
				log('signal <' + funcName + '>.');
				window[funcName].apply(window, funcVal);
			} else {
				warn('invalid signal <' + funcName + '>: function not found.');
			}
		}
	}, false);
	$.getScript('http://lab.icradle.net/ushout/js/chrome_extension.js', function( data, textStatus, jqxhr ) {});

	$(function () {
		ushout($(document.body), log, warn, _u);
	});
})(window, document);