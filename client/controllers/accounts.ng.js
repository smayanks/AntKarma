angular.module('myApp').controller('AccountsCtrl', function($scope, $state, ngDialog, $timeout, $meteor, toaster, $rootScope) {

	//Setting default values for scope variables
	$scope.emailVerificatioInProcess = false;
	$scope.isEmailVerified = false;

	$scope.otp = false;
	$scope.isPhoneVerified = false;

	$scope.pwdCriteriaMatch = true;
	$scope.passDoNotMatch = false;

	$scope.emailCodeText = '';

	$scope.global = $rootScope;

	$('#signInOutButtons').hide();

	if (Session.get('resetPassword')) {
		$scope.global.resetPassword = true;
	} else {
		$scope.global.resetPassword = false;
	}
	$scope.login = function() {
		// alert('successs');
		
		if ($scope.stepForm.email.$invalid) {
			toaster.pop('error', "Invalid Email", "Please check the email field");
			return false;
		}

		showSpinner();
		Meteor.loginWithPassword($scope.signin.email, $scope.signin.password, function(error){

			if (error) {
				console.log("Error in loggin in : " + error);
				hideSpinner();
				$scope.$apply(function () {
					toaster.pop('error', "Unable to create user!", error.reason);
				});
				return false;
			}

			if (Meteor.user()) {
				$scope.$apply(function () {
					toaster.pop('success', "logged in successfully!", "");					
				});

				//on successful login redirect to user dashboard
				// $state.go('dashboard');
				$timeout(function(){
					$state.go('home');	
				}, 3000);



			} else {
				// var message = "There was an error logging in: <strong>" + error.reason + "</strong>";
				$scope.$apply(function () {
					toaster.pop('error', "Unable to login!", error.reason);
				});


			}
		});
	}

	$scope.logout = function() {
		Meteor.logout();
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
		toaster.pop('success', "", "One time password sent successfully");
		$scope.otp = true;
	}

	hideSpinner();

	$scope.sendEmailCode = function() {

		if ($scope.stepForm.email.$invalid) {
			toaster.pop('error', "Invalid Email", "Please check the email field");
			return;
		}
		$('#spinner').show()

		$meteor.call('send_email_code', $scope.signup.email).then(
		      function(data){

		      	if (data) {
					toaster.pop('success', "", "Email code sent - Please check your email!");
					$scope.emailVerificatioInProcess = true;
					hideSpinner();

		      	} else {
		      		toaster.pop('error', "", "Error in sending email code");
					hideSpinner();	
		      	}

		      },
		      function(err){
				console.log("Got error in client: " + err);
				toaster.pop('error', "", "Error in sending email code!");
				hideSpinner();
		});
		
	}

	$scope.verifyEmail = function() {

		var emailCodeRegex = /[0-9]{1,6}/;

		if (!emailCodeRegex.test($scope.emailCodeText)) {
			toaster.pop('error', "Invalid Email Code", "Only 6 digit email code allowed!");
			$scope.emailCodeText = '';
			return;
		}


		showSpinner();
		$meteor.call('verify_email', $scope.signup.email, $scope.emailCodeText).then(
		      function(data){
		      	console.log('data: ' + JSON.stringify(data));
		      	
					toaster.pop('success', "", "Email verified successfully");
					$scope.isEmailVerified = true;
					hideSpinner();
		      	

		      },
		      function(err){
				console.log(JSON.stringify(err));
				toaster.pop('error', "", err.reason);
				hideSpinner();
		});

	}

	$scope.sendOTP = function() {

		if ($scope.stepForm.phone.$invalid  ) {
			toaster.pop('error', "", "Please enter a valid phone number!");
			return;
		}

		$('#spinner').show()

		var phoneWithISD = '+91' + $scope.signup.phone;
		$meteor.call('send_otp', phoneWithISD).then(
		      function(data){

		      	if (data) {
					toaster.pop('success', "", "One time password sent successfully");
					$scope.otp = true;
					hideSpinner();
					console.log('data from server: ' + data);

		      	} else {
		      		toaster.pop('error', "", "Error in sending OTP");
					hideSpinner();	
		      	}

		      },
		      function(err){
				console.log("Got error in client: " + err);
				toaster.pop('error', "", "Error in sending OTP. ");
				hideSpinner();
		});
		
	}


	$scope.verifyPhone = function() {

		var phoneCodeRegex = /[0-9]{1,6}/;

		if (!phoneCodeRegex.test($scope.otpText)) {
			toaster.pop('error', "Invalid OTP Code", "Only 6 digit OTP allowed!");
			$scope.otpText = '';
			return false;
		}

		showSpinner();

		var phoneWithISD = '+91' + $scope.signup.phone;

		$meteor.call('verify_otp', phoneWithISD, $scope.otpText).then(
		      function(data){
		      	// console.log('data: ' + JSON.stringify(data));
		      	
					toaster.pop('success', "", "Phone verified successfully");
					$scope.isPhoneVerified = true;
					hideSpinner();
		      	

		      },
		      function(err){
				console.log(JSON.stringify(err));
				toaster.pop('error', "", err.reason);
				hideSpinner();
		});

	}


	$scope.checkPwdRegex = function() {

		var regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
		console.log('$scope.password: ' + $scope.password);
		if (regex.test($scope.password)) {
			console.log('password criteria matched');
			$scope.pwdCriteriaMatch = true;
			// $scope.stepForm.password.$setValidity("password", true);
		} else {
			console.log('password criteria not matched');
			$scope.pwdCriteriaMatch = false;
			$scope.stepForm.password.$setValidity("password", false);
		}
	}

	$scope.checkRenteredPassword = function() {

		if ($scope.password != $scope.reenterPassword) {

			$scope.passDoNotMatch = true;
			// $timeout(function() {
			// 	$scope.passDoNotMatch = false;
			// }, 3000);
			
			return false;
		} 
		return true;
	}

	$scope.userSignup = function() {
		var user;

		$scope.isEmailVerified = true;

		$scope.isPhoneVerified = true;

		if (! $scope.isEmailVerified) {
			toaster.pop('error', "Please verify your email to signup!");
			return false;
		}

		if (! $scope.isPhoneVerified) {
			toaster.pop('error', "Please verify your email to signup!");
			return false;
		}

		

		user = {
			email: $scope.signup.email,
			password: $scope.password,
			profile: {
				userDetails: $scope.signup
			}
		}

		showSpinner();
		var error = Accounts.createUser(user, function(error) {
			if (error) {
				console.log("Error in creating user : " +error);
				hideSpinner();
				$scope.$apply(function () {
					toaster.pop('error', "Unable to create user!", error.reason);
				});
				return false;
			}  else {

				//Simulated delay of 3 seconds
				$timeout(function() {
					hideSpinner();
					$scope.$apply(function () {
						toaster.pop('success', "", "Account created successfully. Now fill investor details.");
					});
					var nextId = "step2";
	    			$('[href=#'+nextId+']').tab('show');
				}, 3000);

			}

    			
			
		});

		if (error) {
			toaster.pop('error', "Unable to create user!", error.reason);
		}
		return false;
	}



	// Meteor will set _resetPasswordToken if found in the url
	// Setting this now in navbar.ng.js
	// if (Accounts._resetPasswordToken) {
	//   Session.set('resetPassword', Accounts._resetPasswordToken);
	// }


	$scope.sendPwdEmail = function() {
		console.log('$scope.email : ' + $scope.email);
		var gotResponse = false;
		showSpinner();
		Accounts.forgotPassword({email: $scope.email}, function(err) {
		gotResponse = true;
        if (err) {
          if (err.message === 'User not found [403]') {
			$scope.$apply(function () {
				toaster.pop('error', "This email does not exist.", "");

			});
            console.log('This email does not exist.' + err.reason);
            hideSpinner();
          } else {
			$scope.$apply(function () {
				toaster.pop('error', "We are sorry but something went wrong.", err.reason);
			});

            console.log('We are sorry but something went wrong. : ' + err.reason);
            hideSpinner();
          }
        } else {
        	hideSpinner();
			$scope.$apply(function () {
				toaster.pop('success', "Email Sent. Check your mailbox.", "Redirecting you to home page.....");
			});
			console.log('Email Sent. Check your mailbox.');
			$timeout(function(){
				$state.go('home');
			}, 6000);
        }
      });

		// $timeout(function(){
		// 	if (!gotResponse) {
		// 		console.log('Timeout! Error in sending email - Please try again later!');
		// 		toaster.pop('error','', "Timeout! Error in sending email - Please try again later!");
		// 		return false;
		// 	}
		// }, 5000);
	}


	$scope.resetPassword = function() {
		showSpinner();
		Accounts.resetPassword(Session.get('resetPassword'), $scope.password, function(err) {
        if (err) {
          console.log('We are sorry but something went wrong. : ' + err.reason);
          	$scope.$apply(function () {
				toaster.pop('error', "We are sorry but something went wrong.", err.reason);
			});
			hideSpinner();
        } else {
          console.log('Your password has been changed. Welcome back!');
	      	$scope.$apply(function () {
				toaster.pop('success', "Your password has been changed.", "Welcome Back");
			});
	      	hideSpinner();
          	Session.set('resetPassword', null);
          	$state.go('home');
        }
      });
	}

	// $scope.$watch('isError', function() {
	// 	toaster.pop('error', "Unable to create user!", "");
	// });

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

	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
      //update progress
      var step = $(e.target).data('step');
      var percent = (parseInt(step) / 4) * 100;
      $('.progress-bar').css({width: percent + '%'});
      $('.progress-bar').text("Step " + step + " of 4");
      //e.relatedTarget // previous tab
	});

  	$('[data-toggle="tooltip"]').tooltip();

	$scope.states = [
	{'state' : 'Andaman and Nicobar Islands'},
	{'state' : 'Andhra Pradesh'},
	{'state' : 'Arunachal Pradesh'},
	{'state' : 'Assam'},
	{'state' : 'Bihar'},
	{'state' : 'Chandigarh'},
	{'state' : 'Chhattisgarh'},
	{'state' : 'Dadra and Nagar Haveli'},
	{'state' : 'Daman and Diu'},
	{'state' : 'National Capital Territory of Delhi'},
	{'state' : 'Goa'},
	{'state' : 'Gujarat'},
	{'state' : 'Haryana'},
	{'state' : 'Himachal Pradesh'},
	{'state' : 'Jammu and Kashmir'},
	{'state' : 'Jharkhand'},
	{'state' : 'Karnataka'},
	{'state' : 'Kerala'},
	{'state' : 'Lakshadweep'},
	{'state' : 'Madhya Pradesh'},
	{'state' : 'Maharashtra'},
	{'state' : 'Manipur'},
	{'state' : 'Meghalaya'},
	{'state' : 'Mizoram'},
	{'state' : 'Nagaland'},
	{'state' : 'Odisha'},
	{'state' : 'Puducherry'},
	{'state' : 'Punjab'},
	{'state' : 'Rajasthan'},
	{'state' : 'Sikkim'},
	{'state' : 'Tamil Nadu'},
	{'state' : 'Telangana'},
	{'state' : 'Tripura'},
	{'state' : 'Uttar Pradesh'},
	{'state' : 'Uttarakhand'},
	{'state' : 'West Bengal'}];

	$scope.accountTypes = ['Savings', 'Current', 'Cash Credit', 'O/D', 'NRE', 'NRO', 'FCNR', 'NRSR', 'Other'];
	$('[data-toggle="tooltip"]').tooltip({html: true});


	function showSpinner() {
		$('#spinner').show();
	}

	function hideSpinner() {
		$('#spinner').hide();	
	}


}); 
