
angular.module('antkarma', ['angular-meteor', 'ngAnimate','ui.router',  'ui.bootstrap', 'ngMessages']);


angular.module('antkarma').controller('QuestionnaireCtrl', function($scope, $modal, $meteor) {

	// $scope.fullQuestionnaire = [];
	// $scope.activeQuestionnaire = [];
	
	$scope.questionnaire = $meteor.collection(Questionnaire);

	$scope.questions = {};
	$scope.onlyNumbers = /^\d+$/;
	$scope.submitted = false;

	$scope.addThousandSeperator = function(fieldName) {
		console.log('FieldName ' + fieldName);
		// console.log('FieldValue ' + fieldValue);
		var inputVal = fieldName;
		// var modelName = '$scope.'+fieldName;
		// console.log("Model Name: " + modelName );
		console.log('inputVal : ' + inputVal + " ---" + "isNum : " + isNaN(parseInt(inputVal)));
		if (isNaN(parseInt(inputVal))) {
			// return; 
			$scope.fieldName = "";
		} else {
			var num2 = inputVal.toString().split('.');
			var thousands = num2[0].split('').reverse().join('').match(/.{1,3}/g).join(',');
			var decimals = (num2[1]) ? '.'+num2[1] : '';
			var answer =  thousands.split('').reverse().join('')+decimals; 
			console.log("Answer : " + answer);


			$scope.questions.annualSalary = answer;
		}

	}
	$scope.submitForm = function(questions) {
		$scope.submitted = true;
		$scope.questionnaire.save(questions);
		// $timeout(function() {

  //     		$scope.submitted = false;
  //     		$window.location.href= "#page-top";
  //     		// $location.hash('page-top');
  //     		// anchorScroll();
      		
  //     	}, 5000);
		// $timeout(function() {
  //     		// $window.location.href = "#page-top";
  //     		$location.hash('page-top');
  //     		anchorScroll();
  //     	}, 3000);
		
		$scope.data = {
			boldTextTitle: "Congratulations!",
			textAlert : "Check your email for your tax saving recommendation.",
			mode : 'info'
		};

		$scope.$modalInstance = $modal.open({
			scope: $scope,
			templateUrl: 'client/templates/alertTemplate.ng.html',
			size: 'lg',
			backdrop: 'static',
			keyboard: false
		});

		$scope.ok = function(){
			$scope.$modalInstance.close();
			$('div.modal').removeClass('fade').addClass('hidden');
      		$('body').removeClass('modal-open');
      		$('.modal-backdrop').remove();
      		$('#goToPageTop').click();
		}
	};


});

