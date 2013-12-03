<?php
if (!$viewSession) die;
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://gdata.youtube.com/feeds/api/videos/{$videoID}?v=2");
//curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
$xmlDoc = simplexml_load_string(curl_exec($ch));
curl_close($ch);

$xmlNameSpaces = $xmlDoc->getNameSpaces(true);

$title = $xmlDoc->title;
$authorName = $xmlDoc->author->name;
$authorUri = $xmlDoc->author->uri;
$authorID = $xmlDoc->author->children($xmlNameSpaces['yt'])->userId;
$media = $xmlDoc->children($xmlNameSpaces['media']);
$group = $media->group;
$group_media = $group->children($xmlNameSpaces['media']);
$description = htmlspecialchars($group_media->description);
?>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie10 lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie10 lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie10 lt-ie9"> <![endif]-->
<!--[if IE 9]>         <html class="no-js lt-ie10"> <![endif]-->
<!--[if gt IE 9]><!--> <html class="no-js"> <!--<![endif]-->
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<title><?=$title?> - You Shout</title>
		<meta name="description" content="">
		<meta name="keywords" content="">
		<meta name="viewport" content="width=device-width">
		<meta name="viewport" content="width=990">
		<meta name="author" content="Xingchen Hong">

		<!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
		<link rel="icon" type="image/ico" href="./favicon.ico" />

		<link rel="stylesheet" href="http://library.icradle.net/css/file/normalize">
		<link rel="stylesheet" href="http://library.icradle.net/css/file/clearfix">
		<link rel="stylesheet" href="/themes/experimental_1/single.css">
		<link rel="stylesheet" href="css/main.css">
		<script src="/utilities/vendor/modernizr-2.6.1.min.js"></script>
	</head>
	<body>
		<!--[if lt IE 7]>
			<p class="chromeframe">You are using an outdated browser. <a href="http://browsehappy.com/">Upgrade your browser today</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to better experience this site.</p>
		<![endif]-->
		<div id="wrapper">
			<div id="header"></div>
			<!-- content wrapper -->
			<div id="content" class="clearfix">
			    <h4><a href="./view"><< back to the list</a></h4>
				<h1><a title="Watch on Youtube" href="//youtube.com/watch?v=<?=$videoID?>" target="_blank"><?=$title?></a> by <?=$authorName?></h1>
				<div id="uCommentWrapper" class="clearfix">
					<div id="playerBox">
						<div id="playerWrapper">
							<div class="video">
								<div id="player" class="fullSize"></div>
								<div id="commentField" class="fullSize"></div>
							</div>
							<div id="videoController">
								<button id="playButton" class="leftAlign"></button>
								<span class="narrowSpace leftAlign"></span>
								
								<div id="volumeControlsWrapper" class="leftAlign">
									<button id="volumeButton" class="leftAlign"></button>
									<div id="volumeSlider" class="leftAlign"></div>
								</div>
								
								<span class="narrowSpace leftAlign"></span>
								
								<label id="time" class="leftAlign interactable"><span id="timeElapsed">00:00:00</span> / <span id="videoLength">00:00:00</span></label>
								
								<button id="fullscreenButton" class="rightAlign"></button>
								<div id="seekBar"><div id="seekSlider"></div><div id="buffProgress"></div></div>
							</div>
							<form id="postPanel" method="post" action="receipt.php" target="postTarget">
								<input name="v" type="hidden" value="<?=$videoID?>" />
								<input id="postTime" name="time" type="hidden" />
								<input id="postContent" name="content" type="hidden" />
								<input id="postStamp" name="secret" type="hidden" />
								<input id="commentField" name="rawcontent" type="text" />
								<button id="postButton" class="rightAlign" type="submit"></button>
							</form>
						</div>
					</div>
					<div class="infoPanel">
						<div id="comments">
							<div class="head">
								<table id="headerTable">
									<thead>
										<tr>
											<td class="timestamp">TIME</td>
											<td class="content">COMMENT</td>
											<td class="postdate">POSTDATE</td>
										</tr>
									</thead>
								</table>
							</div>
							<div class="body">
								<table id="commentsTable"><tbody></tbody></table>
							</div>
						</div>
					</div>
				</div>
				<div id="iframeWrapper" class="hidden clearfix">
					<iframe id="postIframe" src="about:blank" name="postTarget"></iframe>
					<iframe id="queryIframe" src="about:blank" name="queryFrame"></iframe>
				</div>
				<pre class="videoDescription"><?=$description?></pre>
			</div>
			<div id="footer"></div>
		</div>

		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
		<script>window.jQuery || document.write('<script src="/utilities/vendor/jquery-1.8.3.min.js"><\/script>')</script>
		<script src="/themes/experimental_1/template.js"></script>
		<script src="/utilities/vendor/jquery-ui-1.9.2.custom.min.js"></script>
		<script src="js/plugins.js"></script>
		<script>var youtubeVideoID = '<?=$videoID?>';</script>
		<script src="js/view.js"></script>
		<script src="//www.youtube.com/iframe_api"></script>

		<!-- Google Analytics: change UA-34856732-1π to be your site's ID. -->
		<script>
			var _gaq=[['_setAccount','UA-34856732-1'],['_trackPageview']];
			(function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
			g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
			s.parentNode.insertBefore(g,s)}(document,'script'));
		</script>
	</body>
</html>