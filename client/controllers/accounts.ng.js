angular.module('myApp').controller('AccountsCtrl', function($scope, $state, ngDialog, $timeout, $meteor, toaster) {

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

	$scope.pop = function() {
		toaster.pop('note', "", "One time password sent successfully");
		$scope.otp = true;
	}

	$('#spinner').hide();
	$scope.otp = false;
	$scope.emailVerificatioInProcess = false;

	$scope.sendEmailCode = function() {
		$('#spinner').show()

		$meteor.call('send_email_code', $scope.signup.email).then(
		      function(data){

		      	if (data) {
					toaster.pop('note', "", "Email code sent - Please check your email!");
					$scope.emailVerificatioInProcess = true;
					$('#spinner').hide();

		      	} else {
		      		toaster.pop('error', "", "Error in sending email code");
					$('#spinner').hide();	
		      	}

		      },
		      function(err){
				console.log("Got error in client: " + err);
				toaster.pop('error', "", "Error in sending email code!");
				$('#spinner').hide();
		});
		
	}

	$scope.verifyEmail = function() {
		$('#spinner').show();

		$meteor.call('verify_email', $scope.signup.email, $scope.signup.emailCodeText).then(
		      function(data){
		      	console.log('data: ' + JSON.stringify(data));
		      	
					toaster.pop('note', "", "Email verified successfully");
					$scope.isEmailVerified = true;
					$('#spinner').hide();
		      	

		      },
		      function(err){
				console.log(JSON.stringify(err));
				toaster.pop('error', "", err.reason);
				$('#spinner').hide();
		});

	}

	$scope.sendOTP = function() {
		$('#spinner').show()

		$meteor.call('send_otp', $scope.signup.phone).then(
		      function(data){

		      	if (data) {
					toaster.pop('note', "", "One time password sent successfully");
					$scope.otp = true;
					$('#spinner').hide();
					console.log('data from server: ' + data);

		      	} else {
		      		toaster.pop('error', "", "Error in sending OTP");
					$('#spinner').hide();	
		      	}

		      },
		      function(err){
				console.log("Got error in client: " + err);
				toaster.pop('error', "", "Error in sending OTP. ");
				$('#spinner').hide();
		});
		
	}


	$scope.verifyPhone = function() {
		$('#spinner').show();

		$meteor.call('verify_otp', $scope.signup.phone, $scope.signup.otpText).then(
		      function(data){
		      	console.log('data: ' + JSON.stringify(data));
		      	
					toaster.pop('note', "", "Phone verified successfully");
					$scope.isPhoneVerified = true;
					$('#spinner').hide();
		      	

		      },
		      function(err){
				console.log(JSON.stringify(err));
				toaster.pop('error', "", err.reason);
				$('#spinner').hide();
		});

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