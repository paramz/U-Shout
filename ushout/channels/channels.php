<?php

require ('channel_model.php');

if ($_SERVER['REQUEST_METHOD'] == 'GET')
{
      if (!isset($_GET["search"]))
          $search_text = "filter channels ...";
      else
          $search_text = $_GET["search"];
      
      $channels = ChannelModel::find_all();
                            
      include('channels_list.php.view');
}

?>
