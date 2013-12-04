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
				$commentItem['id'] = bcadd($commentObj['id'], '0');
				$commentItem['uid'] = bcadd($commentObj['uid'], '0');
				$commentItem['pid'] = bcadd($commentObj['pid'], '0');
				$commentItem['tiv'] = bcadd($commentObj['tiv'], '0');
				$commentItem['dop'] = bcadd($commentObj['dop'], '0');
				$commentItem['ptype'] = intval($commentObj['ptype']);
				$commentItem['poi'] = json_decode($commentObj['poi']);
				$commentItem['dtype'] = intval($commentObj['dtype']);
				$commentItem['repu'] = bcadd($commentObj['repu'], '0');
				$commentItem['data'] = (string)$commentObj;
				if (bccomp($bcMath_timeStamp, $commentItem['dop']) === -1)
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
	$uniqueID = intval($xmlDoc['cid_uid']);
	$uniqueID++;
	
	$commentElement = $xmlDoc->addChild('comment', $postContent);
	$commentElement->addAttribute('id', $uniqueID);
	$commentElement->addAttribute('uid', 0); // set to guest
	$commentElement->addAttribute('pid', 0); // set to none
	$commentElement->addAttribute('tiv', $timeFrame);
	$commentElement->addAttribute('dop', $postDate);
	$commentElement->addAttribute('ptype', 0);
	/**
	 * ptype: 0 - normal, right-to-left floating comment
	 * ptype: 1 - normal, left-to-right floating comment
	 * ptype: 2 - normal, top fixed comment
	 * ptype: 3 - normal, bottom fixed comment
	 * ptype: 4 - POI (point of interest) comment
	 **/
	$commentElement->addAttribute('poi', json_encode(array(
		'x' => 0,
		'y' => 0
	))); // position
	$commentElement->addAttribute('dtype', 0);
	/**
	 * dtype: 0 - text
	 * dtype: 1 - audio
	 * dtype: 2 - video
	 * dtype: 3 - macro
	 **/
	$commentElement->addAttribute('repu', 0);
	
	$xmlDoc['cid_uid'] = $uniqueID;
	$xmlDoc->asXML($xmlFilename);
	if ($o_dir !== getcwd()) chdir($o_dir);
	
	return $uniqueID;
}
function createCommentFileForVideoID($videoID) {
	$o_dir = getcwd();
	chdir(getVar('commentDirectory'));
	$xmlFilename = "{$videoID}.xml";
	$xmlStr = <<<XML
<?xml version="1.0" encoding="UTF-8"?>
<video id="{$videoID}" cid_uid="0">
</video>
XML;
	$xmlDoc = new SimpleXMLElement($xmlStr);
	$xmlDoc->asXML($xmlFilename);
	if ($o_dir !== getcwd()) chdir($o_dir);
}
?>