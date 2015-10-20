
	angular.module('antkarma', ['angular-meteor', 'ngAnimate','ui.router',  'ui.bootstrap', 'ngMessages']);

	// angular.module('antkarma').config(function($urlRouterProvider, $stateProvider, $locationProvider) {

	// 	// $locationProvider.html5Mode(true);
	// 	$stateProvider
	// 	.state('questionnaire', {
	// 		url: '/questionnaire',
	// 		templateUrl: 'client/templates/questions.ng.html'
			
	// 	});

	// 		// $urlRouterProvider.otherwise('/questionnaire');
	// 	});

	angular.module('antkarma').controller('QuestionnaireCtrl', function($scope, $modal, $meteor) {

		// $scope.fullQuestionnaire = [];
		// $scope.activeQuestionnaire = [];

		$scope.questions = {};
		$scope.onlyNumbers = /^\d+$/;

		$scope.submitForm = function(questions) {
			console.log(questions)	;		
		}

	});




