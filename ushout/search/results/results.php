<?php
	$search_text="type here to search..."
?>
	<?php

	if ($_SERVER['REQUEST_METHOD'] == 'GET')
	{
		  include('results.php.view');
	}

	?>
<?php include '../../template-footer.php';?>
