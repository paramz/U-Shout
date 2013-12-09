function ushout($body, log, warn, _u) {
	// url check
	var href = window.location.pathname.toLowerCase();
	// the player page should have pathname '/watch'
	if (href !== '/watch') {
		// hault if not the right page
		log('not watch page');
		return;
	}
	
	window.parseQueryString = function (queryString) {
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
	};
	window.buildQueryString = function (queryObject) {
		var queryStrings = [];
		for (var key in queryObject) {
			queryStrings.push(key + '=' + queryObject[key]);
		}
		return queryStrings.join('&');
	};
	
	// data object for the video
	var video = {
		id: '',
		ctime: 0,
		mtime: 0,
		player: null,
		updateID: function () {
			var queryString = window.location.search;
			// get rid of the leading ?
			var queryParse = queryString.split('?');
			queryString = (queryParse.length === 1) ? queryParse[0] : queryParse[1];
			var queries = parseQueryString(queryString);
			log('videoID: ' + queries.v);
			video.id = queries.v;
		}
	};
	
	var youtube = {};
	// locate body-container
	youtube.$bodyContainer = $body.find("#body-container");
	if (youtube.$bodyContainer.length !== 1) {
		warn('#body-container not found');
		return;
	}
	// locate page-container
	youtube.$pageContainer = youtube.$bodyContainer.find("#page-container");
	if (youtube.$pageContainer.length !== 1) {
		warn('#page-container not found');
		return;
	}
	// locate page
	youtube.$page = youtube.$pageContainer.find("#page");
	if (youtube.$page.length !== 1) {
		warn('#page not found');
		return;
	}
	// locate player
	youtube.$player = youtube.$page.find("#player");
	if (youtube.$player.length !== 1) {
		warn('fail because can not find player wrapper on this page.');
		return;
	}
	// locate playerapi
	youtube.$playerapi = youtube.$player.find("#player-api");
	if (youtube.$playerapi.length !== 1) {
		warn('fail because can not find player on this page.');
		return;
	}
	// locate movieplayer
	youtube.$movieplayer = youtube.$playerapi.find("#movie_player");
	if (youtube.$movieplayer.length !== 1) {
		warn('fail because can not find movie player on this page.');
		return;
	}
	// locate playlist
	youtube.$playlist = youtube.$player.find("#playlist");
	if (youtube.$playlist.length !== 1) {
	//	warn('fail because can not find playlist wrapper on this page.');
		return;
	}
	// locate playlisttray
	youtube.$playlisttray = youtube.$player.find("#playlist-tray");
	if (youtube.$playlisttray.length !== 1) {
	//	warn('fail because can not find playlist tray on this page.');
		return;
	}
	// locate guide
	youtube.$guide = youtube.$page.find("#guide");
	if (youtube.$guide.length !== 1) {
	//	warn('fail because can not find guide wrapper on this page.');
		return;
	}
	// locate content
	youtube.$content = youtube.$page.find("#content");
	if (youtube.$content.length !== 1) {
	//	warn('fail because can not find content wrapper on this page.');
		return;
	}
	log('page structure checked');
	
	// data object for ushout
	var ushout = {
		server: {
			/**
			 * this function gets a list of comments of the current video since the
			 * given timeStamp
			 * if a timeStamp is not specified, get the whole list
			 * since this function works asynchronized, it should have a callback
			 * function passed in
			 **/
			pullComments: function (timeStamp, callback) {
				// send json request to server
				var url = 'http://uiuc.icradle.net/cs465/feeds.php?v=' + video.id + '&lastcheck=' + timeStamp;
				$.getJSON( url, function( data ) {
					ushout.data.lastPull = data.lastcheck;
					callback(data.list, data.lastcheck);
				});
			},
			pushTextComment: function (comment, callback) {
				var url = 'http://uiuc.icradle.net/cs465/receipt.php';
				var secretTimeStamp = (new Date()).getMilliseconds();
				ushout.data.commentLockSecret = secretTimeStamp;

				var videoTimeInMilliseconds = Math.floor(video.player.getCurrentTime() * 1000);
				comment.tiv = videoTimeInMilliseconds;
				var commentJSON = JSON.stringify(comment);
				var POSTData = {
					'v': video.id,
					'secret': secretTimeStamp,
					'content': commentJSON
				};
				warn('sending...');
				console.warn(POSTData);
				$.post(url, POSTData, function (data, textStatus, jqXHR) {
					warn('receiving...');
					console.warn(data);
					if (ushout.data.commentLockSecret === data.secret) {
						callback(data.comment);
					} else {
						warn('secret mis-match: ' + ushout.data.commentLockSecret + ' - ' + data.secret);
					}
				}, 'json');
				// add code here to send request to server
			}
		}, // ushout.server
		localSettings: {
			rtcActivated: false,
			volume: 100,
			muted: false,
			restoreVolume: -1
		}, // ushout.localSettings
		constants: {
			ptype: {
				right2left: 0,
				left2right: 1,
				top: 2,
				bottom: 3,
				poi: 4
			},
			dtype: {
				text: 0,
				audio: 1,
				video: 2,
				macro: 3
			},
			POI_fadeRate: 0.3,
			POI_minRadius: 15,
			POI_maxRadius: 100
		}, // ushout.constants
		data: {
			playState: -1,
			adState: -1,
			updater: -1,
			commentLockSecret: 0,
			poi: {
				x: 0,
				y: 0
			},
			comments: [],
			commentReloadTime: 1000,
			commentReloader: -1,
			pullingComments: false,
			lastPull: -1,
			bulletReloadTime: 100,
			lastShot: -1,
			bullets: [
				{ // ptype: 0
					list: [],
					$last: null
				},
				{ // ptype: 1
					list: [],
					$last: null
				},
				{ // ptype: 2
					list: [],
					$last: null
				},
				{ // ptype: 3
					list: [],
					$last: null
				},
				{ // ptype: 4
					list: [],
					$last: null
				}
			],
			bulletSeparation: { // gap in pixels
				x: 10,
				y: 3
			},
			bulletSpeed: 100
		}, // ushout.data
		controller : {
			stateChangeJumpTable: {}
		}, // ushout.controller
		templates: {
			$DIV    : $('<div>').addClass(_u('simplebox')),
			$UL     : $('<ul>').addClass(_u('simplebox')),
			$LI     : $('<li>').addClass(_u('simplebox')),
			$FORM   : $('<form>').addClass(_u('simplebox')),
			$BUTTON : $('<button>')
				.attr({
					'disabled': true,
					'type': 'button'
				})
				.click(function () {
					log('button "' + $(this).attr('id') + '" clicked');
				}),
			$INPUT  : $('<input>')
				.attr({
					'disabled': true
				}),
			$LABEL  : $('<label>').addClass(_u('simplebox')),
			$A      : $('<a>').addClass(_u('simplebox'))
		} // ushout.templates
	} // ushout
	
	if (youtube.$movieplayer.prop("tagName").toLowerCase() === 'embed') {
		log('flash player detected.');
		embed_player($body, youtube, video, ushout, log, warn, _u);
	} else if (youtube.$movieplayer.hasClass('html5-video-player')) {
		warn('html5 player not yet supported.');
		return;
	} else {
		warn('unknown player.');
		return;
	}
}