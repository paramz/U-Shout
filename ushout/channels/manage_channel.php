<?php
require ('channel_model.php');

require ('../videos/video_model.php');

$search_text = "filter channel videos...";
$videos = VideoModel::find_all();

include('manage_channel.php.view');

?>
