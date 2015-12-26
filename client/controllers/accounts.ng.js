angular.module('myApp').controller('AccountsCtrl', function($scope, $state, ngDialog, $timeout) {

	$scope.login = function() {
		alert('successs');
	}
	
	// $('.active').focus();

	$('.nextItem').on('click', function(e) {
	  e.preventDefault();
	  console.log('clicked');
	  var currentSection = $(this).parent('.signupSection');
	  $(currentSection).removeClass('active');
	  var target = $(currentSection).next();
	  $(target).addClass('active');

	  // $('.signup').stop().animate({
	  //   scrollTop: $(target).scrollTop()
	  // }, 1000);

		$(target).ScrollTo({
    		duration: 500
		});
		$(target).find('input').focus();
	});	


$('.input-md').keypress(function(event){
	
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode == '13'){
		console.log('You pressed a "enter" key in somewhere');	
		var currentSection = $(event.target).parent('.signupSection');
		$(currentSection).removeClass('active');
		var target = $(currentSection).next();
		$(target).addClass('active');
		$(target).ScrollTo({
    		duration: 500
		});		
		$(target).find('input').focus();
	}
	
});

$('.input-md').on('click', function() {
	$('.signupSection').removeClass('active');
	$(event.target).parent('.signupSection').addClass('active');
});


}); 