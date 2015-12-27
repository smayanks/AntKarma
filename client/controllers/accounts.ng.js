angular.module('myApp').controller('AccountsCtrl', function($scope, $state, ngDialog, $timeout, $meteor) {

	$scope.login = function() {
		alert('successs');
	}

	$scope.verifyEmail = function(email) {
		if (email) {
	  		$meteor.call('send_email', email).then(
		      function(data){
					console.log('Email sent successfully')   ;
					return 'Email sent successfully';

		      },
		      function(err){

		       		return err;

			});
	  	} else {
	  		return "No email address provided"
	  	}
	}

	// questionnaire navigation between tabs
	$('.next').click(function(){
		var nextId = $(this).parents('.tab-pane').next().attr("id");
    	// $('[href=#'+nextId+']').addClass('animated slideInLeft');
    	$('[href=#'+nextId+']').tab('show');
    	return false;
    });

	$('.prev').click(function(){
		var prevId = $(this).parents('.tab-pane').prev().attr("id");
		// $('[href=#'+prevId+']').addClass('animated slideInRight');
		$('[href=#'+prevId+']').tab('show');
		return false;
	});

	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
      //update progress
      var step = $(e.target).data('step');
      var percent = (parseInt(step) / 7) * 100;
      $('.progress-bar').css({width: percent + '%'});
      $('.progress-bar').text("Step " + step + " of 7");
      //e.relatedTarget // previous tab

    // var url = new String(e.target);
    // var pieces = url.split('#');
    // var seq=$(this).children('a').attr('data-seq');
    // var tab=$(this).children('a').attr('href');
    // // if (pieces[1] == "profile"){       
    //  leftSlide(tab);        
    // }

});

	function leftSlide(tab){
		$(tab).addClass('animated slideInLeft');
	}

	function rightSlide(tab){
		$(tab).addClass('animated slideInRight');   
	}

	$('.first').click(function(){
		$('[href=#step1]').tab('show');
	});


}); 