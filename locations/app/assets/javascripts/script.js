$(document).ready(function(){

	// welcome page fades in
	$(window).load(function() {
  		$('.welcome-background').fadeIn(1000);
  		$('.welcome-background').toggleClass("showme");
	});

	// main welcome page 
	var myButton = $("#main-start");
	var loginForm = $(".login-signup-form");
	var mainPage = $('#login');

	myButton.on('click', function(){
		loginForm.fadeIn(1000);
		loginForm.toggleClass("showme");
		// loginForm.addClass("animated zoomIn")
		mainPage.attr("class","hideme");
	});

	$('.enter-in').on("click", function(){
	  	$('.index-background').toggleClass("showme");
	  	$('.index-background').fadeIn(2000);
	});
});