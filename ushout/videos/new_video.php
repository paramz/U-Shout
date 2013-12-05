<div id="add_video">
	<div class="close_window">X</div>
	<div id="upload_title">Upload Video</div>
	<!--form-->
	  <input class="prompt" type="file" name="video" />
	  <br/>
	  <br/>
	  <table>
		  <tr>
			<td>Title </td>
			<td><input class="video_standard_input" type="text" name="title"></td>
		  </tr>
		  <tr>
			<td style="visibility:hidden">.</td>
		  </tr>
		  <tr>
			<td>Tags </td>
			<td><input class="video_standard_input" id="tag_input" type="text" name="tags"></td>
			<td><input class="video_prompt add_info add_tag" type="button" value="Add >" /></td>
		  </tr>
		  <tr>
			<td></td>
			<td id="tag_list"></td>
		  </tr>
		  <tr>
			<td style="visibility:hidden">.</td>
		  </tr>
		  <tr>
			<td>Channels&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
			<td><input class="video_standard_input" id="channel_input" type="text" name="channels"></td>
			<td><input class="video_prompt add_info add_channel" type="button" value="Add >" /></td>
		  </tr>
		  <tr>
			<td></td>
			<td id="channel_list"></td>
		  </tr>
	  </table>
	  <br/>
	  <button id="save_button" class="prompt" type="submit">Upload Video</button>
	  
	<!--/form-->
</div>

<script src="/videos/video_script.js"></script>
