<?php
	$search_text="Type here to search"
?>
<?php include '../template-header.php';?>
	<?php

	if ($_SERVER['REQUEST_METHOD'] == 'GET')
	{
		  include('search.php.view');
	}

	?>
<?php include '../template-footer.php';?>
