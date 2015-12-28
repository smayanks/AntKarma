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

	$scope.sendOTP = function() {
		$('#spinner').show()
		// toaster.pop('error', "", "error sending otp");
		// $timeout(function(){
		// 	$scope.showOTPSpinner = false;
		// 	$('#spinner').hide();
		// 	$scope.otp = true;
		// 	console.log('otp is now true');
		// }, 5000);


		// Meteor.call('send_otp', $scope.signup.phone, function (error, result) {
		// 	if (error) {
		// 		console.log("Got error in client: " + error);
		// 		toaster.pop('error', "", error);
		// 		$('#spinner').hide();
		// 	} else {
		// 		toaster.pop('note', "", "One time password sent successfully");
		// 		$scope.otp = true;
		// 		$('#spinner').hide();
		// 		console.log('data from server: ' + result);
		// 	}
		// });
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
				// runCounter();

		      },
		      function(err){
				console.log("Got error in client: " + err);
				toaster.pop('error', "", "Error in sending OTP. ");
				$('#spinner').hide();
		});
		
	}

	function runCounter() {
		$scope.counter = 0;

		while ($scope.counter <=60) {
			$scope.counter++;
		}
	}


	function handleError(err) {
		console.log(JSON.stringify(err));
		toaster.pop('error', "", err.reason);
		$('#spinner').hide();
	}

	$scope.verifyPhone = function() {
		$('#spinner').show();


		// Meteor.call('verify_otp', $scope.signup.phone, $scope.signup.otpText, function (error, result) {

		// 	// console.log(result);
		// 	// console.log(JSON.stringify(error));
		// 	if (error) {
		// 		console.log(JSON.stringify(error));
		// 		toaster.pop('error', "", error.reason);
		//       	$('#spinner').hide();
		//       	return ;

		// 	} else {
		// 		toaster.pop('note', "", result);
		// 		$scope.isPhoneVerified = true;
		// 		$('#spinner').hide();
		// 		return true; 

		// 	}
		// });

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
		// $timeout(function(){
		// 	$scope.showOTPSpinner = false;
		// 	$('#spinner').hide();
		// 	toaster.pop('note', "", "Phone verified successfully!");
		// 	$scope.isPhoneVerified = true;

		// }, 5000);
		// Accounts.verifyPhone($scope.signup.phone, $scope.signup.otpText, function(err) {
		// 	if (err) {
		// 		console.log(err);
		// 		// alert("error in verifying phone" + err.reason);
		// 		toaster.pop('error', "", err.reason);
		// 		$('#spinner').hide();
		// 	} else {
		// 		toaster.pop('note', "", "Phone verified successfully!");
		// 		$('#spinner').hide();
		// 		$scope.isPhoneVerified = true;
		// 	}
		// });
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