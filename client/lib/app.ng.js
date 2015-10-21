
angular.module('antkarma', ['angular-meteor', 'ngAnimate','ui.router',  'ui.bootstrap', 'ngMessages']);


angular.module('antkarma').controller('QuestionnaireCtrl', function($scope, $modal, $meteor) {

	// $scope.fullQuestionnaire = [];
	// $scope.activeQuestionnaire = [];
	
	$scope.questionnaire = $meteor.collection(Questionnaire);

	$scope.questions = {};
	$scope.onlyNumbers = /^\d+$/;
	$scope.submitted = false;
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

