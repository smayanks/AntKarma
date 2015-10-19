if (Meteor.isClient) {

	angular.module('antkarma', ['angular-meteor', 'ui.router']);

	angular.module('antkarma').config(function($urlRouterProvider, $stateProvider, $locationProvider) {

		// $locationProvider.html5Mode(true);
		$stateProvider
			.state('questionnaire', {
				url: '/questionnaire',
				templateUrl: '../templates/questionnaire.ng.html',
				controller: 'questionnaireCtrl'
			});

			$urlRouterProvider.otherwise('/questionnaire');
	});

	angular.module('antkarma').controller('questionnaireCtrl', function($scope, $meteor) {


	});

}

