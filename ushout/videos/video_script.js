$(function(){ //jquery ready function
	var overlay=$("#overlay");
	var add_video=$("#add_video");
	
	$("#video_item").click(function(){
		$(this).parent().parent().submit();
	});
	
	$("#upload_video").click(function(){
		overlay.show();
		add_video.show();
	});
	
	overlay.click(function(e){
		e.stopPropagation();
		add_video.hide();
		overlay.hide();
	});
	
	$(".close_window").click(function(){
		add_video.hide();
		overlay.hide();
	});
	
	$(".add_tag").click(function(){
		var item = $("#tag_input").val();
		if(item!=null)
		{
			$("#tag_list").prepend("<div class='selected_attr'>"+item+"</div>");
		}
		$("#tag_input").val("");
	});
	
	$(".add_channel").click(function(){
		var item = $("#channel_input").val();
		if(item!=null)
		{
			$("#channel_list").prepend("<div class='selected_attr'>"+item+"</div>");
		}
		$("#channel_input").val("");
	});
	
	$("body").on('click','.selected_attr',function(){
		$(this).removeClass('selected_attr');
		$(this).addClass('unselected_attr');
	});
	
	$("body").on('click','.unselected_attr',function(){
		$(this).removeClass('unselected_attr');
		$(this).addClass('selected_attr');
	});
});
