$(function () {
    var $trackPad = $('#page');
    var trackPadOffset = $trackPad.offset();
    var trackPadHeight = $trackPad.height(),
        trackPadWidth = $trackPad.width();
    var $view = $('#video_wall');
    var viewHeight = $view.height(),
        viewWidth = $view.width();
    var YOffset = viewHeight - trackPadHeight,
        XOffset = viewWidth - trackPadWidth;

    $trackPad
        .mousemove(function(event) {
            var mouseY = event.pageY - trackPadOffset.top,
                mouseX = event.pageX - trackPadOffset.left;
            $view.stop(true).clearQueue().animate({
                marginTop: (0 - mouseY / trackPadHeight * YOffset - (viewHeight - YOffset) / 2) + 'px',
                marginLeft: (0 - mouseX / trackPadWidth * XOffset - (viewWidth - XOffset) / 2) + 'px'
            }, 20);
        })
        .mouseleave(function() {
            $view.stop(true).clearQueue().animate({
                marginTop: (0 - viewHeight / 2) + 'px',
                marginLeft: (0 - viewWidth / 2) + 'px'
            }, 200);
        });
    
    var $navContainer = $("#nav_container");
    var $searchInput = $navContainer.find("#search_input");
    $searchInput
        .focus(function () {
            $navContainer.addClass("focus");
        })
        .blur(function () {
            $navContainer.removeClass("focus");
        })
});
