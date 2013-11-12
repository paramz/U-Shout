function ushout($body) {
	var youtube = {};
	youtube.$pageContainer = $body.find("#page-container");
	if (youtube.$pageContainer.length !== 1)
		return;
	youtube.$page = youtube.$pageContainer.find("#page");
	if (youtube.$page.length !== 1)
		return;
	youtube.$guide = youtube.$page.find("#guide");
	if (youtube.$guide.length !== 1)
		return;
	youtube.$player = youtube.$page.find("#player");
	if (youtube.$player.length !== 1)
		return;
	youtube.$content = youtube.$page.find("#content");
	if (youtube.$content.length !== 1)
		return;
	youtube.$playlist = youtube.$player.find("#playlist");
	if (youtube.$playlist.length !== 1)
		return;
	youtube.$playerapi = youtube.$player.find("#player-api");
	if (youtube.$playerapi.length !== 1)
		return;
	youtube.$playertray = youtube.$player.find("#playlist-tray");
	if (youtube.$playertray.length !== 1)
		return;
	
	// apply ushout css
	$body.addClass("ushout");
	
	// this function adds the prefix 'ushout_' to the given string to avoid conflicts
	function _u(str) {
		return 'ushout_' + String(str);
	}
	// clone reference for creating new objects
	var $DIV = $('<div>'),
		$BUT = $('<button>');
	
	var $overlay = $DIV.clone().attr('id', _u('overlay')).appendTo(youtube.$playerapi);
	
	var $touchArea = $DIV.clone().attr('id', _u('toucharea')).appendTo($overlay);
	
	var $controlBar = $DIV.clone().attr('id', _u('controlbar')).appendTo($overlay);
	
	// this function is a macro to handle the creation of a button
	function createButton(iconUrl, width, height) {
		
	}
	
	
	
	var controlImages = {
		play_pause: chrome.extension.getURL('/images/play_pause.png'),
		volume: chrome.extension.getURL('/images/volume.png')
	};
	
	var controls = {};
	
	controls.$play_pause = $BUT.clone()
		.attr('id', _u('play_pause'))
		.css({
			backgroundImage: 'url(' + controlImages.play_pause + ')'
		});
	
	controls.$volumeFrame = $DIV.clone()
		.attr('id', _u('volumeframe'));
	
	controls.$volumeButton = $BUT.clone()
		.attr('id', _u('volumebutton'))
		.css({
			backgroundImage: 'url(' + controlImages.volume + ')'
		});
	
	controls.$volumeSliderWrapper = $DIV.clone()
		.attr('id', _u('volumeslider_wrapper'));
	
	controls.$volumeSlider = $DIV.clone()
		.attr('id', _u('volumeslider'));
	
	controls.$playtime = $DIV.clone()
		.attr('id', _u('playtime'));
	
	controls.$commentInputFrame = $DIV.clone()
		.attr('id', _u('commentinputframe'));
	
	controls.$fullwindow = $BUT.clone()
		.attr('id', _u('fullwindow'))
		.css({
			backgroundImage: 'url(' + controlImages.fullwindow + ')'
		});
	
	controls.$fullscreen = $BUT.clone()
		.attr('id', _u('fullscreen'))
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
		controls.$commentInputFrame
	);
}