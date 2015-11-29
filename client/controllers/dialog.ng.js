angular.module('myApp').controller('SendEmailCtrl', function($scope,  $timeout, $rootScope, $meteor, ngDialog,sharedProperties) {


	// $scope.emailPlan = function(email) {
  		
  		// var query = angular.copy(questions);
  		
  		// var query = sharedProperties.getFinalReco();
  		// query.email = email;
  		
  		// console.log('Inside emailPlan SendEmailCtrl: ' + JSON.stringify(query));

  		// $meteor.call('send_email', query).then(
	   //    function(data){
	   //      console.log('Email sent successfully');	        
	   //    },
	   //    function(err){
	   //      console.log('Questionnaire submission failed', err);
	   //    }
	   //  );
		// $scope.showMessage = true;
  // 		$scope.message = "Email sent successfully";
	 //    $scope.closeThisDialog();
	    // displayAlertMessage();

  	// }

  	// function displayAlertMessage() {
  	// 	// <div class="alert alert-info" role="alert">...</div>
  		
  	// 	$scope.showMessage = true;
  	// 	$scope.message = "Email sent successfully";
  	// 	console.log('$scope.showMessage: ' + $scope.showMessage);
  	// 	console.log('$scope.message: ' + $scope.message);
  	// 	// $timeout(function(){
	  // 	// 	$scope.showMessage = false;
  	// 	// 	$scope.message = "";
  	// 	// }, 3000);

  		
  	// }
});