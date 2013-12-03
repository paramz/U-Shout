<?php
include_once('core.php');
// fetch video id. if not found, die
$videoID = urlencode(dieOrFetchFromGET('v'));
$timeStamp = bcmul(microtime(true), 1000);
echo "<div>loading comments for video ID: {$videoID}</div>";
echo "<div>last loaded time stamp: {$timeStamp}</div>";
$lastcheck = array_key_exists('lastcheck', $_GET) ? bcadd($_GET['lastcheck'], '0') : -1;
$commentArray = fetchComments($videoID, $lastcheck);
?>
<script>
<?php
for ($i = 0; $i < count($commentArray); ++$i) {
    $commentItem = $commentArray[$i];
    $timeInMilliseconds = json_encode($commentItem['time']);
    $content = json_encode($commentItem['content']);
    $dateInMilliseconds = json_encode($commentItem['date']);
    echo "window.top.commentsTable.addComment({$timeInMilliseconds}, {$content}, {$dateInMilliseconds}, -1);\n";
}
?>
function refresh() {
    //window.location.href = '?v=<?=$videoID?>&lastcheck=<?=$timeStamp?>';
    // use this approach to hide update from history
    window.location.replace('?v=<?=$videoID?>&lastcheck=<?=$timeStamp?>');
}
// load new feeds every one second
window.setTimeout(refresh, 1000);
</script>