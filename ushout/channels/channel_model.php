<?php

class ChannelModel
{
    var $values = array();
    
    var $name;
    var $description;
    var $subscriber_count;
    var $video_count;
    var $id;    
    
    function ChannelModel($values)
    {
        $this->values = $values;
        $this->name = $values['name'];
        $this->description = $values['description'];
        $this->subscriber_count = $values['subscriber_count'];
        $this->video_count = $values['video_count'];
        $this->id = $values['id'];
    }
    
    public function find_all()
    {
        $channels[] = new ChannelModel(array(
          'name' => 'Dave Matthews Band', 
          'description' => 'Dave Matthews Band1',
          'subscriber_count' => 6131,
          'video_count' => 67,
          'id' => 1
        ));

        $channels[] = new ChannelModel(array(
          'name' => 'Gav\'s CC', 
          'description' => 'Highlights from Gavin\'s CC Meets',
          'subscriber_count' => 19,
          'video_count' => 2317,
          'id' => 2
        ));
      
        $channels[] = new ChannelModel(array(
          'name' => 'Lol Catz', 
          'description' => 'Funny Cat Videos',
          'subscriber_count' => 381,
          'video_count' => 5243,
          'id' => 2
        ));
      
        return $channels;    
    }
}

?>
