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
		localSettings: {
			rtcActivated: false,
			volume: 100,
			muted: false,
			restoreVolume: -1
		},
		data: {
			playState: -1,
			adState: -1,
			playTimeUpdater: 0
		},
		controller : {
			stateChangeJumpTable: {}
		}, // controller
		templates: {
			$DIV    : $('<div>').addClass(_u('simplebox')),
			$BUTTON : $('<button>').click(function () {
				log('button "' + $(this).attr('id') + '" clicked');
			}),
			$INPUT  : $('<button>'),
			$LABEL  : $('<label>').addClass(_u('simplebox'))
		}
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