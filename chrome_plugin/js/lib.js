function ushout($body) {
	var JQUERY_CLONE_WITHDATAANDEVENTS = true;
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
	// get rid of the leading ?
	var queryParse = query.split('?');
	query = (queryParse.length === 1) ? queryParse[0] : queryParse[1];
	// split the query
	queryParse = query.split('&');
	// collect queries with a name
	var queries = {};
	for (var i = 0, n = queryParse.length; i < n; ++i) {
		var _parse = String(queryParse[i]).split("=");
		if (_parse.length === 1) continue;
		var _name = _parse[0],
			_value = _parse[1];
		queries[_name] = _value;
	}
	
	log('query: ' + query);
	log('vid: ' + queries.v);
	
	var youtube = {};
	// locate body-container
	youtube.$bodyContainer = $body.find("#body-container");
	if (youtube.$bodyContainer.length !== 1) {
		return;
	}
	log('#body-container check');
	// locate page-container
	youtube.$pageContainer = youtube.$bodyContainer.find("#page-container");
	if (youtube.$pageContainer.length !== 1) {
		return;
	}
	log('#page-container check');
	// locate page
	youtube.$page = youtube.$pageContainer.find("#page");
	if (youtube.$page.length !== 1) {
		return;
	}
	log('#page check');
	// locate player
	youtube.$player = youtube.$page.find("#player");
	if (youtube.$player.length !== 1) {
		warn('fail because can not find player wrapper on this page.');
		return;
	}
	log('#player check');
	// locate playerapi
	youtube.$playerapi = youtube.$player.find("#player-api");
	if (youtube.$playerapi.length !== 1) {
		warn('fail because can not find player on this page.');
		return;
	}
	log('#player-api check');
	// locate playlist
	youtube.$playlist = youtube.$player.find("#playlist");
	if (youtube.$playlist.length !== 1) {
	//	warn('fail because can not find playlist wrapper on this page.');
		return;
	}
	log('#playlist check');
	// locate playlisttray
	youtube.$playlisttray = youtube.$player.find("#playlist-tray");
	if (youtube.$playlisttray.length !== 1) {
	//	warn('fail because can not find playlist tray on this page.');
		return;
	}
	log('#playlist-tray check');
	// locate guide
	youtube.$guide = youtube.$page.find("#guide");
	if (youtube.$guide.length !== 1) {
	//	warn('fail because can not find guide wrapper on this page.');
		return;
	}
	log('#guide check');
	// locate content
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
	var $DIV = $('<div>')
			.addClass(_u('simplebox'))
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
			}),
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
			}),
		$LABEL = $('<label>')
			.addClass(_u('simplebox'));
	
	var $overlay = $DIV.clone(JQUERY_CLONE_WITHDATAANDEVENTS)
		.attr('id', _u('overlay'))
		.addClass(_u('simplebox'))
		.appendTo(youtube.$playerapi);
	
	var $touchArea = $DIV.clone(JQUERY_CLONE_WITHDATAANDEVENTS)
		.attr('id', _u('toucharea'))
		.addClass(_u('simplebox'))
		.appendTo($overlay);
	
	var $controlBar = $DIV.clone(JQUERY_CLONE_WITHDATAANDEVENTS)
		.attr('id', _u('controlbar'))
		.addClass(_u('simplebox'))
		.appendTo($overlay);
	var $ushoutBar = $DIV.clone(JQUERY_CLONE_WITHDATAANDEVENTS)
		.attr('id', _u('ushoutbar'))
		.addClass(_u('simplebox'))
		.appendTo($overlay);
	var $debugBar = $DIV.clone(JQUERY_CLONE_WITHDATAANDEVENTS)
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
	
	var $ref_controlbar_frame = $DIV.clone(JQUERY_CLONE_WITHDATAANDEVENTS)
		.addClass(_u('controlitem'));
	var $ref_controlbar_frame_leftaligned = $ref_controlbar_frame.clone(JQUERY_CLONE_WITHDATAANDEVENTS)
		.addClass(_u('leftaligned'));
	var $ref_controlbar_frame_rightaligned = $ref_controlbar_frame.clone(JQUERY_CLONE_WITHDATAANDEVENTS)
		.addClass(_u('rightaligned'));
		
	var $ref_controlbar_button = $BUT.clone(JQUERY_CLONE_WITHDATAANDEVENTS)
		.attr({
			'disabled': true
		})
		.addClass(_u('simplebox'));
	var $ref_controlbar_button_withicon = $ref_controlbar_button.clone(JQUERY_CLONE_WITHDATAANDEVENTS)
		.addClass(_u('iconbutton'));
	
	// play/pause button ==============================================//
	controls.$play_pause_frame = $ref_controlbar_frame_leftaligned.clone(JQUERY_CLONE_WITHDATAANDEVENTS)
		.attr({
			'id': _u('play_pause_frame')
		});
	
	controls.$play_pause_button = $ref_controlbar_button_withicon.clone(JQUERY_CLONE_WITHDATAANDEVENTS)
		.attr({
			'id': _u('play_pause_button'),
			'ushout_tooltip': 'Click to play the video'
		})
		.addClass(_u('pointercursor'))
		.css({
			backgroundImage: 'url(' + controlImages.play_pause + ')'
		});
	
	// volume controls ================================================//
	controls.$volume_frame = $ref_controlbar_frame_leftaligned.clone(JQUERY_CLONE_WITHDATAANDEVENTS)
		.attr({
			'id': _u('volume_frame')
		});
	
	controls.$volume_wrapper = $DIV.clone(JQUERY_CLONE_WITHDATAANDEVENTS)
		.attr({
			'id': _u('volume_wrapper')
		});
	
	controls.$volume_button = $ref_controlbar_button_withicon.clone(JQUERY_CLONE_WITHDATAANDEVENTS)
		.attr({
			'id': _u('volume_button'),
			'ushout_tooltip': 'Click to Mute'
		})
		.addClass(_u('pointercursor'))
		.css({
			backgroundImage: 'url(' + controlImages.volume + ')'
		});
	
	controls.$volume_slider_wrapper = $DIV.clone(JQUERY_CLONE_WITHDATAANDEVENTS)
		.attr({
			'id': _u('volume_slider_wrapper')
		})
		.addClass(_u('pointercursor'));
	
	controls.$volume_slider = $DIV.clone(JQUERY_CLONE_WITHDATAANDEVENTS)
		.attr({
			'id': _u('volume_slider')
		});
	
	// playtime =======================================================//
	controls.$playtime_frame = $ref_controlbar_frame_leftaligned.clone(JQUERY_CLONE_WITHDATAANDEVENTS)
		.attr({
			'id': _u('playtime_frame')
		});
		
	controls.$playtime_label = $LABEL.clone(JQUERY_CLONE_WITHDATAANDEVENTS)
		.attr({
			'id': _u('playtime_label')
		});
	
	// fullwindow =====================================================//
	controls.$fullwindow_frame = $ref_controlbar_frame_rightaligned.clone(JQUERY_CLONE_WITHDATAANDEVENTS)
		.attr({
			'id': _u('fullwindow_frame')
		});
	
	controls.$fullwindow_button = $ref_controlbar_button_withicon.clone(JQUERY_CLONE_WITHDATAANDEVENTS)
		.attr({
			'id': _u('fullwindow_button'),
			'ushout_tooltip': 'Full Window',
			'ushout_tooltip_rightaligned': 'true'
		})
		.addClass(_u('pointercursor'))
		.css({
			backgroundImage: 'url(' + controlImages.fullwindow + ')'
		});
	
	/*========================================================*/
	
	/*
	controls.$fullscreen = $BUT.clone(JQUERY_CLONE_WITHDATAANDEVENTS)
		.attr({
			'id': _u('fullscreen'),
			'ushout_tooltip': 'Full Screen',
			'ushout_tooltip_rightaligned': 'true'
		})
		.css({
			backgroundImage: 'url(' + controlImages.fullscreen + ')'
		});
	*/
	
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
		
		controls.$playtime_frame.append(
			controls.$playtime_label
		),
		
		controls.$fullwindow_frame.append(
			controls.$fullwindow_button
		)
	);
	
	controls.$rtc_controls_wrapper = $DIV.clone(JQUERY_CLONE_WITHDATAANDEVENTS)
		.attr({
			'id': _u('rtc_controls_wrapper')
		});
	
	controls.$rtc_toggle_frame = $ref_controlbar_frame_rightaligned.clone(JQUERY_CLONE_WITHDATAANDEVENTS)
		.attr({
			'id': _u('rtc_toggle_frame'),
			'ushout_tooltip': 'Toggle Realtime Comment',
			'ushout_tooltip_rightaligned': 'true'
		});
	controls.$rtc_toggle_label = $LABEL.clone(JQUERY_CLONE_WITHDATAANDEVENTS)
		.attr({
			'id': _u('rtc_toggle_label')
		})
		.text('RTC');
	
	controls.$rtc_toggle_switch = $DIV.clone(JQUERY_CLONE_WITHDATAANDEVENTS)
		.attr({
			'id': _u('rtc_toggle_switch')
		})
		.addClass(_u('pointercursor'));
	controls.$rtc_toggle_switch_label_on = $LABEL.clone(JQUERY_CLONE_WITHDATAANDEVENTS)
		.attr({
			'id': _u('rtc_toggle_switch_label_on'),
		})
		.text('ON');
	controls.$rtc_toggle_switch_label_off = $LABEL.clone(JQUERY_CLONE_WITHDATAANDEVENTS)
		.attr({
			'id': _u('rtc_toggle_switch_label_off'),
		})
		.text('OFF');
	
	controls.$rtc_toggle_switch_handle = $DIV.clone(JQUERY_CLONE_WITHDATAANDEVENTS)
		.attr({
			'id': _u('rtc_toggle_switch_handle')
		});
	
	controls.$rtc_channels_frame = $ref_controlbar_frame_rightaligned.clone(JQUERY_CLONE_WITHDATAANDEVENTS)
		.attr({
			'id': _u('rtc_channels_frame')
		});
	
	controls.$rtc_channels_wrapper = $DIV.clone(JQUERY_CLONE_WITHDATAANDEVENTS)
		.attr({
			'id': _u('rtc_channels_wrapper')
		});
	
	controls.$rtc_channels_label = $LABEL.clone(JQUERY_CLONE_WITHDATAANDEVENTS)
		.attr({
			'id': _u('rtc_channels_label')
		})
		.text('Channels');
	
	controls.$rtc_channels_expand_button = $ref_controlbar_button_withicon.clone(JQUERY_CLONE_WITHDATAANDEVENTS)
		.attr({
			'id': _u('rtc_channels_expand_button')
		});
	
	
	$ushoutBar.append(
		controls.$rtc_controls_wrapper.append(
			controls.$rtc_toggle_frame.append(
				controls.$rtc_toggle_label,
				controls.$rtc_toggle_switch.append(
					controls.$rtc_toggle_switch_label_on,
					controls.$rtc_toggle_switch_label_off,
					controls.$rtc_toggle_switch_handle
				)
			),
			controls.$rtc_channels_frame.append(
				controls.$rtc_channels_wrapper.append(
					controls.$rtc_channels_label,
					controls.$rtc_channels_expand_button
				)
			)
		)
	);
	
	// start higher level logics from here
	//====================================

	// global support for mouseup --
	$(document).mouseup(function () {
		$body.find('.mousedown').removeClass('mousedown');
	});
	//-- global support for mouseup
	
	// data object for the video
	var video = {
		id: queries.v,
		ctime: 0,
		mtime: 0
	};
	
	// data object for ushout functions
	var ushout = {
		active: false
	}
	
	function extendTimeString(numericValue) {
		return (numericValue < 10) ? ('0' + String(numericValue)) : String(numericValue);
	}
	
	function formatTimeString(timeInSeconds, showHour) {
		var seconds, timeInMinutes, minutes, hours;
		
		seconds = timeInSeconds % 60;
		timeInMinutes = (timeInSeconds - seconds) / 60;
		
		if (showHour) {
			minutes = timeInMinutes % 60;
			hours = 0;
		} else {
			minutes = timeInMinutes;
			hours = (timeInMinutes - minutes) / 60;
		}
		
		var secondsString = extendTimeString(seconds);
		var minutesString = extendTimeString(minutes);
		var hoursString = String(hours);
		
		return ((hours > 0) ? (hoursString + ':') : '') + minutesString + ':' + (secondsString);
	}
	
	// enable buttons
	controls.$play_pause_button.attr('disabled', false);
	controls.$volume_button.attr('disabled', false);
	controls.$fullwindow_button.attr('disabled', false);
	
	// enable slider
	controls.$volume_slider.slider({
		range: "min",
		value: 50,
		min: 0,
		max: 100
	});
	
	// update playtime
	controls.$playtime_label.update = function () {
		var showHour = video.mtime > 3600;
		var ctimeString = formatTimeString(video.ctime, showHour),
			mtimeString = formatTimeString(video.mtime, showHour);
		controls.$playtime_label.text(ctimeString + ' / ' + mtimeString);
	};
	controls.$playtime_label.update();
	
	function activateRTC() {
		$body.addClass(_u('rtc'));
		ushout.active = true;
		return true;
	}
	function deactivateRTC() {
		$body.removeClass(_u('rtc'));
		ushout.active = false;
		return true;
	}
	
	// rtc toggle button
	controls.$rtc_toggle_switch.click(function () {
		if (ushout.active) {
			deactivateRTC();
		} else {
			activateRTC();
		}
	});
}