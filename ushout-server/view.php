<?php
$viewSession = time();
if (!array_key_exists('v', $_GET)) {
	include('template_view_notarget.php');
} else {
	$videoID = urlencode($_GET['v']);
	include('template_view.php');
}
?>