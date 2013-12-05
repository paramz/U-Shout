<?php
require ('channel_model.php');

require ('../videos/video_model.php');

$search_text = "filter channel videos...";
$videos = VideoModel::find_all();

$index = $_GET["channel_id"];

$channels = ChannelModel::find_all();
$channel = $channels[$index];

include('manage_channel.php.view');

?>
