<?php
include_once('core.php');
// parse data and save the posted comment
$videoID = urlencode(dieOrFetchFromPOST('v'));
$lockSecret = intval(dieOrFetchFromPOST('secret'));
$postContent = trim(dieOrFetchFromPOST('content'));
$timeFrame = urlencode(dieOrFetchFromPOST('time'));
$postDate = bcmul(microtime(true), 1000);

$commentID = appendComment($videoID, $timeFrame, $postContent, $postDate);

$result = array(
	'cid'      => $commentID,
	'secret' => $lockSecret
);

echo json_encode($result);
?>