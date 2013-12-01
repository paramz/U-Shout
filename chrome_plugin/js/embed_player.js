function embed_player($body, youtube, video, ushout, log, warn, _u) {
	ushout.$overlay_base = ushout.templates.$DIV.clone(true)
		.attr('id', _u('overlay_base'))
		.addClass('player-width watch-content'); // youtube classes
	
	// main containers
	ushout.$overlay = ushout.templates.$DIV.clone(true)
		.attr('id', _u('overlay'))
		.addClass('player-width player-height'); // youtube classes
	
	ushout.$touchArea = ushout.templates.$DIV.clone(true)
		.attr('id', _u('toucharea'));
	
	ushout.$progressBar = ushout.templates.$DIV.clone(true)
		.attr('id', _u('progressbar'));
	
	ushout.$controlBar = ushout.templates.$DIV.clone(true)
		.attr('id', _u('controlbar'));
	
	ushout.$ushoutBar = ushout.templates.$DIV.clone(true)
		.attr('id', _u('ushoutbar'));
	
	// create extra templates
	ushout.templates.controlItem = ushout.templates.$DIV.clone(true)
		.addClass(_u('controlitem'));
	ushout.templates.controlItem_leftAligned = ushout.templates.controlItem.clone(true)
		.addClass(_u('leftaligned'));
	ushout.templates.controlItem_rightAligned = ushout.templates.controlItem.clone(true)
		.addClass(_u('rightaligned'));
	ushout.templates.controlItem_button = ushout.templates.$BUTTON.clone(true)
		.attr({
			'disabled': true
		})
		.addClass(_u('simplebox', 'pointercursor'));
	ushout.templates.controlItem_button_withIcon = ushout.templates.controlItem_button.clone(true)
		.addClass(_u('iconbutton'));
	
	// play/pause button ==============================================//
	ushout.$play_pause_frame = ushout.templates.controlItem_leftAligned.clone(true)
		.attr({
			'id': _u('play_pause_frame')
		});
	ushout.$play_pause_button = ushout.templates.controlItem_button_withIcon.clone(true)
		.attr({
			'id': _u('play_pause_button'),
			'ushout_tooltip': 'Play'
		});
	
	// volume controls ================================================//
	ushout.$volume_frame = ushout.templates.controlItem_leftAligned.clone(true)
		.attr({
			'id': _u('volume_frame')
		});
	ushout.$volume_wrapper = ushout.templates.$DIV.clone(true)
		.attr({
			'id': _u('volume_wrapper')
		});
	ushout.$volume_button = ushout.templates.controlItem_button_withIcon.clone(true)
		.attr({
			'id': _u('volume_button'),
			'ushout_tooltip': 'Mute'
		});
	ushout.$volume_slider_wrapper = ushout.templates.$DIV.clone(true)
		.attr({
			'id': _u('volume_slider_wrapper')
		})
		.addClass(_u('pointercursor'));
	ushout.$volume_slider = ushout.templates.$DIV.clone(true)
		.attr({
			'id': _u('volume_slider')
		});
	
	// playtime =======================================================//
	ushout.$playtime_frame = ushout.templates.controlItem_leftAligned.clone(true)
		.attr({
			'id': _u('playtime_frame')
		});
	ushout.$playtime_label = ushout.templates.$LABEL.clone(true)
		.attr({
			'id': _u('playtime_label')
		});
	
	// fullwindow =====================================================//
	ushout.$fullwindow_frame = ushout.templates.controlItem_rightAligned.clone(true)
		.attr({
			'id': _u('fullwindow_frame')
		});
	ushout.$fullwindow_button = ushout.templates.controlItem_button_withIcon.clone(true)
		.attr({
			'id': _u('fullwindow_button'),
			'ushout_tooltip': 'Full Window',
			'ushout_tooltip_rightaligned': 'true'
		});
	
	// fullscreen =====================================================//
	ushout.$fullscreen_frame = ushout.templates.controlItem_rightAligned.clone(true)
		.attr({
			'id': _u('fullscreen_frame')
		});
	ushout.$fullscreen_button = ushout.templates.controlItem_button_withIcon.clone(true)
		.attr({
			'id': _u('fullscreen_button'),
			'ushout_tooltip': 'Full Screen',
			'ushout_tooltip_rightaligned': 'true'
		});
	
	// ushout control bar =============================================//
	ushout.$rtc_controls_wrapper = ushout.templates.$DIV.clone(true)
		.attr({
			'id': _u('rtc_controls_wrapper')
		});
	ushout.$rtc_expanded_controls_wrapper = ushout.templates.$DIV.clone(true)
		.attr({
			'id': _u('rtc_expanded_controls_wrapper')
		});
	
	// rtc toggle =====================================================//
	ushout.$rtc_toggle_frame = ushout.templates.controlItem_rightAligned.clone(true)
		.attr({
			'id': _u('rtc_toggle_frame'),
			'ushout_tooltip': 'Toggle Realtime Comment',
			'ushout_tooltip_rightaligned': 'true'
		});
	ushout.$rtc_toggle_label = ushout.templates.$LABEL.clone(true)
		.attr({
			'id': _u('rtc_toggle_label')
		})
		.text('RTC');
	ushout.$rtc_toggle_switch = ushout.templates.$DIV.clone(true)
		.attr({
			'id': _u('rtc_toggle_switch')
		})
		.addClass(_u('pointercursor'));
	ushout.$rtc_toggle_switch_label_on = ushout.templates.$LABEL.clone(true)
		.attr({
			'id': _u('rtc_toggle_switch_label_on'),
		})
		.text('ON');
	ushout.$rtc_toggle_switch_label_off = ushout.templates.$LABEL.clone(true)
		.attr({
			'id': _u('rtc_toggle_switch_label_off'),
		})
		.text('OFF');
	ushout.$rtc_toggle_switch_handle = ushout.templates.$DIV.clone(true)
		.attr({
			'id': _u('rtc_toggle_switch_handle')
		});
	
	// help button ====================================================//
	ushout.$help_frame = ushout.templates.controlItem_rightAligned.clone(true)
		.attr({
			'id': _u('help_frame')
		});
	ushout.$help_button = ushout.templates.controlItem_button_withIcon.clone(true)
		.attr({
			'id': _u('help_button'),
			'ushout_tooltip': 'Help'
		});
	
	// channels select list ===========================================//
	ushout.$rtc_channels_frame = ushout.templates.controlItem_rightAligned.clone(true)
		.attr({
			'id': _u('rtc_channels_frame')
		});
	ushout.$rtc_channels_wrapper = ushout.templates.$DIV.clone(true)
		.attr({
			'id': _u('rtc_channels_wrapper')
		});
	ushout.$rtc_channels_label = ushout.templates.$LABEL.clone(true)
		.attr({
			'id': _u('rtc_channels_label')
		})
		.text('Channels');
	ushout.$rtc_channels_expand_button = ushout.templates.controlItem_button_withIcon.clone(true)
		.attr({
			'id': _u('rtc_channels_expand_button')
		});
	
	// audio comment button ===========================================//
	ushout.$post_audio_comment_frame = ushout.templates.controlItem_leftAligned.clone(true)
		.attr({
			'id': _u('post_audio_comment_frame')
		});
	ushout.$post_audio_comment_button = ushout.templates.controlItem_button_withIcon.clone(true)
		.attr({
			'id': _u('post_audio_comment_button'),
			'ushout_tooltip': 'Audio Comment'
		});
	
	// video comment button ===========================================//
	ushout.$post_video_comment_frame = ushout.templates.controlItem_leftAligned.clone(true)
		.attr({
			'id': _u('post_video_comment_frame')
		});
	ushout.$post_video_comment_button = ushout.templates.controlItem_button_withIcon.clone(true)
		.attr({
			'id': _u('post_video_comment_button'),
			'ushout_tooltip': 'Video Comment'
		});
	
	// text comment field =============================================//
	ushout.$post_text_comment_frame = ushout.templates.controlItem.clone(true)
		.attr({
			'id': _u('post_text_comment_frame')
		});
	ushout.$post_text_comment_input = ushout.templates.$INPUT.clone(true)
		.attr({
			'id': _u('post_text_comment_input'),
			'type': 'text'
		})
		.addClass(_u('simplebox'));
	ushout.$post_text_comment_button = ushout.templates.controlItem_button_withIcon.clone(true)
		.attr({
			'id': _u('post_text_comment_button'),
			'ushout_tooltip': 'Post Comment'
		})
		.text('Send');
	
	ushout.$overlay_base.append(
		ushout.$overlay.append(
			ushout.$touchArea,
			ushout.$progressBar,
			ushout.$controlBar.append(
				ushout.$play_pause_frame.append(
					ushout.$play_pause_button
				),
				ushout.$volume_frame.append(
					ushout.$volume_wrapper.append(
						ushout.$volume_button,
						ushout.$volume_slider_wrapper.append(
							ushout.$volume_slider
						)
					)
				),
				ushout.$playtime_frame.append(
					ushout.$playtime_label
				),
				ushout.$fullwindow_frame.append(
					ushout.$fullwindow_button
				),
				ushout.$fullscreen_frame.append(
					ushout.$fullscreen_button
				)
			), // ushout.$controlBar
			ushout.$ushoutBar.append(
				ushout.$rtc_controls_wrapper.append(
					ushout.$rtc_toggle_frame.append(
						ushout.$rtc_toggle_label,
						ushout.$rtc_toggle_switch.append(
							ushout.$rtc_toggle_switch_label_on,
							ushout.$rtc_toggle_switch_label_off,
							ushout.$rtc_toggle_switch_handle
						)
					), // ushout.$rtc_toggle_frame
					ushout.$rtc_expanded_controls_wrapper.append(
						ushout.$post_audio_comment_frame.append(
							ushout.$post_audio_comment_button
						),
						ushout.$post_video_comment_frame.append(
							ushout.$post_video_comment_button
						),
						ushout.$post_text_comment_frame.append(
							ushout.$post_text_comment_input,
							ushout.$post_text_comment_button
						),
						ushout.$help_frame.append(
							ushout.$help_button
						),
						ushout.$rtc_channels_frame.append(
							ushout.$rtc_channels_wrapper.append(
								ushout.$rtc_channels_label,
								ushout.$rtc_channels_expand_button
							)
						)
					) // ushout.$rtc_expanded_controls_wrapper
				) // ushout.$rtc_controls_wrapper
			) // ushout.$ushoutBar
		) // ushout.$overlay
	).insertBefore(youtube.$playerapi);
	
	// start higher level logics from here
	//===========================================================================//
	
	/* global support for mouseup --
	$(document).mouseup(function () {
		$body.find('.mousedown').removeClass('mousedown');
	});
	//-- global support for mouseup */
	
	// play/pause button actions
	var playState = {
		unstarted: -1,
		ended: 0,
		playing: 1,
		paused: 2,
		buffering: 3,
		video_cued: 5
	};
	ushout.data.playState = playState.unstarted;
	var adState = {
		unstarted: -1,
		ended: 0,
		playing: 1,
		paused: 2
	};
	ushout.data.adState = adState.unstarted;
	ushout.$play_pause_button.click(function () {
		// the player has to be located first
		if (video.player === null)
			return;
		
		switch (ushout.controller.playState) {
			case -1: // unstarted
				switch (ushout.data.adState) {
					case adState.unstarted:
						break;
					case adState.ended:
						video.player.playVideo();
						break;
					case adState.playing:
						video.player.pauseVideo();
						$body.removeClass(_u('playing'));
						ushout.data.adState = adState.paused;
						break;
					case adState.paused:
						video.player.playVideo();
						$body.addClass(_u('playing'));
						ushout.data.adState = adState.playing;
						break;
					default:
				}
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
	ushout.controller.stateChangeJumpTable = {
		'-1': { // unstarted
			'-1': function () {},
			'0' : function () {
				log('ended before playing.');
				$body.removeClass(_u('playing'));
			},
			'1' : function () {
				log('started playing.');
				$body.addClass(_u('playing'));
				ushout.controller.adMode = false;
				ushout.controller.adPlaying = false;
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
	}; // ushout.controller.stateChangeJumpTable
	window.playerOnStateChange = function (newState) {
		var newStateString = String(newState);
		log('state: ' + newStateString);
		var currentStateString = String(ushout.data.playState);
		var toDo = ushout.controller.stateChangeJumpTable[currentStateString][newStateString];
		if (typeof toDo === 'function') {
			log('state: ' + currentStateString + ' > ' + newStateString);
			ushout.data.playState = newState;
			toDo();
		} else {
			warn('invalid state: ' + newStateString);
		}
	};
	
	// mute/unmute actions
	ushout.data.volume = 0;
	ushout.data.restoreVolume = 0;
	ushout.controller.unMute = function () {
		video.player.unMute();
		ushout.$volume_slider.slider({
			value: ushout.data.restoreVolume
		});
		$body.removeClass(_u('muted'));
	};
	ushout.controller.mute = function () {
		ushout.data.restoreVolume = video.player.getVolume();
		video.player.mute();
		ushout.$volume_slider.slider({
			value: 0
		});
		$body.addClass(_u('muted'));
	};
	ushout.$volume_button.click(function () {
		// the player has to be located first
		if (video.player === null)
			return;
		
		if (video.player.isMuted()) {
			// call the macro function in ushout.controller
			ushout.controller.unMute();
		} else {
			// call the macro function in ushout.controller
			ushout.controller.mute();
		}
	});
	// volume slider actions
	ushout.controller.updateVolumeIcon = function () {
		var currentVolumeValue = video.player.getVolume();
		ushout.data.volume = currentVolumeValue;
		if (currentVolumeValue < 20) {
			$body.addClass(_u('quiet'));
			$body.removeClass(_u('loud'));
		} else if (currentVolumeValue > 60) {
			$body.addClass(_u('loud'));
			$body.removeClass(_u('quiet'));
		} else {
			$body.removeClass(_u('loud'));
			$body.removeClass(_u('quiet'));
		}
	};
	ushout.$volume_slider.slider({
		animate: false, // disable sliding animation
		disabled: true,
		max: 100,
		min: 0,
		orientation: 'horizontal',
		value: 50,
		range: "min",
		start: function (e, ui) {
			// when sliding, it can not be muted
			ushout.controller.unMute();
		},
		slide: function (e, ui) {
			// update player as it slides
			video.player.setVolume(ui.value);
			ushout.controller.updateVolumeIcon();
		},
		change: function (e, ui) {
			if (e.originalEvent) {
				// changed by user
				video.player.setVolume(ui.value);
				// save change to html5 localstorage
				localStorage.setItem(_u('volume'), ui.value);
			} else {
				// changed by program
			}
			ushout.controller.updateVolumeIcon();
		}
	});
	
	// playtime actions
	ushout.data.extendTimeString = function (numericValue) {
		return (numericValue < 10) ? ('0' + String(numericValue)) : String(numericValue);
	};
	ushout.data.formatTimeString = function (timeInSeconds, showHour) {
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
		
		var secondsString = ushout.data.extendTimeString(seconds);
		var minutesString = ushout.data.extendTimeString(minutes);
		var hoursString = String(hours);
		
		return ((hours > 0) ? (hoursString + ':') : '') + minutesString + ':' + (secondsString);
	};
	ushout.$playtime_label.update = function () {
		var showHour = video.mtime > 3600;
		var ctimeString = ushout.data.formatTimeString(video.ctime, showHour),
			mtimeString = ushout.data.formatTimeString(video.mtime, showHour);
		ushout.$playtime_label.text(ctimeString + ' / ' + mtimeString);
	};
	ushout.controller.updatePlayTime = function () {
		// the player has to be located first
		if (video.player === null)
			return;
		video.mtime = video.player.getDuration();
		video.ctime = video.player.getCurrentTime();
		ushout.$playtime_label.update();
	};
	
	// fullwindow button actions
	var windowMode = {
		small: 1,
		medium: 2,
		large: 3,
		fullwindow: 4,
		fullscreen: 5
	};
	ushout.data.windowMode = windowMode.small;
	ushout.controller.expandToFullWindow = function () {
		$body.addClass(_u('fullwindow'));
		ushout.data.windowMode = windowMode.fullwindow;
	};
	ushout.controller.restoreFromFullWindow = function () {
		$body.removeClass(_u('fullwindow'));
		ushout.data.windowMode = windowMode.small;
	};
	ushout.$fullwindow_button.click(function () {
		switch (ushout.controller.windowMode) {
			case 1: // Default
				// call the macro function in ushout.controller
				ushout.controller.expandToFullWindow();
				break;
			case 2: // Reserved
				break;
			case 3: // Fullwindow
				ushout.controller.restoreFromFullWindow();
				break;
			case 4: // Fullscreen
				break;
			default:
		}
	});
	
	// rtc toggle button actions
	youtube.$movieplayer.changeSettings = function (newSettings) {
		var flashvars = youtube.$movieplayer.attr('flashvars');
		var parse = parseQueryString(flashvars);
		for (var key in newSettings) {
			parse[key] = newSettings[key];
		}
		flashvars = buildQueryString(parse);
		youtube.$movieplayer.attr('flashvars', flashvars);
		return youtube.$movieplayer;
	};
	youtube.$movieplayer.reload = function () {
		youtube.$movieplayer.detach();
		youtube.$movieplayer.prependTo(youtube.$playerapi);
		return youtube.$movieplayer;
	};
	
	ushout.controller.activateRTC = function () {
		$body.addClass(_u('rtc'));
		//=================
		
		youtube.$movieplayer.changeSettings({
			controls: 0
		}).reload();
		
		// set flag
		ushout.active = true;
		return true;
	};
	ushout.controller.deactivateRTC = function () {
		$body.removeClass(_u('rtc'));
		// cancel fullwindow mode
		ushout.controller.restoreFromFullWindow();
		//=================
		
		youtube.$movieplayer.changeSettings({
			controls: 1
		}).reload();
		
		// set flag
		ushout.active = false;
		return true;
	};
	ushout.$rtc_toggle_switch.click(function () {
		if (ushout.active) {
			ushout.controller.deactivateRTC();
		} else {
			ushout.controller.activateRTC();
		}
	});
	
	window.onYouTubePlayerReady = function () {
		video.player = youtube.$movieplayer[0];
		if (video.player)
			video.player.addEventListener("onStateChange", "ushout_playerOnStateChange");
		
		// enable buttons
		ushout.$play_pause_button.attr('disabled', false);
		ushout.$volume_button.attr('disabled', false);
		ushout.$fullwindow_button.attr('disabled', false);
		ushout.$rtc_channels_expand_button.attr('disabled', false);
		
		// use html5 localstorage to save user volume settings
		var volumeValue = localStorage.getItem(_u('volume'));
		if (volumeValue === null) {
			volumeValue = video.player.getVolume();
		} else {
			video.player.setVolume(volumeValue);
		}
		// volume slider
		ushout.$volume_slider.slider({
			disabled: false,
			value: volumeValue
		});
		
		ushout.controller.updatePlayTime();
		
		// get into ad mode
		$body.addClass(_u('playing'));
		ushout.data.adState = adState.playing;
	//	video.player.loadVideoById('NBSfikrbLV4'); // load a new video
		
	//	video.player.playVideo();
	//	pauseVideo()
	//	stopVideo()
	//	seekTo(seconds:Number, allowSeekAhead:Boolean)
	//	
	};
}