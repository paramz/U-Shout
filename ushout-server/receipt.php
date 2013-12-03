<?php
include_once('core.php');
// parse data and save the posted comment
echo '<h1>Post receipt</h1>';
$videoID = urlencode(dieOrFetchFromPOST('v'));
$lockSecret = intval(dieOrFetchFromPOST('secret'));
$postContent = trim(dieOrFetchFromPOST('content'));
$timeFrame = urlencode(dieOrFetchFromPOST('time'));
$postDate = bcmul(microtime(true), 1000);

appendComment($videoID, $timeFrame, $postContent, $postDate);

// display some debug data
?>
<div>comment for video ID: <?=htmlentities($videoID)?><div>
<div>comment content: <?=htmlentities($postContent)?><div>
<div>at video timeframe: <?=htmlentities($timeFrame)?><div>
<div>post date (in milliseconds): <?=htmlentities($postDate)?><div>
<script>
// shoot this comment
window.top.commentDisplay.shoot(<?=json_encode($postContent)?>, 'user');
// this script releases the input lock
window.top.commentPanel.enable(<?=json_encode($lockSecret)?>);
</script>