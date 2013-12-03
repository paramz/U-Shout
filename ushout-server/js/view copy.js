var commentsUpdateTime = 300;
var player, playingStateCache, updateTimer, bulletUpdateTimer;

var playerWrapper = bodyWrapper.find('#playerWrapper');

var fullWindowContainer = $('<div id="fullWindowContainer">')
	.offset({
		top: playerWrapper.offset().top - bodyWrapper.offset().top,
		left: playerWrapper.offset().left - bodyWrapper.offset().left
	})
	.css({
		position: 'absolute'
	})
	.width(playerWrapper.outerWidth())
	.height(playerWrapper.outerHeight())
	.appendTo(bodyWrapper);

var playerOriginalParent = playerWrapper.parent();
playerWrapper.appendTo(fullWindowContainer);
/*= videoController
-----------------------------------------------------------------*/
var videoController = new function () {
	var JQE = playerWrapper.find('#videoController')
		.mouseenter(videoControllerOnMouseEnter)
		.mouseleave(videoControllerOnMouseLeave);
}
function videoControllerOnMouseEnter() {
	seekBar.expand();
}
function videoControllerOnMouseLeave() {
	seekBar.collapse();
}
/*= playButton
-----------------------------------------------------------------*/
var playButton = new function () {
	var JQE = playerWrapper.find('#playButton')
		.addClass('ui-12-12-icon-button no-border interactable')
		.button({
			disabled: true,
			label: 'play/pause',
			icons: {
				primary: 'ui-icon-play'
			},
			text: false
		})
		.click(playButtonOnClick);
	this.enable = function () {
		JQE.button('enable');
	};
	this.disable = function () {
		JQE.button('disable');
	};
	this.showPlayIcon = function () {
		JQE.button({
			icons: {
				primary: 'ui-icon-play'
			}
		});
	};
	this.showPauseIcon = function () {
		JQE.button({
			icons: {
				primary: 'ui-icon-pause'
			}
		});
	};
};
function playButtonOnClick() {
//	console.log('playbutton.click');
	switch (player.getPlayerState()) {
		case -1: // unstarted
		case YT.PlayerState.CUED:
		case YT.PlayerState.ENDED:
		case YT.PlayerState.PAUSED:
		//	console.log('request player playing');
			player.playVideo();
			break;
		case YT.PlayerState.PLAYING:
		case YT.PlayerState.BUFFERING:
		//	console.log('request player pausing');
			player.pauseVideo();
			break;
	}
}
/*= fullscreenButton
-----------------------------------------------------------------*/
var fullscreenButton = new function () {
	var JQE = playerWrapper.find('#fullscreenButton')
		.addClass('ui-12-12-icon-button no-border interactable')
		.button({
			disabled: true,
			label: 'expand/collapse',
			icons: {
				primary: 'ui-icon-expand'
			},
			text: false
		})
		.click(fullscreenButtonOnClick);
	this.enable = function () {
		JQE.button('enable');
	};
	this.disable = function () {
		JQE.button('disable');
	};
	this.showExpandIcon = function () {
		JQE.button({
			icons: {
				primary: 'ui-icon-expand'
			}
		});
	};
	this.showCollapseIcon = function () {
		JQE.button({
			icons: {
				primary: 'ui-icon-collapse'
			}
		});
	};
};
function fullscreenButtonOnClick() {
	if (playerWrapper.hasClass('fullWindow')) {
		// collapse
		bodyWrapper.removeClass('noSize');
		fullWindowContainer.removeClass('fullWindow');
		fullscreenButton.showExpandIcon();
	} else {
		// expand
		bodyWrapper.addClass('noSize');
		fullWindowContainer.addClass('fullWindow');
		fullscreenButton.showCollapseIcon();
	}
	playerWrapper.toggleClass('fullWindow');
}
/*= commentPanel
-----------------------------------------------------------------*/
var commentPanel = new function () {
	var checkpointStamp;
	var form = playerWrapper.find('#postPanel');
	var inputField = form.find('#commentField')
		.attr('disabled', 'disabled');
	var submitButton = form.find('#postButton')
		.addClass('ui-12-12-icon-button no-border interactable')
		.button({
			disabled: true,
			label: 'SHOUT!',
			icons: {
				primary: 'ui-icon-post'
			}
		});
	var secret = false;
	this.enable = function (key) {
		// this secret prevents user from using this function
		if (secret && key !== secret) return;
		secret = false;
		inputField.attr('disabled', false);
		submitButton.button({
			disabled: false,
			label: 'SHOUT!'
		});
	};
	this.disable = function (key) {
		if (typeof key !== 'undefined') secret = key;
		inputField.attr('disabled', 'disabled');
		submitButton.button({
			disabled: true,
			label: 'WAIT...'
		});
	};
	this.text = function () {
		return inputField.val();
	};
	this.clear = function () {
		inputField.val('');
	};
	this.setCheckpoint = function (seconds) {
		checkpointStamp = seconds;
	};
	form.submit(function () {
		var commentText = inputField.val();
		commentPanel.clear();
		// trim white spaces
		commentText = commentText.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
		// there has to be content
		if (commentText === '') return false;
		var videoTimeInMilliseconds = parseInt(player.getCurrentTime() * 1000);
		var secretTimeStamp = (new Date()).getMilliseconds();
		form.find('#postStamp').val(secretTimeStamp);
		form.find('#postTime').val(videoTimeInMilliseconds);
		form.find('#postContent').val(commentText);
		commentPanel.disable(secretTimeStamp);
		return true;
	});
};
/*= volumeControlsWrapper
-----------------------------------------------------------------*/
var volumeControlsWrapper = playerWrapper.find('#volumeControlsWrapper')
	.mouseenter(volumeControlsWrapperOnMouseEnter)
	.mouseleave(volumeControlsWrapperOnMouseLeave);
function volumeControlsWrapperOnMouseEnter() {
	volumeControlsWrapper.addClass('expanded', 100);
}
function volumeControlsWrapperOnMouseLeave() {
	volumeControlsWrapper.removeClass('expanded', 100);
}
/*= volumeButton
-----------------------------------------------------------------*/
var volumeButton = new function () {
	var JQE = playerWrapper.find('#volumeButton')
		.addClass('ui-12-12-icon-button no-border interactable')
		.button({
			disabled: true,
			label: 'volume',
			icons: {
				primary: 'ui-icon-volume'
			},
			text: false
		})
		.click(volumeButtonOnClick);
	this.enable = function () {
		JQE.button('enable');
	};
	this.disable = function () {
		JQE.button('disable');
	};
	this.showVolumeIcon = function () {
		JQE.button({
			icons: {
				primary: 'ui-icon-volume'
			}
		});
	};
	this.showMutedIcon = function () {
		JQE.button({
			icons: {
				primary: 'ui-icon-muted'
			}
		});
	};
};
function volumeButtonOnClick() {
	if (player.isMuted()) {
		volumeBar.unMute();
	} else {
		volumeBar.mute();
	}
}
/*= volumeBar
-----------------------------------------------------------------*/
var volumeBar = new function () {
	var restoreValue = 100;
	var slider = playerWrapper.find('#volumeSlider').slider({
		animate: false,
		disabled: true, // slider initially disabled
		max: 100,
		min: 0,
		orientation: 'horizontal',
		value: restoreValue,
		range: 'min',
		start: function (e, ui) {
			// when sliding, it can not be muted
			volumeBar.unMute();
		},
		slide: function (e, ui) {
			player.setVolume(ui.value);
		},
		change: function (e, ui) {
			if (e.originalEvent) {
				// changed by user
				player.setVolume(ui.value);
			} else {
				// changed by program
			}
		}
	});
	this.initializeFromPlayer = function () {
		slider.slider({
			disabled: false,
			value: player.getVolume()
		});
	};
	this.updateFromPlayer = function () {
		slider.slider({
			value: player.getVolume()
		});
	};
	this.mute = function () {
		restoreValue = player.getVolume();
		player.mute();
		slider.slider({
			value: 0
		});
		volumeButton.showMutedIcon();
	};
	this.unMute = function () {
		player.unMute();
		slider.slider({
			value: restoreValue
		});
		volumeButton.showVolumeIcon();
	};
};
/*= elapsedTimeLabel
-----------------------------------------------------------------*/
var elapsedTimeLabel = new function () {
	var JQE = playerWrapper.find('#timeElapsed');
	var time = [-1, -1, -1];
	this.hours = function () {
		return time[2];
	};
	this.minutes = function () {
		return time[1];
	};
	this.seconds = function () {
		return time[0];
	};
	this.updateFromPlayer = function () {
		var seconds = parseInt(player.getCurrentTime());
		time[0] = seconds % 60;
		time[1] = ((seconds - time[0]) / 60) % 60;
		time[2] = (seconds - time[0] - time[1] * 60) / 3600;
		var timeText = ((videoLengthLabel.hours() > 0) ? (time[2] + ':') : '') + pad(time[1], 2) + ':' + pad(time[0], 2);
		JQE.text(timeText);
	};
};
/*= videoLengthLabel
-----------------------------------------------------------------*/
var videoLengthLabel = new function () {
	var JQE = playerWrapper.find('#videoLength');
	var duration = [-1, -1, -1];
	this.hours = function () {
		return duration[2];
	};
	this.minutes = function () {
		return duration[1];
	};
	this.seconds = function () {
		return duration[0];
	};
	this.updateFromPlayer = function () {
		if (player) {
			var seconds = parseInt(player.getDuration());
			console.log('video length: ' + seconds);
			duration[0] = seconds % 60;
			duration[1] = ((seconds - duration[0]) / 60) % 60;
			duration[2] = (seconds - duration[0] - duration[1] * 60) / 3600;
			var durationText = ((duration[2] > 0) ? (duration[2] + ':') : '') + pad(duration[1], 2) + ':' + pad(duration[0], 2);
			JQE.text(durationText);
		}
	};
};
/*= seekBar
-----------------------------------------------------------------*/
var seekBar = new function () {
	var JQE = playerWrapper.find('#seekBar');
	var dragging = false;
	var slider = JQE.find('#seekSlider').slider({
		animate: false,
		disabled: true, // slider initially disabled
		max: 100,
		min: 0,
		orientation: 'horizontal',
		value: 0,
		range: 'min',
		start: function (e, ui) {
			// stop updating slider
			dragging = true;
		},
		slide: function (e, ui) {
			player.seekTo(ui.value, false);
		},
		change: function (e, ui) {
			if (e.originalEvent) {
				// changed by user
				player.seekTo(ui.value, true);
			} else {
				// changed by program
			}
		},
		stop: function (e, ui) {
			// continue updating slider
			dragging = false;
		}
	}).removeClass('ui-corner-all');
	var buffProgress = playerWrapper.find('#buffProgress').progressbar({
		value: 0
	});
	this.expand = function () {
		JQE.addClass('expanded', 100);
	};
	this.collapse = function () {
		JQE.removeClass('expanded', 100);
	};
	this.dragging = function () {
		return dragging;
	}
	this.updateFromPlayer = function () {
		if (!dragging) slider.slider({
			value: player.getCurrentTime(),
			max: player.getDuration()
		});
		var buffProgressValue = player.getVideoLoadedFraction() * 100;
		if (buffProgressValue != buffProgress.progressbar('value')) buffProgress.progressbar('value', buffProgressValue);
	};
	this.initializeFromPlayer = function () {
		slider.slider({
			disabled: false,
			max: player.getDuration(),
			value: player.getCurrentTime()
		});
	};
};
/*= commentsTable
-----------------------------------------------------------------*/
var commentsTable = new function () {
	var JQE = bodyWrapper.find('#commentsTable');
	var contentContainer = JQE.find('tbody');
	var bulletsArray = [];
	var lastShot = 0;
	this.addComment = function (timeInMilliseconds, content, dateInMilliseconds, cid) {
		/**
		 * here has a potential issue: max integer value in Javascript
		 * dateInMilliseconds could be really large
		 */
		timeInMilliseconds = parseInt(timeInMilliseconds);
		dateInMilliseconds = parseInt(dateInMilliseconds);
		cid = parseInt(cid);
		// creates new bullet
		var newBullet = [];
		newBullet[0] = timeInMilliseconds;
		newBullet[1] = content;
		bulletsArray.push(newBullet);
		
		var timeInSeconds = parseInt(timeInMilliseconds / 1000);
		var second = timeInSeconds % 60;
		var minute = ((timeInSeconds - second) / 60) % 60;
		var hour = (timeInSeconds - second - minute * 60) / 3600;
		var timeText = ((videoLengthLabel.hours() > 0) ? (hour + ':') : '') + pad(minute, 2) + ':' + pad(second, 2);
		
		var contentText = content;
		var dateText = (new Date(dateInMilliseconds)).toISOString();
		
		var ele_id = 'cmt_' + cid;
		var ele_tr = $('<tr>')
			.attr('id', ele_id)
			.append($('<td class="timestamp">').text(timeText))
			.append($('<td class="content">').append($('<div>').text(contentText)))
			.append($('<td class="postdate">').text(dateText));
		contentContainer.append(ele_tr);
	};
	this.shoot = function () {
		var videoTimeInMilliseconds = parseInt(player.getCurrentTime() * 1000);
	//	console.log('shooting between ' + lastShot + ' and ' + videoTimeInMilliseconds);
		for (var i = 0; i < bulletsArray.length; ++i) {
			var currentBullet = bulletsArray[i];
			var timeInMilliseconds = currentBullet[0],
				content = currentBullet[1];
			if (lastShot <= timeInMilliseconds && timeInMilliseconds < videoTimeInMilliseconds) {
				commentDisplay.shoot(content);
			}
		}
		lastShot = videoTimeInMilliseconds;
	};
	this.setFrame = function () {
		var newFrame = parseInt(player.getCurrentTime() * 1000) - 10;
		lastShot = newFrame;
		console.log('newFrame: ' + newFrame);
	};
};
var commentDisplay = new function () {
	var JQE = playerWrapper.find('#commentField');
	var referenceBar = $('<div class="commentTrack" role="reference">').appendTo(JQE);
	var pixelPerSecond = 100;
	var commentTracks = [];
	function _findAvailableTrackIndex() {
		// see if any track is available from top to bottom
		for (var i = 0; i < commentTracks.length; ++i) {
			if (_trackAvailable(i)) {
				return i;
			}
		}
		return _newTrack();
	}
	function _newTrack() {
		var index = commentTracks.length;
		commentTracks[index] = $('<div class="commentTrack">').insertBefore(referenceBar);
		return index;
	}
	function _removeTrack(index) {
		// can only remove the last track
		if (commentTracks.length - 1 === index) {
			var trackToBeRemoved = commentTracks.pop();
			trackToBeRemoved.remove();
		}
	}
	function _trackAvailable(index) {
		var commentTrack = commentTracks[index];
		var commentLines = commentTrack.find('.commentLine');
		for (var i = 0; i < commentLines.length; ++i) {
			var commentLine = $(commentLines[i]);
			var containerOuterWidth = JQE.outerWidth();
			var commentLeftDistance = commentLine.position().left;
			var commentOuterWidth = commentLine.width();
			var commentTailPosition = commentLeftDistance + commentOuterWidth;
			if (commentTailPosition >= containerOuterWidth) {
				return false;
			}
		}
		return true;
	}
	function _cleanTracks() {
		for (var i = commentTracks.length - 1; i >= 0; --i) {
			var commentTrack = commentTracks[i];
			var commentLines = commentTrack.find('.commentLine');
			for (var j = 0; j < commentLines.length; ++j) {
				var commentLine = $(commentLines[j]);
				var containerOuterWidth = JQE.outerWidth();
				var commentLeftDistance = commentLine.position().left;
				var commentOuterWidth = commentLine.width();
				var commentTailPosition = commentLeftDistance + commentOuterWidth;
				if (commentTailPosition <= 0) {
					commentLine.remove();
				}
			}
			var newCommentCount = commentTrack.find('.commentLine').length;
			if (newCommentCount > 0) break;
			else _removeTrack(i);
		}
	}
	function _trackDuration(width) {
		return (width + JQE.outerWidth()) / pixelPerSecond * 1000;
	}
	this.shoot = function (content, typeAgent) {
		var newBullet = $('<div class="commentLine">').text(content);
		if (typeof typeAgent !== 'undefined') newBullet.addClass(typeAgent);
		var availableTrackID = _findAvailableTrackIndex();
		console.log('availableTrackID: ' + availableTrackID);
		commentTracks[availableTrackID].append(newBullet);
		var bulletLength = newBullet.width();
		var trackDuration = _trackDuration(bulletLength);
		var startingLeft = JQE.outerWidth();
		var endingLeft = 0 - bulletLength;
		newBullet.css({
			left: startingLeft + 'px',
		}).animate({
			left: endingLeft + 'px',
		}, trackDuration, 'linear', _cleanTracks);
	};
};
/*= queryIframe
-----------------------------------------------------------------*/
var queryIframe = new function () {
	var JQE = bodyWrapper.find('#queryIframe');
	this.initialize = function () {
		var newSrc = 'feeds.php?v=' + youtubeVideoID;
		JQE.attr('src', newSrc);
	};
};

/*= controlPanelUpdater
-----------------------------------------------------------------*/
var controlPanelUpdater = new function () {
	var updateTimer = -1;
	var updateInterval = 600;
	function _update() {
		if (player) {
			// update time label
			videoLengthLabel.updateFromPlayer();
			elapsedTimeLabel.updateFromPlayer();
			// update slider (and progress bar)
			seekBar.updateFromPlayer();
		}
	}
	this.start = function () {
		if (updateTimer !== -1) {
			console.warn('Logical Error: control panel updater already started.');
		} else {
			updateTimer = window.setInterval(_update, updateInterval);
			console.log('Control panel updater started.');
		}
	};
	this.end = function () {
		if (updateTimer === -1) {
			console.warn('Logical Error: control panel updater not yet started.');
		} else {
			window.clearInterval(updateTimer);
			updateTimer = -1;
			console.log('Control panel updater ended.');
		}
	};
	this.setInterval = function (interval) {
		if (updateTimer !== -1) {
			console.warn('Logical Error: can not change update interval; control panel updater running.');
		} else {
			updateInterval = intval(interval);
			console.log('Control panel updating interval set to ' + updateInterval + '.');
		}
	};
};

/*= prevent text selection
-----------------------------------------------------------------*/
$('.interactable').mousedown(function () {return false;});

/*= The API will call this function when it's ready.
-----------------------------------------------------------------*/
function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
		height: '100%',
		width: '100%',
		videoId: youtubeVideoID,
		playerVars: {
			'autoplay'      : 0,
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
		},
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
}
/*= The API will call this function when the video player is ready.
-----------------------------------------------------------------*/
function onPlayerReady(event) {
//	player.cueVideoById(youtubeVideoID, 0, 'default');
	playButton.enable();
	fullscreenButton.enable();
	commentPanel.enable();
	volumeButton.enable();
	// change duration label
	videoLengthLabel.updateFromPlayer();
	elapsedTimeLabel.updateFromPlayer();
	// change seek bar max value and enable the slider
	seekBar.initializeFromPlayer();
	volumeBar.initializeFromPlayer();
	queryIframe.initialize();
	// initialize cache
	playingStateCache = player.getPlayerState();
	console.log('IS: ' + playingStateCache);
	// start player info updater
	controlPanelUpdater.start();
}
/**
 * this callback function gets feedback from video player
 * and changes UI according to player status
 */
function onPlayerStateChange(event) {
	var newState = event.data;
	if (playingStateCache !== newState) {
		// state changed
		switch (event.data) {
			case -1: // unstarted
				playerUnStarted();
				break;
			case YT.PlayerState.CUED:
				playerOnCue();
				break;
			case YT.PlayerState.ENDED:
				playerOnEnd();
				break;
			case YT.PlayerState.PAUSED:
				playerOnPause();
				break;
			case YT.PlayerState.PLAYING:
				playerOnPlay();
				break;
			case YT.PlayerState.BUFFERING:
				playerOnBuffer();
				break;
		}
		// update cache
		playingStateCache = event.data;
	}
	// bullets control
	switch (event.data) {
		case -1: // unstarted
		case YT.PlayerState.CUED:
		case YT.PlayerState.ENDED:
		case YT.PlayerState.PAUSED:
		case YT.PlayerState.BUFFERING:
			haltBulletsUpdating();
			break;
		case YT.PlayerState.PLAYING:
			commentsTable.setFrame();
			beginBulletsUpdating();
			break;
	}
}
/*= player state change responding handler
------------------------------------------------------------------------------------------------------------------------*/
function playerUnStarted() {
	console.log('SC: unstarted (-1)');
	playButton.showPlayIcon();
}
function playerOnEnd() {
	console.log('SC: ended (0)');
	playButton.showPlayIcon();
}
function playerOnPlay() {
	console.log('SC: playing (1)');
	playButton.showPauseIcon();
}
function playerOnPause() {
	console.log('SC: paused (2)');
	playButton.showPlayIcon();
}
function playerOnBuffer() {
	console.log('SC: buffering (3)');
	playButton.showPlayIcon();
}
function playerOnCue() {
	console.log('SC: cued (5)');
	playButton.showPlayIcon();
}




function updateBullets() {
	if (player && player.getPlayerState() === YT.PlayerState.PLAYING && !seekBar.dragging()) {
		commentsTable.shoot();
	}
}
function haltBulletsUpdating() {
	window.clearInterval(bulletUpdateTimer);
}
function beginBulletsUpdating() {
	if (bulletUpdateTimer) window.clearInterval(bulletUpdateTimer);
	bulletUpdateTimer = window.setInterval(updateBullets, commentsUpdateTime);
}
/*= helper functions
------------------------------------------------------------------------------------------------------------------------*/
function pad(number, length) {
	var str = '' + number;
	while (str.length < length) {
		str = '0' + str;
	}
	return str;
}