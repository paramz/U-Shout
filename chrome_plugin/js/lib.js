function ushout($body, log, warn, _u) {
	var JQUERY_CLONE_WITHDATAANDEVENTS = true;
	
	// url check
	var href = window.location.pathname.toLowerCase();
	// the player page should have pathname '/watch'
	if (href !== '/watch') {
		// hault if not the right page
		log('not watch page');
		return;
	}
	
	var queryString = window.location.search;
	// get rid of the leading ?
	var queryParse = queryString.split('?');
	queryString = (queryParse.length === 1) ? queryParse[0] : queryParse[1];
	
	function parseQueryString(queryString) {
		var parse1 = queryString.split('&');
		// collect queries with a name
		var queries = {};
		for (var i = 0, n = parse1.length; i < n; ++i) {
			var parse2 = String(parse1[i]).split('=');
			if (parse2.length === 1) continue;
			
			var key = parse2.shift(),
				value = parse2.join('=');
			queries[key] = value;
		}
		return queries;
	}
	function buildQueryString(queryObject) {
		var queryStrings = [];
		for (var key in queryObject) {
			queryStrings.push(key + '=' + queryObject[key]);
		}
		return queryStrings.join('&');
	}
	
	var queries = parseQueryString(queryString);
	
	log('query: ' + queryString);
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
	// locate movieplayer
	youtube.$movieplayer = youtube.$playerapi.find("#movie_player");
	if (youtube.$movieplayer.length !== 1) {
		warn('fail because can not find movie player on this page.');
		return;
	}
	log('#movie_player check');
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


	// data object for the video
	var video = {
		id: queries.v,
		ctime: 0,
		mtime: 0,
		player: null
	};
	
	// data object for ushout
	var ushout = {
		// toggle flag for ushout functions
		active : false,
		controller : {
			state : -1,
			volume: 0,
			restoreVolume: 0,
			unMute : function () {
				video.player.unMute();
				controls.$volume_slider.slider({
					value: ushout.controller.restoreVolume
				});
				$body.removeClass(_u('muted'));
			},
			mute: function () {
				ushout.controller.restoreVolume = video.player.getVolume();
				video.player.mute();
				controls.$volume_slider.slider({
					value: 0
				});
				$body.addClass(_u('muted'));
			},
			stateChangeJumpTable : {
				'-1': { // unstarted
					'-1': function () {},
					'0' : function () {
						log('ended before playing.');
						$body.removeClass(_u('playing'));
						/*
						controls.$play_pause_button.attr({
							'ushout_tooltip': 'Play'
						});
						*/
					},
					'1' : function () {
						log('started playing.');
						$body.addClass(_u('playing'));
						/*
						controls.$play_pause_button.attr({
							'ushout_tooltip': 'Pause'
						});
						*/
					},
					'2' : function () {
						$body.removeClass(_u('playing'));
					},
					'3' : function () {},
					'5' : function () {}
				},
				'0' : { // ended
					'-1': function () {},
					'0' : function () {
						$body.removeClass(_u('playing'));
					},
					'1' : function () {
						log('started playing from ended.');
						$body.addClass(_u('playing'));
					},
					'2' : function () {
						$body.removeClass(_u('playing'));
					},
					'3' : function () {},
					'5' : function () {}
				},
				'1' : { // playing
					'-1': function () {},
					'0' : function () {
						$body.removeClass(_u('playing'));
					},
					'1' : function () {},
					'2' : function () {
						$body.removeClass(_u('playing'));
					},
					'3' : function () {},
					'5' : function () {}
				},
				'2' : { // paused
					'-1': function () {},
					'0' : function () {
						$body.removeClass(_u('playing'));
					},
					'1' : function () {
						log('started playing from paused.');
						$body.addClass(_u('playing'));
					},
					'2' : function () {},
					'3' : function () {},
					'5' : function () {}
				},
				'3' : { // buffering
					'-1': function () {},
					'0' : function () {
						$body.removeClass(_u('playing'));
					},
					'1' : function () {
						log('started playing from buffering.');
						$body.addClass(_u('playing'));
					},
					'2' : function () {
						$body.removeClass(_u('playing'));
					},
					'3' : function () {},
					'5' : function () {}
				},
				'5' : { // video cued
					'-1': function () {},
					'0' : function () {
						$body.removeClass(_u('playing'));
					},
					'1' : function () {
						log('started playing from cued.');
						$body.addClass(_u('playing'));
					},
					'2' : function () {
						$body.removeClass(_u('playing'));
					},
					'3' : function () {},
					'5' : function () {}
				}
			} // stateChangeJumpTable
		} // player
	} // ushout
	
	// apply ushout css
	// 
	// apparently this approach doesn't work well enough, thank to Youtube video redirecting mechanism.
	// when page redirects from a video with a playlist, the inserted contents are lost.
	// it looks like the Youtube script rewrites the whole page, including the html tag.
	// 
	// $body.addClass("ushout");
	
	
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
	
	ushout.$overlay_base = $DIV.clone(JQUERY_CLONE_WITHDATAANDEVENTS)
		.attr('id', _u('overlay_base'))
		.addClass(_u('simplebox'))
		.addClass('player-width watch-content') // youtube classes
		.insertBefore(youtube.$playerapi);
		
	ushout.$overlay = $DIV.clone(JQUERY_CLONE_WITHDATAANDEVENTS)
		.attr('id', _u('overlay'))
		.addClass(_u('simplebox'))
		.addClass('player-width player-height') // youtube classes
		.appendTo(ushout.$overlay_base);
	
	ushout.$touchArea = $DIV.clone(JQUERY_CLONE_WITHDATAANDEVENTS)
		.attr('id', _u('toucharea'))
		.addClass(_u('simplebox'))
		.appendTo(ushout.$overlay);
	
	ushout.$progressBar = $DIV.clone(JQUERY_CLONE_WITHDATAANDEVENTS)
		.attr('id', _u('progressbar'))
		.addClass(_u('simplebox'))
		.appendTo(ushout.$overlay);
	
	ushout.$controlBar = $DIV.clone(JQUERY_CLONE_WITHDATAANDEVENTS)
		.attr('id', _u('controlbar'))
		.addClass(_u('simplebox'))
		.appendTo(ushout.$overlay);
	
	ushout.$ushoutBar = $DIV.clone(JQUERY_CLONE_WITHDATAANDEVENTS)
		.attr('id', _u('ushoutbar'))
		.addClass(_u('simplebox'))
		.appendTo(ushout.$overlay);
	
	// this function is a macro to handle the creation of a button
	function createButton(iconUrl, width, height) {
		
	}
	
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
			'ushout_tooltip': 'Play'
		})
		.addClass(_u('pointercursor'));
	
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
			'ushout_tooltip': 'Mute'
		})
		.addClass(_u('pointercursor'));
	
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
		.addClass(_u('pointercursor'));
	
	/*========================================================*/
	
	/*
	controls.$fullscreen = $BUT.clone(JQUERY_CLONE_WITHDATAANDEVENTS)
		.attr({
			'id': _u('fullscreen'),
			'ushout_tooltip': 'Full Screen',
			'ushout_tooltip_rightaligned': 'true'
		});
	*/
	
	ushout.$controlBar.append(
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
	
	controls.$rtc_expanded_controls_wrapper = $DIV.clone(JQUERY_CLONE_WITHDATAANDEVENTS)
		.attr({
			'id': _u('rtc_expanded_controls_wrapper')
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
		})
		.addClass(_u('pointercursor'));
	
	
	ushout.$ushoutBar.append(
		controls.$rtc_controls_wrapper.append(
			controls.$rtc_toggle_frame.append(
				controls.$rtc_toggle_label,
				controls.$rtc_toggle_switch.append(
					controls.$rtc_toggle_switch_label_on,
					controls.$rtc_toggle_switch_label_off,
					controls.$rtc_toggle_switch_handle
				)
			),
			controls.$rtc_expanded_controls_wrapper.append(
				controls.$rtc_channels_frame.append(
					controls.$rtc_channels_wrapper.append(
						controls.$rtc_channels_label,
						controls.$rtc_channels_expand_button
					)
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
	controls.$play_pause_button.click(function () {
		if (video.player === null)
			return;
		
		switch (ushout.controller.state) {
			case -1: // unstarted
				video.player.playVideo();
				break;
			case 0 : // ended
				video.player.playVideo();
				break;
			case 1 : // playing
				video.player.pauseVideo();
				break;
			case 2 : // paused
				video.player.playVideo();
				break;
			case 3 : // buffering
				break;
			case 5 : // video cued
				video.player.playVideo();
				break;
			default:
		}
	});
	
	controls.$volume_button.click(function () {
		if (video.player === null)
			return;
		
		if (video.player.isMuted()) {
			ushout.controller.unMute();
		} else {
			ushout.controller.mute();
		}
	});
	
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
	
	// enable slider
	controls.$volume_slider.slider({
		disabled: true,
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
	
	function changePlayerSettings(newSettings) {
		var flashvars = youtube.$movieplayer.attr('flashvars');
		var parse = parseQueryString(flashvars);
		for (var key in newSettings) {
			parse[key] = newSettings[key];
		}
		flashvars = buildQueryString(parse);
		youtube.$movieplayer.attr('flashvars', flashvars);
	}
	
	function reloadPlayer() {
		youtube.$movieplayer.detach();
		youtube.$movieplayer.prependTo(youtube.$playerapi);
	}
	
	function activateRTC() {
		$body.addClass(_u('rtc'));
		// enable buttons
		controls.$play_pause_button.attr('disabled', false);
		controls.$volume_button.attr('disabled', false);
		controls.$fullwindow_button.attr('disabled', false);
		controls.$rtc_channels_expand_button.attr('disabled', false);
		// enable volume slider
		controls.$volume_slider.slider('option', 'disabled', false);
		
		//=================
		
		changePlayerSettings({
			controls: 0
		});
		reloadPlayer();
		
		// set flag
		ushout.active = true;
		return true;
	}
	function deactivateRTC() {
		$body.removeClass(_u('rtc'));
		// disable buttons
		controls.$play_pause_button.attr('disabled', true);
		controls.$volume_button.attr('disabled', true);
		controls.$fullwindow_button.attr('disabled', true);
		controls.$rtc_channels_expand_button.attr('disabled', true);
		// disable volume slider
		controls.$volume_slider.slider('option', 'disabled', true);
		
		//=================
		
		changePlayerSettings({
			controls: 1
		});
		reloadPlayer();
		
		// set flag
		ushout.active = false;
		return true;
	}
	
	function updateTime() {
		if (video.player === null)
			return;
		video.mtime = video.player.getDuration();
		video.ctime = video.player.getCurrentTime();
		controls.$playtime_label.update();
	}
	
	// rtc toggle button
	controls.$rtc_toggle_switch.click(function () {
		if (ushout.active) {
			deactivateRTC();
		} else {
			activateRTC();
		}
	});
	
	window.playerOnStateChange = function (newState) {
		var newStateString = String(newState);
		log('state: ' + newStateString);
		var currentStateString = String(ushout.controller.state);
		var toDo = ushout.controller.stateChangeJumpTable[currentStateString][newStateString];
		if (typeof toDo === 'function') {
			log('state: ' + currentStateString + ' > ' + newStateString);
			ushout.controller.state = newState;
			toDo();
		} else {
			warn('invalid state: ' + newStateString);
		}
	};
	
	window.onYouTubePlayerReady = function () {
		video.player = youtube.$movieplayer[0];
		if (video.player)
			video.player.addEventListener("onStateChange", "ushout_playerOnStateChange");
		
		updateTime();
	//	video.player.loadVideoById('NBSfikrbLV4'); // load a new video
		
	//	video.player.playVideo();
	//	pauseVideo()
	//	stopVideo()
	//	seekTo(seconds:Number, allowSeekAhead:Boolean)
	//	
	};
	
//	ushout.$touchArea.append($('<iframe id="ytplayer" type="text/html" width="640" height="360" src="https://www.youtube.com/embed/rzjEb2XEOYc?cc_load_policy=0&enablejsapi=1&rel=0&showinfo=0&autohide=0&iv_load_policy=3" frameborder="0" allowfullscreen>'));
	
	
}