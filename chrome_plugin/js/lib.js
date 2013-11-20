function ushout($body) {
	var youtube = {};
	
	// macro functions
	function log(msg) {
		console.log('ushout: ' + String(msg));
	}
	function warn(msg) {
		console.warn('ushout: ' + String(msg));
	}
	
	log('loading');
	
	youtube.$bodyContainer = $body.find("#body-container");
	if (youtube.$bodyContainer.length !== 1) {
		return;
	}
	
	youtube.$pageContainer = youtube.$bodyContainer.find("#page-container");
	if (youtube.$pageContainer.length !== 1) {
		return;
	}
	
	youtube.$page = youtube.$pageContainer.find("#page");
	if (youtube.$page.length !== 1) {
		return;
	}
	
	youtube.$player = youtube.$page.find("#player");
	if (youtube.$player.length !== 1) {
		warn('fail because can not find player wrapper on this page.');
		return;
	}
	
	youtube.$playerapi = youtube.$player.find("#player-api");
	if (youtube.$playerapi.length !== 1) {
		warn('fail because can not find player on this page.');
		return;
	}
	
	youtube.$playlist = youtube.$player.find("#playlist");
	if (youtube.$playlist.length !== 1) {
	//	warn('fail because can not find playlist wrapper on this page.');
		return;
	}
	
	youtube.$playertray = youtube.$player.find("#playlist-tray");
	if (youtube.$playertray.length !== 1) {
	//	warn('fail because can not find playlist tray on this page.');
		return;
	}
	
	youtube.$guide = youtube.$page.find("#guide");
	if (youtube.$guide.length !== 1) {
	//	warn('fail because can not find guide wrapper on this page.');
		return;
	}
	
	youtube.$content = youtube.$page.find("#content");
	if (youtube.$content.length !== 1) {
	//	warn('fail because can not find content wrapper on this page.');
		return;
	}
	
	
	
	
	
	// apply ushout css
	// 
	// apparently this approach doesn't work well enough, thank to Youtube video redirecting mechanism.
	// when page redirects from a video with a playlist, the inserted contents are lost.
	// it looks like the Youtube script rewrites the whole page, including the html tag.
	// 
	// $body.addClass("ushout");
	
	// this function adds the prefix 'ushout_' to the given string to avoid conflicts
	function _u(str) {
		return 'ushout_' + String(str);
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
	
	var $overlay = $DIV.clone().attr('id', _u('overlay')).appendTo(youtube.$playerapi);
	
	var $touchArea = $DIV.clone().attr('id', _u('toucharea')).appendTo($overlay);
	
	var $controlBar = $DIV.clone().attr('id', _u('controlbar')).appendTo($overlay);
	
	// this function is a macro to handle the creation of a button
	function createButton(iconUrl, width, height) {
		
	}
	
	
	
	var controlImages = {
		play_pause: chrome.extension.getURL('/images/play_pause.png'),
		volume: chrome.extension.getURL('/images/volume.png'),
		fullwindow: chrome.extension.getURL('/images/fullwindow.png')
	};
	
	var controls = {};
	
	controls.$play_pause = $BUT.clone()
		.attr({
			'id': _u('play_pause'),
			'ushout_tooltip': 'Click to play the video'
		})
		.css({
			backgroundImage: 'url(' + controlImages.play_pause + ')'
		});
	
	controls.$volumeFrame = $DIV.clone()
		.attr({
			'id': _u('volumeframe')
		});
	
	controls.$volumeButton = $BUT.clone()
		.attr({
			'id': _u('volumebutton'),
			'ushout_tooltip': 'Click to Mute'
		})
		.css({
			backgroundImage: 'url(' + controlImages.volume + ')'
		});
	
	controls.$volumeSliderWrapper = $DIV.clone()
		.attr({
			'id': _u('volumeslider_wrapper')
		});
	
	controls.$volumeSlider = $DIV.clone()
		.attr({
			'id': _u('volumeslider')
		});
	
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
	
	$controlBar.append(
		controls.$play_pause,
		controls.$volumeFrame.append(
			controls.$volumeButton,
			controls.$volumeSliderWrapper.append(
				controls.$volumeSlider
			)
		),
		controls.$playtime,
		controls.$commentInputFrame,
		
		
		controls.$fullwindow
	);
	
	// start higher level logics from here
	controls.$playtime.text('00:00 / 00:00');
	controls.$volumeSlider.slider({
		range: "min",
		value: 50,
		min: 0,
		max: 100
	});
}