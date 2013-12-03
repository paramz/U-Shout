function embed_player($body, youtube, video, ushout, log, warn, _u) {
	ushout.$overlay_base = ushout.templates.$DIV.clone(true)
		.attr('id', _u('overlay_base'))
		.addClass('player-width watch-content'); // youtube classes
	
	// main containers
	ushout.$overlay = ushout.templates.$DIV.clone(true)
		.attr('id', _u('overlay'))
		.addClass('player-width player-height'); // youtube classes
	
	// comments panel =================================================//
	ushout.$commentsPanel = ushout.templates.$DIV.clone(true)
		.attr('id', _u('commentspanel'));
	ushout.$commentsList = ushout.templates.$UL.clone(true)
		.attr('id', _u('commentslist'));
	ushout.templates.$commentItem = ushout.templates.$LI.clone(true)
		.addClass(_u('commentitem'));
	ushout.templates.$commentBullet = ushout.templates.$DIV.clone(true)
		.addClass(_u('commentbullet'));
	
	// video area =====================================================//
	ushout.$touchArea = ushout.templates.$DIV.clone(true)
		.attr('id', _u('toucharea'));
	ushout.$comments = ushout.templates.$DIV.clone(true)
		.attr('id', _u('comments'));
	// dish panel =====================================================//
	ushout.$dishPanel = ushout.templates.$DIV.clone(true)
		.attr('id', _u('dishpanel'));
	ushout.$dishPanel_operationMask = ushout.templates.$DIV.clone(true)
		.attr('id', _u('dishpanel_operationmask'));
	ushout.$dishPanel_textComment_frame = ushout.templates.$DIV.clone(true)
		.attr('id', _u('dishpanel_textcomment_frame'));
	ushout.$dishPanel_textComment_input = ushout.templates.$INPUT.clone(true)
		.attr({
			'id': _u('dishpanel_textcomment_input'),
			'type': 'text'
		})
		.addClass(_u('simplebox'));
	ushout.$dishPanel_textComment_submit = ushout.templates.$BUTTON.clone(true)
		.attr({
			'id': _u('dishpanel_textcomment_submit')
		})
		.text('Post It');
	ushout.$dishPanel_textComment_cancel = ushout.templates.$BUTTON.clone(true)
		.attr({
			'id': _u('dishpanel_textcomment_cancel')
		})
		.text('Cancel')
		.click(function () {
			ushout.$dishPanel_textComment_frame.removeClass('active');
			ushout.$dishPanel_operationMask.removeClass('active');
			if (ushout.data.shouldResume) {
				video.player.playVideo();
				// reset flag
				ushout.data.shouldResume = false;
			}
		});
	// macro function for creating a dish button structure
	ushout.templates.dishButton = function () {
		var $result = ushout.templates.$BUTTON.clone(true)
			.addClass(_u('dishbutton'))
			.appendTo(ushout.$dishPanel);
		$result.$clipper = ushout.templates.$DIV.clone(true)
			.addClass(_u('dishbutton_clipper'))
			.appendTo($result);
		$result.$hoverDamper = ushout.templates.$DIV.clone(true)
			.addClass(_u('dishbutton_hoverdamper'))
			.appendTo($result.$clipper);
		$result.$hatBlock = ushout.templates.$DIV.clone(true)
			.addClass(_u('dishbutton_hatblock'))
			.appendTo($result.$clipper);
		$result.$centralBlock = ushout.templates.$DIV.clone(true)
			.addClass(_u('dishbutton_centralblock'))
			.appendTo($result.$clipper);
		$result.$title = ushout.templates.$LABEL.clone(true)
			.addClass(_u('dishbutton_title'))
			.appendTo($result.$clipper);
		
		$result.$clipper.mouseover(function () {
			$result.$clipper.addClass(_u('mouseover'));
		}).mouseout(function () {
			$result.$clipper.removeClass(_u('mouseover'));
		});
		return $result;
	};
	
	ushout.$dishButton0 = ushout.templates.dishButton()
		.attr({
			'disabled': true
		})
		.addClass(_u('pos0'))
		.mouseup(function () {
			log('video comment from dish panel');
		});
	ushout.$dishButton0.$title.text('V');
	
	ushout.$dishButton1 = ushout.templates.dishButton()
		.attr({
			'disabled': true
		})
		.addClass(_u('pos1'))
		.mouseup(function () {
			log('comment vote up from dish panel');
		});
	ushout.$dishButton1.$title.text('+');
	
	ushout.$dishButton2 = ushout.templates.dishButton()
		.attr({
			'disabled': true
		})
		.addClass(_u('pos2'))
		.mouseup(function () {
			log('text comment from dish panel');
			ushout.$dishPanel_operationMask.addClass('active');
			ushout.$dishPanel_textComment_frame.addClass('active');
			ushout.$dishPanel_textComment_input.focus();
		});
	ushout.$dishButton2.$title.text('T');
	
	ushout.$dishButton3 = ushout.templates.dishButton()
		.attr({
			'disabled': true
		})
		.addClass(_u('pos3'))
		.mouseup(function () {
			log('audio comment from dish panel');
		});
	ushout.$dishButton3.$title.text('A');
	
	ushout.$dishButton4 = ushout.templates.dishButton()
		.attr({
			'disabled': true
		})
		.addClass(_u('pos4'))
		.mouseup(function () {
			log('comment vote down from dish panel');
		});
	ushout.$dishButton4.$title.text('-');
	
	ushout.$dishButton5 = ushout.templates.dishButton()
		.attr({
			'disabled': true
		})
		.addClass(_u('pos5'))
		.mouseup(function () {
			log('comment info from dish panel');
		});
	ushout.$dishButton5.$title.text('i');
	
	// progress bar ===================================================//
	ushout.$progressBar = ushout.templates.$DIV.clone(true)
		.attr('id', _u('progressbar'));
	ushout.$buffProgress = ushout.templates.$DIV.clone(true)
		.attr('id', _u('buffProgress'));
	ushout.$seekSlider = ushout.templates.$DIV.clone(true)
		.attr('id', _u('seekSlider'));
	
	// create extra templates
	ushout.templates.$controlItem = ushout.templates.$DIV.clone(true)
		.addClass(_u('controlitem'));
	ushout.templates.$controlItem_leftAligned = ushout.templates.$controlItem.clone(true)
		.addClass(_u('leftaligned'));
	ushout.templates.$controlItem_rightAligned = ushout.templates.$controlItem.clone(true)
		.addClass(_u('rightaligned'));
	ushout.templates.$controlItem_button = ushout.templates.$BUTTON.clone(true)
		.attr({
			'disabled': true
		})
		.addClass(_u('simplebox', 'pointercursor'));
	ushout.templates.$controlItem_button_withIcon = ushout.templates.$controlItem_button.clone(true)
		.addClass(_u('iconbutton'));
	
	// control bar ====================================================//
	ushout.$controlBar = ushout.templates.$DIV.clone(true)
		.attr('id', _u('controlbar'));
	// play/pause button ==============================================//
	ushout.$play_pause_frame = ushout.templates.$controlItem_leftAligned.clone(true)
		.attr({
			'id': _u('play_pause_frame')
		});
	ushout.$play_pause_button = ushout.templates.$controlItem_button_withIcon.clone(true)
		.attr({
			'id': _u('play_pause_button'),
			'ushout_tooltip': 'Play'
		});
	
	// volume controls ================================================//
	ushout.$volume_frame = ushout.templates.$controlItem_leftAligned.clone(true)
		.attr({
			'id': _u('volume_frame')
		});
	ushout.$volume_wrapper = ushout.templates.$DIV.clone(true)
		.attr({
			'id': _u('volume_wrapper')
		});
	ushout.$volume_button = ushout.templates.$controlItem_button_withIcon.clone(true)
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
	ushout.$playtime_frame = ushout.templates.$controlItem_leftAligned.clone(true)
		.attr({
			'id': _u('playtime_frame')
		});
	ushout.$playtime_label = ushout.templates.$LABEL.clone(true)
		.attr({
			'id': _u('playtime_label')
		});
	
	// fullwindow =====================================================//
	ushout.$fullwindow_frame = ushout.templates.$controlItem_rightAligned.clone(true)
		.attr({
			'id': _u('fullwindow_frame')
		});
	ushout.$fullwindow_button = ushout.templates.$controlItem_button_withIcon.clone(true)
		.attr({
			'id': _u('fullwindow_button'),
			'ushout_tooltip': 'Full Window',
			'ushout_tooltip_rightaligned': 'true'
		});
	
	// fullscreen =====================================================//
	ushout.$fullscreen_frame = ushout.templates.$controlItem_rightAligned.clone(true)
		.attr({
			'id': _u('fullscreen_frame')
		});
	ushout.$fullscreen_button = ushout.templates.$controlItem_button_withIcon.clone(true)
		.attr({
			'id': _u('fullscreen_button'),
			'ushout_tooltip': 'Full Screen',
			'ushout_tooltip_rightaligned': 'true'
		});
	
	// ushout control bar =============================================//
	ushout.$ushoutBar = ushout.templates.$DIV.clone(true)
		.attr('id', _u('ushoutbar'));
	ushout.$rtc_controls_wrapper = ushout.templates.$DIV.clone(true)
		.attr({
			'id': _u('rtc_controls_wrapper')
		});
	ushout.$rtc_expanded_controls_wrapper = ushout.templates.$DIV.clone(true)
		.attr({
			'id': _u('rtc_expanded_controls_wrapper')
		});
	
	// rtc toggle =====================================================//
	ushout.$rtc_toggle_frame = ushout.templates.$controlItem_rightAligned.clone(true)
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
	ushout.$help_frame = ushout.templates.$controlItem_rightAligned.clone(true)
		.attr({
			'id': _u('help_frame')
		});
	ushout.$help_button = ushout.templates.$controlItem_button_withIcon.clone(true)
		.attr({
			'id': _u('help_button'),
			'ushout_tooltip': 'Help'
		});
	
	// settings button ====================================================//
	ushout.$settings_frame = ushout.templates.$controlItem_rightAligned.clone(true)
		.attr({
			'id': _u('settings_frame')
		});
	ushout.$settings_button = ushout.templates.$controlItem_button_withIcon.clone(true)
		.attr({
			'id': _u('settings_button'),
			'ushout_tooltip': 'Settings'
		});
	
	// channels select list ===========================================//
	ushout.$rtc_channels_frame = ushout.templates.$controlItem_rightAligned.clone(true)
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
	ushout.$rtc_channels_expand_button = ushout.templates.$controlItem_button_withIcon.clone(true)
		.attr({
			'id': _u('rtc_channels_expand_button')
		});
	
	// audio comment button ===========================================//
	ushout.$post_audio_comment_frame = ushout.templates.$controlItem_leftAligned.clone(true)
		.attr({
			'id': _u('post_audio_comment_frame')
		});
	ushout.$post_audio_comment_button = ushout.templates.$controlItem_button_withIcon.clone(true)
		.attr({
			'id': _u('post_audio_comment_button'),
			'ushout_tooltip': 'Audio Comment'
		});
	
	// video comment button ===========================================//
	ushout.$post_video_comment_frame = ushout.templates.$controlItem_leftAligned.clone(true)
		.attr({
			'id': _u('post_video_comment_frame')
		});
	ushout.$post_video_comment_button = ushout.templates.$controlItem_button_withIcon.clone(true)
		.attr({
			'id': _u('post_video_comment_button'),
			'ushout_tooltip': 'Video Comment'
		});
	
	// text comment field =============================================//
	ushout.$post_text_comment_frame = ushout.templates.$controlItem.clone(true)
		.attr({
			'id': _u('post_text_comment_frame')
		});
	ushout.$post_text_comment_input = ushout.templates.$INPUT.clone(true)
		.attr({
			'id': _u('post_text_comment_input'),
			'type': 'text'
		})
		.addClass(_u('simplebox'));
	ushout.$post_text_comment_button = ushout.templates.$controlItem_button_withIcon.clone(true)
		.attr({
			'id': _u('post_text_comment_button'),
			'ushout_tooltip': 'Post Comment'
		})
		.text('Send');
	
	ushout.$overlay_base.append(
		ushout.$overlay.append(
			ushout.$commentsPanel.append(
				ushout.$commentsList
			),
			ushout.$touchArea.append(
				ushout.$comments,
				ushout.$dishPanel_operationMask,
				ushout.$dishPanel_textComment_frame.append(
					ushout.$dishPanel_textComment_input,
					ushout.$dishPanel_textComment_submit,
					ushout.$dishPanel_textComment_cancel
				),
				ushout.$dishPanel
			),
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
	
	// dish panel
	ushout.data.dishPanelDelay = 300;
	ushout.data.dishPanelTimer = -1;
	ushout.$dishPanel.moveTo = function (x, y) {
		if (y > 0.7) {
			ushout.$dishPanel_textComment_frame.addClass('lower');
		} else {
			ushout.$dishPanel_textComment_frame.removeClass('lower');
		}
		var position = {
			top: y * 100 + '%',
			left: x * 100 + '%'
		};
		ushout.$dishPanel.css(position);
		ushout.$dishPanel_textComment_frame.css(position);
	};
	ushout.$dishPanel.popUp = function () {
		ushout.$dishPanel.addClass('active');
		// pause video playback if it is playing
		if (ushout.data.playState === playState.playing) {
			// share shouldResume variable with ushout.$seekSlider
			ushout.data.shouldResume = true;
			video.player.pauseVideo();
		} else {
			ushout.data.shouldResume = false;
		}
	};
	$(document).mouseup(function () {
		window.clearTimeout(ushout.data.dishPanelTimer);
		if (ushout.$dishPanel.hasClass('active')) {
			ushout.$dishPanel.removeClass('active');
			if (ushout.$dishPanel_operationMask.hasClass('active')) {
				
			} else {
				if (ushout.data.shouldResume) {
					video.player.playVideo();
					// reset flag
					ushout.data.shouldResume = false;
				}
			}
		}
	});
	ushout.$comments.mousedown(function (event) {
		if (event.which === 1) { // LMB
			var mouseX = (event.pageX - ushout.$touchArea.offset().left) / ushout.$touchArea.width(),
				mouseY = (event.pageY - ushout.$touchArea.offset().top) / ushout.$touchArea.height();
			
			ushout.$dishButton2
				.attr({
					'disabled': false
				});
			
			ushout.$dishPanel.moveTo(mouseX, mouseY);
			window.clearTimeout(ushout.data.dishPanelTimer);
			ushout.data.dishPanelTimer = window.setTimeout(ushout.$dishPanel.popUp, ushout.data.dishPanelDelay);
			return false;
		}
	});
	
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
			case playState.unstarted:
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
			case playState.ended :
				video.player.playVideo();
				break;
			case playState.playing :
				video.player.pauseVideo();
				break;
			case playState.paused :
				video.player.playVideo();
				break;
			case playState.buffering :
				break;
			case playState.video_cued :
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
			ushout.controller.haltBulletsUpdating();
			ushout.controller.pauseAnimation();
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
		//	ushout.controller.setBulletsUpdatingFrame(video.player.getCurrentTime());
			ushout.controller.resumeAnimation();
			ushout.controller.beginBulletsUpdating();
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
	
	// fix flash player
	youtube.$movieplayer.attr('wmode', 'opaque');
	
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
			max: (video.player) ? video.player.getDuration() : 100, // set max
			value: (video.player) ? video.player.getCurrentTime() : 0 // set value
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
	
	// comments related functions
	ushout.controller.pauseAnimation = function () {
		
	};
	ushout.controller.resumeAnimation = function () {
		
	};
	ushout.controller.shoot = function (comment, typeAgent) {
		var $newBullet = ushout.templates.$commentBullet.clone(true);
		if (typeof typeAgent !== 'undefined') $newBullet.addClass(typeAgent);
		// prepare content based on data type
		switch (comment.dtype) {
			case 0: // text
				$newBullet.addClass(_u('textcomment'));
				$newBullet.text(comment.data);
				break;
			case 1: // audio
				break;
			case 2: // video
				break;
			case 3: // macro
				break;
			default:
		}
		
		switch (comment.ptype) {
			case 0: // normal, right-to-left floating comment
				// find available height
				var bulletTop, bulletLeft, bulletLength;
				
				var $last = ushout.data.bullets[0].$last;
				if ($last !== null) {
					var lastBullet_position = $last.position();
					var lastBullet_left   = lastBullet_position.left,
						lastBullet_top    = lastBullet_position.top,
						lastBullet_width  = $last.width(),
						lastBullet_height = $last.height();
					var lastBullet_right  = lastBullet_left + lastBullet_width,
						lastBullet_bottom = lastBullet_top + lastBullet_height;
					if (lastBullet_right > ushout.$comments.width()) {
						// the last comment hasn't left startline
						bulletTop = lastBullet_bottom + ushout.data.bulletSeparation.y;
					} else {
						// the last comment has left startline
						bulletTop = 0;
					}
				} else {
					bulletTop = 0;
				}
				bulletLeft = ushout.$comments.width();
				
				log('comment (' + comment.id + ') shooting at ' + bulletTop);
				// no need to save it
			//	ushout.data.bullets[0].list.push($newBullet);
				// use append because new bullets should always cover the old ones
				ushout.$comments.append($newBullet);
				// measure length after inserting into DOM
				bulletLength = $newBullet.width();
				
				var trackDuration = (bulletLength + bulletLeft) / ushout.data.bulletSpeed * 1000;
				var endingLeft = 0 - bulletLength;
				$newBullet.css({
					top: bulletTop + 'px',
					left: bulletLeft + 'px'
				}).animate({
					left: endingLeft + 'px',
				}, trackDuration, 'linear', function () {
					// remove bullet from track
					$newBullet.remove();
				});
				break;
			case 1:
				break;
			case 2:
				break;
			case 3:
				break;
			case 4:
				break;
			default:
				break;
		}
	};
	
	ushout.controller.shootBullets = function () {
		var lastShot = ushout.data.lastShot;
		var videoTimeInMilliseconds = Math.floor(video.player.getCurrentTime() * 1000);
		var magazine = [];

		// search the comments array to find the comments that should be shot out now
		for (var i = 0, n = ushout.data.comments.length; i < n; ++i) {
			var currentBullet = ushout.data.comments[i];
			if (lastShot <= currentBullet.tiv && currentBullet.tiv < videoTimeInMilliseconds) {
				magazine.push(currentBullet);
			}
		}
		// shoot comments
		if (magazine.length > 0) {
			log('shooting from ' + lastShot + ' to ' + videoTimeInMilliseconds);
			while (magazine.length > 0) {
				ushout.controller.shoot(magazine.shift());
			}
		}
		// update the timestamp of lastshot
		ushout.data.lastShot = videoTimeInMilliseconds;
	};
	ushout.controller.setBulletsUpdatingFrame = function (seconds) {
		var newFrame = Math.floor(seconds * 1000);
		ushout.data.lastShot = newFrame;
		log('newFrame: ' + newFrame);
    };
	
	ushout.controller.updateBullets = function () {
		if (video.player && (ushout.data.playState === playState.playing) && !ushout.data.seekBarDragging) {
			ushout.controller.shootBullets();
		}
	};
	ushout.controller.beginBulletsUpdating = function () {
		if (ushout.data.bulletUpdateTimer)
			window.clearInterval(ushout.data.bulletUpdateTimer);
		ushout.data.bulletUpdateTimer = window.setInterval(ushout.controller.updateBullets, ushout.data.commentsUpdateTime);
	};
	ushout.controller.haltBulletsUpdating = function () {
		if (ushout.data.bulletUpdateTimer)
			window.clearInterval(ushout.data.bulletUpdateTimer);
	};
	
	ushout.controller.loadComments = function (comments) {
		for (var i = 0, n = comments.length; i < n; ++i) {
			var newComment = comments[i];
			// insert into commentlist data structure
			ushout.data.comments.push(newComment);
			// insert into DOM
			var $newComment = ushout.templates.$commentItem.clone(true)
				.attr({
					'id': _u('comment_' + newComment.id), // id of the comment in database
					'uid': newComment.uid, // id of the user who posted this comment
					'pid': newComment.pid, // post id. non-zero if this is a follow-up
					'tiv': newComment.tiv, // time in video, in milliseconds
					'dop': newComment.dop, // date of posting
					'ptype': newComment.ptype, // position type
					/**
					 * ptype: 0 - normal, right-to-left floating comment
					 * ptype: 1 - normal, left-to-right floating comment
					 * ptype: 2 - normal, top fixed comment
					 * ptype: 3 - normal, bottom fixed comment
					 * ptype: 4 - POI (point of interest) comment
					 **/
					'dtype': newComment.dtype, // data type
					/**
					 * dtype: 0 - text
					 * dtype: 1 - audio
					 * dtype: 2 - video
					 * dtype: 3 - macro
					 **/
					'data': newComment.data // comment data in strings (base64 string for binary data)
				});
			switch (newComment.dtype) {
				case 0: // text comment
					$newComment.text(newComment.data);
					break;
				default:
			}
			ushout.$commentsList.append($newComment);
		}
	};
	
	// connect to ushout server
	video.updateID();
	ushout.server.pullComments(0, ushout.controller.loadComments);
}