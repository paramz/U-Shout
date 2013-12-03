<?php
/*= initialization
----------------------------------------------------*/
bcscale(0);
/*= check comment directory
----------------------------------------------------*/
// force redirect to this directory
chdir(dirname(__FILE__));
setVar('cwd', getcwd());
$commentFolderName = 'comments';
if (!file_exists($commentFolderName) || !is_dir($commentFolderName)) {
	die('comment folder not found in root. please create it manually.');
} else if (!is_readable($commentFolderName)) {
	die('comment folder not readable. please permit reading access.');
} else if (!is_writable($commentFolderName)) {
	die('comment folder not writable. please permit writing access.');
}
chdir($commentFolderName);
setVar('commentDirectory', getcwd());

/*= helper functions
----------------------------------------------------*/
function getVar($key) {
	$key = "ushout_{$key}";
	if (array_key_exists($key, $GLOBALS))
		return $GLOBALS[$key];
	else
		return '';
}
function setVar($key, $value) {
	$key = "ushout_{$key}";
	$GLOBALS[$key] = $value;
}
function dieOrFetchFromGET($key) {
	if (array_key_exists($key, $_GET))
		return $_GET[$key];
	else
		die;
}
function dieOrFetchFromPOST($key) {
	if (array_key_exists($key, $_POST))
		return $_POST[$key];
	else
		die;
}
function fetchComments($videoID, $bcMath_timeStamp) {
	$o_dir = getcwd();
	chdir(getVar('commentDirectory'));
	$retn = array();
	$xmlFilename = "{$videoID}.xml";
	if (!file_exists($xmlFilename) || !is_file($xmlFilename)) {
		// create new xml file for this video
		createCommentFileForVideoID($videoID);
	} else {
		// load xml file
		$xmlDoc = simplexml_load_file($xmlFilename);
		if (!$xmlDoc) {
			// xml file corrupted
			createCommentFileForVideoID($videoID);
		} else {
			foreach ($xmlDoc->children() as $commentObj) {
				$commentItem = array();
				$commentItem['time'] = bcadd($commentObj['time'], '0');
				$commentItem['date'] = bcadd($commentObj['date'], '0');
				$commentItem['content'] = (string)$commentObj;
				if (bccomp($bcMath_timeStamp, $commentItem['date']) === -1)
					$retn[] = $commentItem;
			}
		}
	}
	
	if ($o_dir !== getcwd()) chdir($o_dir);
	return $retn;
}
function appendComment($videoID, $timeFrame, $postContent, $postDate) {
	$o_dir = getcwd();
	chdir(getVar('commentDirectory'));
	$xmlFilename = "{$videoID}.xml";
	if (!file_exists($xmlFilename) || !is_file($xmlFilename)) {
		// create new xml file for this video
		createCommentFileForVideoID($videoID);
	}
	// load xml file
	$xmlDoc = simplexml_load_file($xmlFilename);
	if (!$xmlDoc) {
		// xml file corrupted
		createCommentFileForVideoID($videoID);
		$xmlDoc = simplexml_load_file($xmlFilename);
	}
	$commentElement = $xmlDoc->addChild('comment', $postContent);
	$commentElement->addAttribute('time', $timeFrame);
	$commentElement->addAttribute('date', $postDate);
	$xmlDoc->asXML($xmlFilename);
	if ($o_dir !== getcwd()) chdir($o_dir);
}
function createCommentFileForVideoID($videoID) {
	$o_dir = getcwd();
	chdir(getVar('commentDirectory'));
	$xmlFilename = "{$videoID}.xml";
	$xmlStr = <<<XML
<?xml version="1.0" encoding="UTF-8"?>
<video id="{$videoID}">
</video>
XML;
	$xmlDoc = new SimpleXMLElement($xmlStr);
	$xmlDoc->asXML($xmlFilename);
	if ($o_dir !== getcwd()) chdir($o_dir);
}
?>