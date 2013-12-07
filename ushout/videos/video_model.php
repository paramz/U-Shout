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
    
    public static function find_all()
    {
        $videos[] = new VideoModel(array(
          'id' => 'JZQOs0L9q2k',
          'name' => 'Dave Matthews Band',
          'description' => 'Dave Matthews Band1 this is a really long description stupid stupid stupid',
          'thumbnailImageUrl' => 'http://i1.ytimg.com/vi/JZQOs0L9q2k/mqdefault.jpg',
          'views' => 6131,
          'likes' => 67,
          'dislikes' => 5
        ));

        $videos[] = new VideoModel(array(
          'id' => 'GJpfFK9FrfQ',
          'name' => 'STILL DON\'T TRUST MARKIPLIER | Murder #2', 
          'description' => 'Seriously... ally, enemy... just don\'t trust me...',
          'views' => 192347,
          'likes' => 2957,
		      'dislikes' => 17
        ));
      
        $videos[] = new VideoModel(array(
          'id' => '1UwsxqXc02s',
          'name' => 'Lol Cats #1', 
          'description' => 'Special thanks to lolcats.com and icanhascheezburger.com',
          'views' => 132153,
          'likes' => 403,
		      'dislikes' => 39
        ));

        $videos[] = new VideoModel(array(
          'id' => 'SJ8Ndkg8urw',
          'name' => 'DRD Paratus-18 (Suit Case Gun)', 
          'description' => 'Click-2-Tweet: http://clicktotweet.com/Perzv',
          'views' => 5458568,
          'likes' => 111329,
		  'dislikes' => 1987
        ));
      
        $videos[] = new VideoModel(array(
          'id' => 'Ysa35dd20kM',
          'name' => 'Drunk Prop Hunt',
          'description' => 'After our Drunk Minecraft session we decided that it would be fun to play some Prop Hunt. AND IT WAS!! Let us know if you\'d like more!',
          'views' => 270691,
          'likes' => 16810,
          'dislikes' => 102
        ));
              
        return $videos;    
    }
    
    public static function search( $search_text )
    {
    	$videos = VideoModel::find_all();
    	foreach ($videos as $video){
    		if( stripos($video->name, $search_text) !== FALSE || ( strpos($video->description, $search_text) !== FALSE ) ){
    			$result_videos[] = $video;
    		}
    	}
    	return $result_videos;
    }
    
}

?>
