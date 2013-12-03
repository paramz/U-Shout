<?php

class VideoModel
{
    var $values = array();
    
    var $name;
    var $description;
    var $views;
    var $likes;
    var $dislikes;
	var $id;
    
    function VideoModel($values)
    {
        $this->values = $values;
        $this->name = $values['name'];
        $this->description = $values['description'];
        $this->views = $values['views'];
        $this->likes = $values['likes'];
		$this->dislikes = $values['dislikes'];
        $this->id = $values['id'];
    }
    
    public function find_all()
    {
        $videos[] = new VideoModel(array(
          'name' => 'Dave Matthews Band', 
          'description' => 'Dave Matthews Band1 this is a really long description stupid stupid stupid',
          'views' => 6131,
          'likes' => 67,
		  'dislikes' => 5,
          'id' => 1
        ));

        $videos[] = new VideoModel(array(
          'name' => 'Gav\'s CC', 
          'description' => 'Highlights from Gavin\'s CC Meet',
          'views' => 19234,
          'likes' => 2317,
		  'dislikes' =>503,
          'id' => 2
        ));
      
        $videos[] = new VideoModel(array(
          'name' => 'Lol Catz', 
          'description' => 'Funny Cat Video',
          'views' => 381,
          'likes' => 5243,
		  'dislikes' =>430,
          'id' => 3
        ));

        $videos[] = new VideoModel(array(
          'name' => 'ESPN', 
          'description' => 'nobody likes soccer',
          'views' => 38321,
          'likes' => 5243,
		  'dislikes' =>32,
          'id' => 4
        ));
      
        $videos[] = new VideoModel(array(
          'name' => 'Super Long Video Name to See How Overflow behaves', 
          'description' => 'No one likes this Video',
          'views' => 2312,
          'likes' => 9,
		  'dislikes' =>12,
          'id' => 5
        ));
              
        return $videos;    
    }
}

?>
