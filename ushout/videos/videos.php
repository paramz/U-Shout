<?php

require ('video_model.php');

if ($_SERVER['REQUEST_METHOD'] == 'GET')
{
      if (!isset($_GET["search"]))
          $search_text = "videos ...";
      else
          $search_text = $_GET["search"];
      
      $videos = VideoModel::find_all();
                            
      include('video_list.php.view');
}

?>