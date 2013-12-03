<?php
if (!$viewSession) die;
$itemsPerPage = 10;
$currentPage = intval($_GET['p']);
$startIndex = $currentPage * $itemsPerPage + 1;

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://gdata.youtube.com/feeds/api/standardfeeds/most_popular?max-results={$itemsPerPage}&start-index={$startIndex}&v=2");
//curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
$xmlDoc = simplexml_load_string(curl_exec($ch));
curl_close($ch);

$xmlNameSpaces = $xmlDoc->getNameSpaces(true);
//Use that namespace
$openSearch = $xmlDoc->children($xmlNameSpaces['openSearch']);
$totalCounts = intval($openSearch->totalResults);
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
		<title>You Shout</title>
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
				<h1><?=$xmlDoc->title?> from <a href="<?=$xmlDoc->author->uri?>"><?=$xmlDoc->author->name?></a></h1>
				<div>Total results: <?=$totalCounts?></div>
				<ul>
<?php
foreach ($xmlDoc->entry as $entry) {
$yt = $entry->children($xmlNameSpaces['yt']);
$media = $entry->children($xmlNameSpaces['media']);
$group = $media->group;
$group_media = $group->children($xmlNameSpaces['media']);
$group_yt = $group->children($xmlNameSpaces['yt']);
$title = $group_media->title;
$description = $group_media->description;
$videoID = $group_yt->videoid;
?>
					<li>
						<h2><a href="?v=<?=$videoID?>"><?=$title?></a></h2>
						<pre><?=$description?></pre>
					</li>
<?php
}
?>
				</ul>
			</div>
			<div id="footer"></div>
		</div>

		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
		<script>window.jQuery || document.write('<script src="/utilities/vendor/jquery-1.8.3.min.js"><\/script>')</script>
		<script src="/themes/experimental_1/template.js"></script>
		<script src="/utilities/vendor/jquery-ui-1.9.2.custom.min.js"></script>
		<script src="js/plugins.js"></script>
		<script src="js/main.js"></script>

		<!-- Google Analytics: change UA-34856732-1π to be your site's ID. -->
		<script>
			var _gaq=[['_setAccount','UA-34856732-1'],['_trackPageview']];
			(function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
			g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
			s.parentNode.insertBefore(g,s)}(document,'script'));
		</script>
	</body>
</html>