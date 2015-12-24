angular.module('myApp').controller('NavbarCtrl', function($window, $scope, $state, ngDialog, $timeout, $document ) {

	console.log("From client : " + Meteor.default_connection._lastSessionId);

	$scope.signout = function() {
		
		// AccountsTemplates.logout();
		Meteor.logout(function() {
      	// Redirect to login
      		$state.go('home');
    	});
		displayDialogMessage('Signed out successfully!');
		
	}

	$scope.signin = function() {
		$state.go('signin');
	}


	$scope.goToQuestions = function() {
		$state.go('questions');	
	}

	$scope.goToHome = function() {
		$state.go('home');	
	}

	$scope.openSingIn = function () {

    	ngDialog.openConfirm({template: 'signinDialog',
			scope: $scope //Pass the scope object if you need to access in the template
		});
  	};

  	$scope.openTax = function () {

    	ngDialog.openConfirm({template: 'subscribeDialog',
			scope: $scope //Pass the scope object if you need to access in the template
		}).then(
			function(value) {
				//You need to implement the saveForm() method which should return a promise object			
				
			},
			function(value) {
				//Cancel or do nothing
			
			}
		);

		// $timeout(function(){
  // 					ngDialog.close();	
  // 		}, 5000);
  	};

  	$scope.$watch('currentUser', function() {
  		if ($scope.currentUser != null && Session.get('firstTimeLoginFlag')) {
  			displayDialogMessage('Logged in successfully!');
  		} 
  	});

  	function displayDialogMessage(message) {
  		  	ngDialog.close();
  			ngDialog.open({template: '<div class="ngdialog-message"> \
						  '+ message +' </div>',
							plain: 'true'
			}); 
  			$timeout(function(){
  				ngDialog.close();	
  			}, 1000);  		
  			Session.set('firstTimeLoginFlag', false);	

  	}

  	// Logic to change the navbar color and background on scroll
    $document.on('scroll', function() {
      // console.log('Document scrolled to ', $document.scrollLeft(), $document.scrollTop());
      	$scope.scrollPos = $document.scrollTop();

		if($scope.scrollPos > 500) {
			console.log('You are fired!');
			$(".navbar.transparent.navbar-default.navbar-fixed-top").css({"background-color":"#f8f8f8"}); 
			$(".navbar-default .navbar-nav > li > a").css({"color":"#333"}); 
			$(".navbar.transparent.navbar-default.navbar-fixed-top").css({"color":"#333"}); 
			$(".navbar.transparent.navbar-default.navbar-fixed-top").css({"border":"1px solid #ccc"}); 
			$(".navbar-default .navbar-nav > li > a:hover").css({"color":"#777"}); 

			$(".bordered").css({"border":"1px solid #777"}); 
		} else {
			$(".navbar.transparent.navbar-default.navbar-fixed-top").css({"background-color": "rgba(0,0,0,0.05)"}); 
			$(".navbar.transparent.navbar-default.navbar-fixed-top").css({"border":"none"}); 
			$(".navbar-default .navbar-nav > li > a").css({"color":"#f3f3f3"});
			$(".bordered").css({"border":"1px solid #fff"}); 
		}
    });
	
}); 