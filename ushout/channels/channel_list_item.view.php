        <form action="manage_channel.php">
            <li class="list_item" onclick="javascript:this.parentNode.submit();">
                <div class="name"><?php echo $channel->name; ?></div>
                <div class="description left_pad tooltipbelow" tooltip="<?php echo $channel->description; ?>"><span><?php echo $channel->description; ?></span></div>
                    
                <div class="list_item_content left_pad">
                   <div class="channel_video_count">Videos: <?php echo $channel->video_count; ?></div>
                   <div class="channel_subscriber_count">Subscribers: <?php echo $channel->subscriber_count; ?></div>
                </div>
            </li>
            
            <input type="hidden" name="channel_id" value="<?php echo $channel->id ?>"/>
        
        </form>
