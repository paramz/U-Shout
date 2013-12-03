var commentsUpdateTime = 100;
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
/*= controller
this object controls video playback (communication with yt API)
and control UI
-----------------------------------------------------------------*/
var controller = new function () {
    var container,
            playButton,
                fullscreenButton,
                    commentPanel,
                        volumeControlsWrapper,
                            volumeButton,
                                volumeBar,
                                    elapsedTimeLabel,
                                        durationTimeLabel,
                                            seekBar,
                                                seekSlider,
                                                    buffProgress;
    /*= container
    -----------------------------------------------------------------*/
    container = playerWrapper.find('#videoController')
        .mouseenter(function videoControllerOnMouseEnter() {
            controller.expandSeekBar();
        })
        .mouseleave(function videoControllerOnMouseLeave() {
            controller.collapseSeekBar();
        });
    /*= playButton
    -----------------------------------------------------------------*/
    playButton = container.find('#playButton')
        .addClass('ui-12-12-icon-button no-border interactable')
        .button({
            disabled: true,
            label: 'play/pause',
            icons: {
                primary: 'ui-icon-play'
            },
            text: false
        })
        .click(function playButtonOnClick() {
            console.log('User Action: playbutton.clicked');
            // use cached data for consistant performance and problem with API delay
            switch (playingStateCache) {
                case -1: // unstarted
                case YT.PlayerState.CUED:
                case YT.PlayerState.ENDED:
                case YT.PlayerState.PAUSED:
                case YT.PlayerState.BUFFERING:
                //    console.log('request player playing');
                    player.playVideo();
                    // due to API delay, can not assume player state at this point
                    // has to wait onPlayerStateChange callback and update cache
                    break;
                case YT.PlayerState.PLAYING:
                //    console.log('request player pausing');
                    player.pauseVideo();
                    // due to API delay, can not assume player state at this point
                    // has to wait onPlayerStateChange callback and update cache
                    break;
            }
        });
    this.enablePlayButton = function () {
        _enableButton(playButton);
        return this;
    };
    this.disablePlayButton = function () {
        _disableButton(playButton);
        return this;
    };
    this.showPlayButton = function () {
        _setButtonIcon(playButton, 'ui-icon-play');
        return this;
    };
    this.showPauseButton = function () {
        _setButtonIcon(playButton, 'ui-icon-pause');
        return this;
    };
    /*= fullscreenButton
    -----------------------------------------------------------------*/
    fullscreenButton = container.find('#fullscreenButton')
        .addClass('ui-12-12-icon-button no-border interactable')
        .button({
            disabled: true,
            label: 'expand/collapse',
            icons: {
                primary: 'ui-icon-expand'
            },
            text: false
        })
        .click(function fullscreenButtonOnClick() {
            if (playerWrapper.hasClass('fullWindow')) {
                // collapse to normal size
                bodyWrapper.removeClass('noSize');
                fullWindowContainer.removeClass('fullWindow');
                controller.showExpandButton();
            } else {
                // expand to full window
                bodyWrapper.addClass('noSize');
                fullWindowContainer.addClass('fullWindow');
                controller.showCollapseButton();
            }
            playerWrapper.toggleClass('fullWindow');
        });
    this.enableFullscreenButton = function () {
        _enableButton(fullscreenButton);
        return this;
    };
    this.disableFullscreenButton = function () {
        _disableButton(fullscreenButton);
        return this;
    };
    this.showExpandButton = function () {
        _setButtonIcon(fullscreenButton, 'ui-icon-expand');
        return this;
    };
    this.showCollapseButton = function () {
        _setButtonIcon(fullscreenButton, 'ui-icon-collapse');
        return this;
    };
    /*= volumeControlsWrapper
    -----------------------------------------------------------------*/
    volumeControlsWrapper = container.find('#volumeControlsWrapper')
        .mouseenter(function volumeControlsWrapperOnMouseEnter() {
            volumeControlsWrapper.addClass('expanded', 100);
        })
        .mouseleave(function volumeControlsWrapperOnMouseLeave() {
            volumeControlsWrapper.removeClass('expanded', 100);
        });
    /*= volumeButton
    -----------------------------------------------------------------*/
    volumeButton = container.find('#volumeButton')
        .addClass('ui-12-12-icon-button no-border interactable')
        .button({
            disabled: true,
            label: 'volume',
            icons: {
                primary: 'ui-icon-volume'
            },
            text: false
        })
        .click(function volumeButtonOnClick() {
            if (player.isMuted()) {
                controller.unMute();
            } else {
                controller.mute();
            }
        });
    this.enableVolumeButton = function () {
        _enableButton(volumeButton);
        return this;
    };
    this.disableVolumeButton = function () {
        _disableButton(volumeButton);
        return this;
    };
    this.showVolumeButton = function () {
        _setButtonIcon(volumeButton, 'ui-icon-volume');
        return this;
    };
    this.showMutedButton = function () {
        _setButtonIcon(volumeButton, 'ui-icon-muted');
        return this;
    };
    /*= volumeBar
    -----------------------------------------------------------------*/
    var restoreValue = 100;
    volumeBar = container.find('#volumeSlider').slider({
        animate: false, // disable sliding animation
        disabled: true, // slider initially disabled
        max: 100,
        min: 0,
        orientation: 'horizontal',
        value: restoreValue,
        range: 'min',
        start: function (e, ui) {
            // when sliding, it can not be muted
            controller.unMute();
        },
        slide: function (e, ui) {
            // update player as it slides
            player.setVolume(ui.value);
        },
        change: function (e, ui) {
            if (e.originalEvent) {
                // changed by user
                player.setVolume(ui.value);
                // save change to html5 localstorage
                localStorage.setItem('ushout_volume', ui.value);
            } else {
                // changed by program
            }
        }
    });
    this.mute = function () {
        // save previous volume for restoring
        restoreValue = player.getVolume();
        player.mute();
        volumeBar.slider({
            value: 0
        });
        controller.showMutedButton();
        return this;
    };
    this.unMute = function () {
        player.unMute();
        volumeBar.slider({
            value: restoreValue
        });
        controller.showVolumeButton();
        return this;
    };
    /*= elapsedTimeLabel
    -----------------------------------------------------------------*/
    var elapsedTime = [0, 0, 0];
    elapsedTimeLabel = container.find('#timeElapsed');
    this.elapsedHours = function () {
        return elapsedTime[2];
    };
    this.elapsedMinutes = function () {
        return elapsedTime[1];
    };
    this.elapsedSeconds = function () {
        return elapsedTime[0];
    };
    /*= durationTimeLabel
    -----------------------------------------------------------------*/
    var durationTime = [0, 0, 0];
    durationTimeLabel = container.find('#videoLength');
    this.durationHours = function () {
        return durationTime[2];
    };
    this.durationMinutes = function () {
        return durationTime[1];
    };
    this.durationSeconds = function () {
        return durationTime[0];
    };
    /*= seekBar
    -----------------------------------------------------------------*/
    var seekBarDragging = false, shouldResume = false;
    seekBar = container.find('#seekBar');
    seekSlider = seekBar.find('#seekSlider').slider({
        animate: false, // disable sliding animation
        disabled: true, // slider initially disabled
        max: 100,
        min: 0,
        orientation: 'horizontal',
        value: 0,
        range: 'min',
        start: function (e, ui) {
            console.log('User Action: seekBar start');
            // if playing, manually pause and resume to force sending
            // playStateChange to playing to trigger bullet timeframe reset
            if (playingStateCache === YT.PlayerState.PLAYING) {
                player.pauseVideo();
                shouldResume = true;
            }
            // stop updating slider
            seekBarDragging = true;
        },
        slide: function (e, ui) {
            console.log('User Action: seekBar slide');
            player.seekTo(ui.value, false);
        },
        change: function (e, ui) {
            if (e.originalEvent) {
                // changed by user
                console.log('User Action: seekBar change');
                var targetTimeFrame = ui.value;
                console.log('User Action: seek to ' + targetTimeFrame);
                player.seekTo(targetTimeFrame, true);
                if (shouldResume) {
                    player.playVideo();
                    shouldResume = false;
                }
            } else {
                // changed by program
            }
        },
        stop: function (e, ui) {
            console.log('User Action: seekBar stop');
            // continue updating slider
            seekBarDragging = false;
        }
    }).removeClass('ui-corner-all');
    buffProgress = seekBar.find('#buffProgress').progressbar({
        value: 0
    });
    this.expandSeekBar = function () {
        seekBar.addClass('expanded', 100);
        return this;
    };
    this.collapseSeekBar = function () {
        seekBar.removeClass('expanded', 100);
        return this;
    };
    this.draggingSeekBar = function () {
        return seekBarDragging;
    };
    /*= core apis
    -----------------------------------------------------------------*/
    this.initializeFromPlayer = function () {
        if (player) {
            this.enablePlayButton()
                .enableFullscreenButton()
                .enableVolumeButton();
            // use html5 localstorage to save user volume settings
            var volumeValue = localStorage.getItem('ushout_volume');
            if (volumeValue === null) {
                volumeValue = player.getVolume();
            } else {
                player.setVolume(volumeValue);
            }
            // volumeBar
            volumeBar.slider({
                disabled: false,
                value: volumeValue
            });
            // elapsedTime
            var seconds = Math.floor(player.getCurrentTime());
            elapsedTime[0] = seconds % 60;
            elapsedTime[1] = ((seconds - elapsedTime[0]) / 60) % 60;
            elapsedTime[2] = (seconds - elapsedTime[0] - elapsedTime[1] * 60) / 3600;
            var elapsedTimeText = ((controller.durationHours() > 0) ? (elapsedTime[2] + ':') : '') + pad(elapsedTime[1], 2) + ':' + pad(elapsedTime[0], 2);
            elapsedTimeLabel.text(elapsedTimeText);
            // durationTime
            var seconds = Math.floor(player.getDuration());
            durationTime[0] = seconds % 60;
            durationTime[1] = ((seconds - durationTime[0]) / 60) % 60;
            durationTime[2] = (seconds - durationTime[0] - durationTime[1] * 60) / 3600;
            var durationTimeText = ((durationTime[2] > 0) ? (durationTime[2] + ':') : '') + pad(durationTime[1], 2) + ':' + pad(durationTime[0], 2);
            durationTimeLabel.text(durationTimeText);
            // seekBar
            seekSlider.slider({
                disabled: false, // enable it
                max: player.getDuration(), // set max
                value: player.getCurrentTime() // set value
            });
        }
        return this;
    };
    this.updateFromPlayer = function () {
        if (player) {
            // elapsedTime
            var seconds = Math.floor(player.getCurrentTime());
            elapsedTime[0] = seconds % 60;
            elapsedTime[1] = ((seconds - elapsedTime[0]) / 60) % 60;
            elapsedTime[2] = (seconds - elapsedTime[0] - elapsedTime[1] * 60) / 3600;
            var elapsedTimeText = ((controller.durationHours() > 0) ? (elapsedTime[2] + ':') : '') + pad(elapsedTime[1], 2) + ':' + pad(elapsedTime[0], 2);
            elapsedTimeLabel.text(elapsedTimeText);
            // durationTime
            var seconds = Math.floor(player.getDuration());
            durationTime[0] = seconds % 60;
            durationTime[1] = ((seconds - durationTime[0]) / 60) % 60;
            durationTime[2] = (seconds - durationTime[0] - durationTime[1] * 60) / 3600;
            var durationTimeText = ((durationTime[2] > 0) ? (durationTime[2] + ':') : '') + pad(durationTime[1], 2) + ':' + pad(durationTime[0], 2);
            durationTimeLabel.text(durationTimeText);
            // seekBar
            if (!seekBarDragging) seekSlider.slider({
                // only update when user not dragging
                value: player.getCurrentTime(),
                max: player.getDuration()
            });
            var buffProgressValue = player.getVideoLoadedFraction() * 100;
            if (buffProgressValue !== buffProgress.progressbar('value')) buffProgress.progressbar('value', buffProgressValue);
        }
        return this;
    };
    /*= helper functions
    -----------------------------------------------------------------*/
    function _enableButton(target) {
        target.button('enable');
    }
    function _disableButton(target) {
        target.button('disable');
    }
    function _setButtonIcon(target, iconName) {
        target.button({
            icons: {
                primary: iconName
            }
        });
    }
};
/*= commentPanel
-----------------------------------------------------------------*/
var commentPanel = new function () {
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
    form.submit(function () {
        var commentText = inputField.val();
        commentPanel.clear();
        // trim white spaces
        commentText = commentText.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        // there has to be content
        if (commentText === '') return false;
        var videoTimeInMilliseconds = Math.floor(player.getCurrentTime() * 1000);
        var secretTimeStamp = (new Date()).getMilliseconds();
        // update form
        form.find('#postStamp').val(secretTimeStamp);
        form.find('#postTime').val(videoTimeInMilliseconds);
        form.find('#postContent').val(commentText);
        // disable panel with secret
        // can be only unlocked with the correct secret
        commentPanel.disable(secretTimeStamp);
        return true;
    });
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
        timeInMilliseconds = Math.floor(parseFloat(timeInMilliseconds));
        dateInMilliseconds = Math.floor(parseFloat(dateInMilliseconds));
        cid = parseInt(cid);
        // creates new bullet
        var newBullet = [];
        newBullet[0] = timeInMilliseconds;
        newBullet[1] = unescape(content);
        bulletsArray.push(newBullet);
        
        var timeInSeconds = Math.floor(timeInMilliseconds / 1000);
        var second = timeInSeconds % 60;
        var minute = ((timeInSeconds - second) / 60) % 60;
        var hour = (timeInSeconds - second - minute * 60) / 3600;
        var timeText = ((controller.durationHours() > 0) ? (hour + ':') : '') + pad(minute, 2) + ':' + pad(second, 2);
        
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
        var videoTimeInMilliseconds = Math.floor(player.getCurrentTime() * 1000);
        var magazine = [];
        for (var i = 0; i < bulletsArray.length; ++i) {
            var currentBullet = bulletsArray[i];
            var timeInMilliseconds = currentBullet[0],
                content = currentBullet[1];
            if (lastShot <= timeInMilliseconds && timeInMilliseconds < videoTimeInMilliseconds) {
                magazine.push(content);
            }
        }
        if (magazine.length > 0) {
            console.log('shooting from ' + lastShot + ' to ' + videoTimeInMilliseconds);
            while (magazine.length > 0) {
                commentDisplay.shoot(magazine.shift());
            }
        }
        lastShot = videoTimeInMilliseconds;
    };
    this.setFrame = function (seconds) {
        var newFrame = Math.floor(seconds * 1000);
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
        controller.updateFromPlayer();
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
    controller.initializeFromPlayer();
    commentPanel.enable();
    queryIframe.initialize();
    // initialize cache
    playingStateCache = player.getPlayerState();
    console.log('Initial State: ' + playingStateCache);
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
        switch (newState) {
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
        // bullets control
        switch (newState) {
            case -1: // unstarted
            case YT.PlayerState.CUED:
            case YT.PlayerState.ENDED:
            case YT.PlayerState.PAUSED:
            case YT.PlayerState.BUFFERING:
                haltBulletsUpdating();
                break;
            case YT.PlayerState.PLAYING:
                commentsTable.setFrame(player.getCurrentTime());
                beginBulletsUpdating();
                break;
        }
        // update cache
        playingStateCache = newState;
    }
}
/*= player state change responding handler
------------------------------------------------------------------------------------------------------------------------*/
function playerUnStarted() {
    console.log('State Change: unstarted (-1)');
    controller.showPlayButton();
}
function playerOnEnd() {
    console.log('State Change: ended (0)');
    controller.showPlayButton();
}
function playerOnPlay() {
    console.log('State Change: playing (1)');
    controller.showPauseButton();
}
function playerOnPause() {
    console.log('State Change: paused (2)');
    controller.showPlayButton();
}
function playerOnBuffer() {
    console.log('State Change: buffering (3)');
    controller.showPlayButton();
}
function playerOnCue() {
    console.log('State Change: cued (5)');
    controller.showPlayButton();
}

function updateBullets() {
    if (player && player.getPlayerState() === YT.PlayerState.PLAYING && !controller.draggingSeekBar()) {
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