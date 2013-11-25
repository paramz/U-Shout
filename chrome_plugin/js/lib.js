function ushout($body) {
	// macro functions
	function log(msg) {
		console.log('ushout: ' + String(msg));
	}
	function warn(msg) {
		console.warn('ushout: ' + String(msg));
	}
	
	// url check
	var href = window.location.pathname.toLowerCase();
	// the player page should have pathname '/watch'
	if (href !== '/watch') {
		// hault if not the right page
		log('not watch page');
		return;
	}
	
	var query = window.location.search;
	////////////////////////////////////////////////////////////////////
	
	log(query);
	
	log('loading');
	
	$body.addClass('ushout');
	
	var youtube = {};
	
	youtube.$bodyContainer = $body.find("#body-container");
	if (youtube.$bodyContainer.length !== 1) {
		return;
	}
	log('#body-container check');
	
	youtube.$pageContainer = youtube.$bodyContainer.find("#page-container");
	if (youtube.$pageContainer.length !== 1) {
		return;
	}
	log('#page-container check');
	
	youtube.$page = youtube.$pageContainer.find("#page");
	if (youtube.$page.length !== 1) {
		return;
	}
	log('#page check');
	
	youtube.$player = youtube.$page.find("#player");
	if (youtube.$player.length !== 1) {
		warn('fail because can not find player wrapper on this page.');
		return;
	}
	log('#player check');
	
	youtube.$playerapi = youtube.$player.find("#player-api");
	if (youtube.$playerapi.length !== 1) {
		warn('fail because can not find player on this page.');
		return;
	}
	log('#player-api check');
	
	youtube.$playlist = youtube.$player.find("#playlist");
	if (youtube.$playlist.length !== 1) {
	//	warn('fail because can not find playlist wrapper on this page.');
		return;
	}
	log('#playlist check');
	
	youtube.$playertray = youtube.$player.find("#playlist-tray");
	if (youtube.$playertray.length !== 1) {
	//	warn('fail because can not find playlist tray on this page.');
		return;
	}
	log('#playlist-tray check');
	
	youtube.$guide = youtube.$page.find("#guide");
	if (youtube.$guide.length !== 1) {
	//	warn('fail because can not find guide wrapper on this page.');
		return;
	}
	log('#guide check');
	
	youtube.$content = youtube.$page.find("#content");
	if (youtube.$content.length !== 1) {
	//	warn('fail because can not find content wrapper on this page.');
		return;
	}
	log('#content check');
	
	
	
	
	// apply ushout css
	// 
	// apparently this approach doesn't work well enough, thank to Youtube video redirecting mechanism.
	// when page redirects from a video with a playlist, the inserted contents are lost.
	// it looks like the Youtube script rewrites the whole page, including the html tag.
	// 
	// $body.addClass("ushout");
	
	// this function adds the prefix 'ushout_' to the given string to avoid conflicts
	function _u(str) {
		var result = '';
		for (var i = 0, n = arguments.length; i < n; ++i) {
			if (result !== '') result += ' ';
			result += 'ushout_' + String(arguments[i]);
		}
		return result;
	}
	// clone reference for creating new objects
	var $DIV = $('<div>'),
		$BUT = $('<button>')
			.hover(
				function () {
					$(this).addClass('mouseover');
				},
				function () {
					$(this).removeClass('mouseover');
				}
			)
			.mousedown(function () {
				$(this).addClass('mousedown');
			})
			.mouseup(function () {
				$(this).removeClass('mousedown');
			});
	
	var $overlay = $DIV.clone()
		.attr('id', _u('overlay'))
		.addClass(_u('simplebox'))
		.appendTo(youtube.$playerapi);
	
	var $touchArea = $DIV.clone()
		.attr('id', _u('toucharea'))
		.addClass(_u('simplebox'))
		.appendTo($overlay);
	
	var $controlBar = $DIV.clone()
		.attr('id', _u('controlbar'))
		.addClass(_u('simplebox'))
		.appendTo($overlay);
	var $debugBar = $DIV.clone()
		.attr('id', _u('debugBar'))
		.addClass(_u('simplebox'))
		.appendTo($overlay);
	
	// this function is a macro to handle the creation of a button
	function createButton(iconUrl, width, height) {
		
	}
	
	
	
	var controlImages = {
		play_pause: chrome.extension.getURL('/images/play_pause.png'),
		volume: chrome.extension.getURL('/images/volume.png'),
		fullwindow: chrome.extension.getURL('/images/fullwindow.png')
	};
	
	var controls = {};
	
	// play/pause button ==============================================//
	controls.$play_pause_frame = $DIV.clone()
		.attr({
			'id': _u('play_pause_frame')
		})
		.addClass(_u('simplebox', 'controlitem', 'leftaligned'));
	
	controls.$play_pause_button = $BUT.clone()
		.attr({
			'id': _u('play_pause_button'),
			'ushout_tooltip': 'Click to play the video'
		})
		.addClass(_u('simplebox'))
		.css({
			backgroundImage: 'url(' + controlImages.play_pause + ')'
		});
	
	// volume controls ================================================//
	controls.$volume_frame = $DIV.clone()
		.attr({
			'id': _u('volume_frame')
		})
		.addClass(_u('simplebox', 'controlitem', 'leftaligned'));
	
	controls.$volume_wrapper = $DIV.clone()
		.attr({
			'id': _u('volume_wrapper')
		})
		.addClass(_u('simplebox'));
	
	controls.$volume_button = $BUT.clone()
		.attr({
			'id': _u('volume_button'),
			'ushout_tooltip': 'Click to Mute'
		})
		.addClass(_u('simplebox'))
		.css({
			backgroundImage: 'url(' + controlImages.volume + ')'
		});
	
	controls.$volume_slider_wrapper = $DIV.clone()
		.attr({
			'id': _u('volume_slider_wrapper')
		})
		.addClass(_u('simplebox'));
	
	controls.$volume_slider = $DIV.clone()
		.attr({
			'id': _u('volume_slider')
		})
		.addClass(_u('simplebox'));
	
	// playtime =======================================================//
	controls.$playtime = $DIV.clone()
		.attr('id', _u('playtime'));
	
	controls.$commentInputFrame = $DIV.clone()
		.attr('id', _u('commentinputframe'));
	
	controls.$fullwindow = $BUT.clone()
		.attr({
			'id': _u('fullwindow'),
			'ushout_tooltip': 'Full Window',
			'ushout_tooltip_rightaligned': 'true'
		})
		.css({
			backgroundImage: 'url(' + controlImages.fullwindow + ')'
		});
	
	controls.$fullscreen = $BUT.clone()
		.attr({
			'id': _u('fullscreen'),
			'ushout_tooltip': 'Full Screen',
			'ushout_tooltip_rightaligned': 'true'
		})
		.css({
			backgroundImage: 'url(' + controlImages.fullscreen + ')'
		});
	
	controls.$rtcToggleFrame = $DIV.clone()
		.attr('id', _u('rtctoggleframe'));
	
	$controlBar.append(
		controls.$play_pause_frame.append(
			controls.$play_pause_button
		),
		
		controls.$volume_frame.append(
			controls.$volume_wrapper.append(
				controls.$volume_button,
				controls.$volume_slider_wrapper.append(
					controls.$volume_slider
				)
			)
		),
		controls.$playtime,
		controls.$commentInputFrame,
		
		
		controls.$fullwindow,
		controls.$rtcToggleFrame
	);
	
	// start higher level logics from here
	//====================================
//	$debugBar.text(href);
	
	
	controls.$volume_slider.slider({
		range: "min",
		value: 50,
		min: 0,
		max: 100
	});
	controls.$playtime.text('00:00 / 00:00');
}