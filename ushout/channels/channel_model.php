<?php

class ChannelModel
{
    var $values = array();
    
    var $name;
    var $description;
    var $subscriber_count;
    var $video_count;
    var $id;
    var $access;
    
    function ChannelModel($values)
    {
        $this->values = $values;
        $this->name = $values['name'];
        $this->description = $values['description'];
        $this->subscriber_count = $values['subscriber_count'];
        $this->video_count = $values['video_count'];
        $this->id = $values['id'];
        $this->access = $values['access'];
    }
    
    public function find_all()
    {
        $channels[] = new ChannelModel(array(
          'name' => 'Dave Matthews Band', 
          'description' => 'Dave Matthews Band1 this is a really long description stupid stupid stupid',
          'subscriber_count' => 6131,
          'video_count' => 67,
          'id' => 0,
          'access' => 'public'
        ));

        $channels[] = new ChannelModel(array(
          'name' => 'Gav\'s CC', 
          'description' => 'Highlights from Gavin\'s CC Meets',
          'subscriber_count' => 19,
          'video_count' => 2317,
          'id' => 1,
          'access' => 'private'
        ));
      
        $channels[] = new ChannelModel(array(
          'name' => 'Lol Catz', 
          'description' => 'Funny Cat Videos',
          'subscriber_count' => 381,
          'video_count' => 5243,
          'id' => 2,
          'access' => 'invite'
        ));

        $channels[] = new ChannelModel(array(
          'name' => 'ESPN', 
          'description' => 'Sports Center',
          'subscriber_count' => 381,
          'video_count' => 5243,
          'id' => 3,
          'access' => 'public'
        ));
      
        $channels[] = new ChannelModel(array(
          'name' => 'Super Long Channel Name to See How Overflow behaves', 
          'description' => 'No one likes this channel',
          'subscriber_count' => 2,
          'video_count' => 9,
          'id' => 4,
          'access' => 'public'
        ));
              
        return $channels;    
    }
}

?>
