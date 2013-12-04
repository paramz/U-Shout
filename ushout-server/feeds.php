<?php
include_once('core.php');
// fetch video id. if not found, die
$videoID = urlencode(dieOrFetchFromGET('v'));
$timeStamp = bcmul(microtime(true), 1000);
$lastcheck = array_key_exists('lastcheck', $_GET) ? bcadd($_GET['lastcheck'], '0') : -1;
$commentArray = fetchComments($videoID, $lastcheck);

$result = array(
	'list'      => $commentArray,
	'lastcheck' => $timeStamp
);

echo json_encode($result);
?>