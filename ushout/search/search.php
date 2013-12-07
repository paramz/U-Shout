<?php
	require ('../videos/video_model.php');

	$search_text="type here to search...";


	if ($_SERVER['REQUEST_METHOD'] == 'GET')
	{
		
		if (!isset($_GET["search"]))
		{
			// $search_text = "Cat";
			include('search.php.view');			
		}
		else
		{
			$search_text = $_GET["search"];			
			// $videos = VideoModel::search( $search_text );
			$videos = VideoModel::find_all();
							    
			include('video_result_list.php.view');
		}
		  
	}

?>
