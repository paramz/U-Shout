
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">

        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

        <link rel="stylesheet" href="/css/normalize.css">
        <link rel="stylesheet" href="/css/main.css">
        <!--<script src="js/vendor/modernizr-2.6.2.min.js"></script>-->
    </head>
    <body debug="no" signedin="yes">
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->

        <!-- Add your site or application content here -->
        
        <div id="page_container" class="debug_frame">
            <div id="page" class="debug_frame">
                <div id="nav_container" class="debug_frame">
                    <nav id="nav" class="clearfix">
                        <div id="logo">U Shout</div>
						<?if(!isset($_GET['hide_menu'])){?>
                        <div id="search_container">
                            <form>
                                <input id="search_input" type="text" value="Type here to search..." name="search">
                                <button id="search_submit" type="submit" tooltip="click to search" demo="no">Search</button>
                            </form>
                        </div>
						<?}?>
                        <div id="auth">
                            <div class="not_signed_in">
                                <button class="prompt" tooltip="sign in">Sign In</button>
                            </div>
                            <div class="signed_in">
                            	<div id="profile_wrapper" class="clearfix">
	                            	<a id="username" tooltip="profile page" demo="no" href="#">Xingchen</a> <div style="float: right"> <img src="/user_img.png" /> </div>
	                            	<!-- button id="more_pages" class="activated" tooltip="more pages" demo="yes"></button-->
	                            	<ul id="more_page_list">
	                            		<li class="more_page_item"><a href="#">My Channels</a></li>
	                            		<li class="more_page_item"><a href="#">My Videos</a></li>
	                            		<li class="more_page_item"><a href="#">My Friends</a></li>
	                            		<li class="more_page_item"><a href="#">Account Settings</a></li>
		                            	<li class="more_page_item"><a href="#">Sign Out</a></li>
	                            	</ul>
                            	</div>
                            </div>
                        </div>
                    </nav>
                </div>
                <div id="body_container" class="debug_frame">
                
                <div style='color:white;margin-top:10%;margin-left:2%;'>

                
                
