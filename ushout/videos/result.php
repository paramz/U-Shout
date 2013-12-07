<?php

require ('video_model.php');

if ($_SERVER['REQUEST_METHOD'] == 'GET')
{
      if (!isset($_GET["search"]))
          $search_text = "Cat";
      else
          $search_text = $_GET["search"];
      
      $videos = VideoModel::search( $search_text );
                            
      include('video_result_list.php.view');
}

?>
