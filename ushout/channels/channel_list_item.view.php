        <form action="manage_channel.php">
            <li class="list_item" onclick="javascript:this.parentNode.submit();">
                <div class="name"><?php echo $channel->name; ?></div>
                <div class="description"><?php echo $channel->description; ?></div>
                <div class="channel_video_count">Videos: <?php echo $channel->video_count; ?></div>
                <div class="channel_subscriber_count">Subscribers: <?php echo $channel->subscriber_count; ?></div>
            </li>
            
            <input type="hidden" name="channel_id" value="<?php echo $channel->id ?>"/>
        
        </form>
