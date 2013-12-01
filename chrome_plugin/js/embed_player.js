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
	
	ushout.$buffProgress = ushout.templates.$DIV.clone(true)
		.attr('id', _u('buffProgress'));
	ushout.$seekSlider = ushout.templates.$DIV.clone(true)
		.attr('id', _u('seekSlider'));
	
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
	
	// settings button ====================================================//
	ushout.$settings_frame = ushout.templates.controlItem_rightAligned.clone(true)
		.attr({
			'id': _u('settings_frame')
		});
	ushout.$settings_button = ushout.templates.controlItem_button_withIcon.clone(true)
		.attr({
			'id': _u('settings_button'),
			'ushout_tooltip': 'Settings'
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
			ushout.$progressBar.append(
				ushout.$buffProgress,
				ushout.$seekSlider
			),
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
						ushout.$settings_frame.append(
							ushout.$settings_button
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

	/**
	 * this function is called when a new video is loaded and the page needs
	 * to be re-configured because youtube has reset some portion of the page.
	 *
	 * this function, however, doesn't need to change the setting of or reload the
	 * the player as it is most likely holding its previous setting.
	 **/
	ushout.configure = function () {
		log('>> configuring...');
		video.updateID();
		ushout.controller.updateVolumeIcon();
		ushout.controller.updateFromPlayer();
		// get into ad mode
		$body.addClass(_u('playing'));
		$body.addClass(_u('ads'));
		ushout.data.adState = adState.playing;
		ushout.data.playState = playState.unstarted;
		if (ushout.localSettings.rtcActivated) {
			log('turning RTC back on');
			$body.addClass(_u('rtc'));
		} else {
			$body.removeClass(_u('rtc'));
		}
	};
	
	/* global support for mouseup --
	$(document).mouseup(function () {
		$body.find('.mousedown').removeClass('mousedown');
	});
	//-- global support for mouseup */
	
	// seekbar
	ushout.$seekSlider.slider({
		animate: false, // disable sliding animation
		disabled: true, // slider initially disabled
		max: 100,
		min: 0,
		orientation: 'horizontal',
		value: 0,
		range: 'min',
		start: function (e, ui) {
			log('User Action: seekBar start');
			// if playing, manually pause and resume to force sending
			// playStateChange to playing to trigger bullet timeframe reset
			if (ushout.data.playState === playState.playing) {
				video.player.pauseVideo();
				ushout.data.shouldResume = true;
			} else {
				ushout.data.shouldResume = false;
			}
			// stop updating slider
			ushout.data.seekBarDragging = true;
		},
		slide: function (e, ui) {
			video.player.seekTo(ui.value, false);
		},
		change: function (e, ui) {
			if (e.originalEvent) {
				// changed by user
				log('User Action: seekBar change');
				var targetTimeFrame = ui.value;
				log('User Action: seek to ' + targetTimeFrame);
				video.player.seekTo(targetTimeFrame, true);
				if (ushout.data.shouldResume) {
					video.player.playVideo();
					ushout.data.shouldResume = false;
				}
			} else {
				// changed by program
			}
		},
		stop: function (e, ui) {
			log('User Action: seekBar stop');
			// continue updating slider
			ushout.data.seekBarDragging = false;
		}
	}).removeClass('ui-corner-all');
	
	ushout.$buffProgress.progressbar({
		value: 0
	}).removeClass('ui-corner-all');
	
	// play/pause button actions
	var playState = {
		unstarted: -1,
		ended: 0,
		playing: 1,
		paused: 2,
		buffering: 3,
		video_cued: 5
	};
//	ushout.data.playState = playState.unstarted;
	var adState = {
		unstarted: -1,
		ended: 0,
		playing: 1,
		paused: 2
	};
//	ushout.data.adState = adState.unstarted;
	ushout.$play_pause_button.click(function () {
		// the player has to be located first
		if (video.player === null) {
			warn('player not found');
			return;
		}
		
		log('playState: ' + ushout.data.playState);
		
		switch (ushout.data.playState) {
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
	ushout.controller.stateChangeJumpTable_leaving = {
		'-1': function () {},
		'0' : function () {},
		'1' : function () {
			$body.removeClass(_u('playing'));
			// start slow updating time
			ushout.controller.slowUpdate();
		},
		'2' : function () {},
		'3' : function () {},
		'5' : function () {}
	};
	ushout.controller.stateChangeJumpTable_arriving = {
		'-1': function () {
			if (ushout.data.redirecting === 1) {
				ushout.data.redirecting = 2;
			} else if (ushout.data.redirecting === 3) {
				// this state change means video redirecting is done
				ushout.data.redirecting = 0;
			//	ushout.configure();
			}
		},
		'0' : function () {},
		'1' : function () {
			$body.addClass(_u('playing'));
			// start fast updating time
			ushout.controller.fastUpdate();
		},
		'2' : function () {},
		'3' : function () {},
		'5' : function () {
			if (ushout.data.redirecting === 2) {
				ushout.data.redirecting = 3;
			}
		}
	};
	ushout.controller.stateChangeJumpTable_transition = {
		'-1': { // unstarted
			'-1': function () {},
			'0' : function () {
				log('ended before playing.');
				$body.removeClass(_u('playing'));
			},
			'1' : function () {
				log('started playing.');
				$body.removeClass(_u('ads'));
				ushout.data.adState = adState.ended;
			},
			'2' : function () {},
			'3' : function () {},
			'5' : function () {}
		},
		'0' : { // ended
			'-1': function () {},
			'0' : function () {},
			'1' : function () {
				log('started playing from ended.');
			},
			'2' : function () {},
			'3' : function () {},
			'5' : function () {}
		},
		'1' : { // playing
			'-1': function () {},
			'0' : function () {},
			'1' : function () {},
			'2' : function () {},
			'3' : function () {},
			'5' : function () {}
		},
		'2' : { // paused
			'-1': function () {},
			'0' : function () {},
			'1' : function () {
				log('started playing from paused.');
			},
			'2' : function () {},
			'3' : function () {},
			'5' : function () {}
		},
		'3' : { // buffering
			'-1': function () {},
			'0' : function () {},
			'1' : function () {
				log('started playing from buffering.');
			},
			'2' : function () {},
			'3' : function () {},
			'5' : function () {}
		},
		'5' : { // video cued
			'-1': function () {},
			'0' : function () {},
			'1' : function () {
				log('started playing from cued.');
			},
			'2' : function () {},
			'3' : function () {},
			'5' : function () {}
		}
	}; // ushout.controller.stateChangeJumpTable
	window.playerOnStateChange = function (newState) {
		var newStateString = String(newState);
		var currentStateString = String(ushout.data.playState);
		log('state change: ' + currentStateString + ' > ' + newStateString);
		if (ushout.localSettings.rtcActivated) {
			var toDo_leaving = ushout.controller.stateChangeJumpTable_leaving[currentStateString],
				toDo_arriving = ushout.controller.stateChangeJumpTable_arriving[newStateString],
				toDo_transition = ushout.controller.stateChangeJumpTable_transition[currentStateString][newStateString];
			if ((typeof toDo_leaving === 'function') &&
				(typeof toDo_arriving === 'function') &&
				(typeof toDo_transition === 'function')) {
				toDo_leaving();
				toDo_transition();
				ushout.data.playState = newState;
				toDo_arriving();
				log('final state: ' + String(ushout.data.playState));
			} else {
				warn('invalid state: ' + newStateString);
			}
		}
	};
	
	// mute/unmute actions
//	ushout.localSettings.volume = 0;
//	ushout.localSettings.restoreVolume = 0;
	ushout.controller.unMute = function () {
		// the player has to be located first
		if (video.player === null) {
			warn('player not found');
			return;
		}
		ushout.localSettings.muted = false;
		// save to local storage
		chrome.storage.local.set(ushout.localSettings);
		
		video.player.unMute();
		ushout.$volume_slider.slider({
			value: ushout.localSettings.restoreVolume
		});
		$body.removeClass(_u('muted'));
	};
	ushout.controller.mute = function () {
		// the player has to be located first
		if (video.player === null) {
			warn('player not found');
			return;
		}
		ushout.localSettings.restoreVolume = video.player.getVolume();
		ushout.localSettings.muted = true;
		// save to local storage
		chrome.storage.local.set(ushout.localSettings);
		
		video.player.mute();
		ushout.$volume_slider.slider({
			value: 0
		});
		$body.addClass(_u('muted'));
	};
	ushout.controller.updateVolumeIcon = function () {
		// the player has to be located first
		if (video.player === null) {
			warn('player not found');
			return;
		}
		ushout.localSettings.volume = video.player.getVolume();
		if (video.player.isMuted()) {
			$body.addClass(_u('muted'));
			$body.removeClass(_u('loud'));
			$body.removeClass(_u('quiet'));
		} else {
			if (ushout.localSettings.volume < 20) {
				$body.addClass(_u('quiet'));
				$body.removeClass(_u('loud'));
			} else if (ushout.localSettings.volume > 60) {
				$body.addClass(_u('loud'));
				$body.removeClass(_u('quiet'));
			} else {
				$body.removeClass(_u('loud'));
				$body.removeClass(_u('quiet'));
			}
		}
	};
	ushout.controller.setVolume = function (volumeValue) {
		// the player has to be located first
		if (video.player === null) {
			warn('player not found');
			return;
		}
		video.player.setVolume(volumeValue);
		ushout.localSettings.volume = video.player.getVolume();
		// save to local storage
		chrome.storage.local.set(ushout.localSettings);
		
		ushout.controller.updateVolumeIcon();
	};
	ushout.$volume_button.click(function () {
		// the player has to be located first
		if (video.player === null) {
			warn('player not found');
			return;
		}
		
		if (video.player.isMuted()) {
			// call the macro function in ushout.controller
			ushout.controller.unMute();
		} else {
			// call the macro function in ushout.controller
			ushout.controller.mute();
		}
	});
	// volume slider actions
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
			ushout.controller.setVolume(ui.value);
		},
		change: function (e, ui) {
			if (e.originalEvent) {
				// changed by user
				ushout.controller.setVolume(ui.value);
			} else {
				// changed by program
			//	ushout.controller.updateVolumeIcon();
			}
		}
	});
	
	// playtime actions
	ushout.data.extendTimeString = function (numericValue) {
		return (numericValue < 10) ? ('0' + String(numericValue)) : String(numericValue);
	};
	ushout.data.formatTimeString = function (timeInSeconds, showHour) {
		var seconds, timeInMinutes, minutes, hours;
		
		timeInSeconds = Math.ceil(timeInSeconds);
		
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
		if (video.player === null) {
			warn('player not found');
			return;
		}
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
		switch (ushout.data.windowMode) {
			case windowMode.small:
			case windowMode.medium:
			case windowMode.large:
				// call the macro function in ushout.controller
				ushout.controller.expandToFullWindow();
				break;
			case windowMode.fullwindow:
				ushout.controller.restoreFromFullWindow();
				break;
			case windowMode.fullscreen:
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
	youtube.$movieplayer.matchSettings = function (matchSettings) {
		var flashvars = youtube.$movieplayer.attr('flashvars');
		var parse = parseQueryString(flashvars);
		var result = true;
		for (var key in matchSettings) {
			if (parse[key] != matchSettings[key]) {
				log('player setting mis-match on ' + key);
				result = false;
			}
		}
		return result;
	};
	youtube.$movieplayer.reload = function () {
		youtube.$movieplayer.detach();
		youtube.$movieplayer.prependTo(youtube.$playerapi);
		return youtube.$movieplayer;
	};
	ushout.controller.activateRTC = function () {
		$body.addClass(_u('rtc'));
		// match settings first to avoid unnecessary reloads
		if (!youtube.$movieplayer.matchSettings({
			controls: 0
		})) {
			// reload player with correct settings
			youtube.$movieplayer.changeSettings({
				'controls'      : 0, // hide controls
				'disablekb'     : 1, // disable youtube keyboard shortcut
				'enablejsapi'   : 1,
				'fs'            : 0, // disable full screen support
				'iv_load_policy': 0,
				'loop'          : 0, // disable looping
				'modestbranding': 1,
				'origin'        : location.host,
				'rel'           : 0, // disable related videos at the end
				'showinfo'      : 0, // disable video info
				'version'       : 3
			}).reload();
		}
		// set flag
		ushout.localSettings.rtcActivated = true;
		// save to local storage
		chrome.storage.local.set(ushout.localSettings);
		return true;
	};
	ushout.controller.deactivateRTC = function () {
		// set flag
		ushout.localSettings.rtcActivated = false;
		// save to local storage
		chrome.storage.local.set(ushout.localSettings);
		$body.removeClass(_u('rtc'));
		// cancel fullwindow mode
		ushout.controller.restoreFromFullWindow();
		// stop updating playtime
		ushout.controller.stopUpdate();
		// match settings first to avoid unnecessary reloads
		if (youtube.$movieplayer.matchSettings({
			controls: 0
		})) {
			// reload player with correct settings
			youtube.$movieplayer.changeSettings({
				'controls'      : 1, // show controls
				'disablekb'     : 0, // disable youtube keyboard shortcut
				'enablejsapi'   : 1,
				'fs'            : 1, // enable full screen support
				'iv_load_policy': 0,
				'loop'          : 0, // disable looping
				'modestbranding': 1,
				'origin'        : location.host,
				'rel'           : 1, // disable related videos at the end
				'showinfo'      : 0, // disable video info
				'version'       : 3
			}).reload();
		}
		return true;
	};
	ushout.$rtc_toggle_switch.click(function () {
		if (ushout.localSettings.rtcActivated) {
			ushout.controller.deactivateRTC();
		} else {
			ushout.controller.activateRTC();
		}
	});
	
	ushout.controller.updateFromPlayer = function () {
        if (video.player !== null) {
            ushout.controller.updatePlayTime();
            // seekBar
            if (!ushout.data.seekBarDragging)
            	ushout.$seekSlider.slider({
	                // only update when user not dragging
	                value: video.player.getCurrentTime(),
	                max: video.player.getDuration()
	            });
            var buffProgressValue = video.player.getVideoLoadedFraction() * 100;
            if (buffProgressValue !== ushout.$buffProgress.progressbar('value'))
            	ushout.$buffProgress.progressbar('value', buffProgressValue);
        }
    };
    ushout.controller.stopUpdate = function () {
		window.clearInterval(ushout.data.updater);
	};
	ushout.controller.fastUpdate = function () {
		ushout.controller.stopUpdate();
		ushout.data.updater = window.setInterval(ushout.controller.updateFromPlayer, 500);
	};
	ushout.controller.slowUpdate = function () {
		ushout.controller.stopUpdate();
		ushout.data.updater = window.setInterval(ushout.controller.updateFromPlayer, 1000);
	};
	
	/* initialization sequence ==================================================*/
	
	// enable buttons
	ushout.$play_pause_button.attr('disabled', false);
	ushout.$volume_button.attr('disabled', false);
	ushout.$fullwindow_button.attr('disabled', false);
	ushout.$rtc_channels_expand_button.attr('disabled', false);
	
	// restore rtc state
	chrome.storage.local.get([
		'rtcActivated',
		'volume',
		'muted',
		'restoreVolume'
	], function (local) {
		warn('loading local settings...');
		for (var key in local) {
			ushout.localSettings[key] = local[key];
		}
		
		if (ushout.localSettings.rtcActivated === true) {
			log('re-activating RTC...');
			ushout.controller.activateRTC();
		} else {
			ushout.controller.deactivateRTC();
		}
	});
	/* deprecated
	if (localStorage.getItem(_u('active')) === true) {
		log('re-activating RTC...');
		ushout.controller.activateRTC();
	} else {
	//	ushout.controller.deactivateRTC();
	}
	*/
	
	window.onYouTubePlayerReady = function () {
		video.player = youtube.$movieplayer[0];
		if (video.player)
			video.player.addEventListener("onStateChange", "ushout_playerOnStateChange");
		
		youtube.$movieplayer.ready(function () {
			// after monitering this message, it seems the player doesn't reload when redirecting.
			log('--------- player ready ---------');
		});
		
		// seek bar
		ushout.$seekSlider.slider({
			disabled: false, // enable it
			max: video.player.getDuration(), // set max
			value: video.player.getCurrentTime() // set value
		});
		
		// mute state
		if (ushout.localSettings.muted) {
			ushout.controller.mute();
		} else {
			ushout.controller.unMute();
		}
		
		// volume
		ushout.controller.setVolume(ushout.localSettings.volume);
		
		// volume slider
		ushout.$volume_slider.slider({
			disabled: false,
			value: ushout.localSettings.volume
		});
		
		ushout.configure();

	//	video.player.loadVideoById('NBSfikrbLV4'); // load a new video
		
	//	video.player.playVideo();
	//	pauseVideo()
	//	stopVideo()
	//	seekTo(seconds:Number, allowSeekAhead:Boolean)
	//	
	};
	
	/**
	 * the following code clip uses MutationObserver to monitor changes on
	 * className of document.body so we can know if Youtube resets body
	 **/
	var redirectObserver = new MutationObserver(function (mutations) {
		mutations.forEach(function (mutation) {
			var newVal = $(mutation.target).prop(mutation.attributeName);
			if (mutation.attributeName === "class") {
				if (ushout.localSettings.rtcActivated && !$body.hasClass(_u('rtc'))) {
					ushout.configure();
				}
			}
		});
	});
	redirectObserver.observe(document.body, {
		attributes: true,
		childList: false,
		characterData: false
	});
	
	window.pushState = function () {
		// this state change happens during video redirecting
		ushout.data.redirecting = 1;
	};
}