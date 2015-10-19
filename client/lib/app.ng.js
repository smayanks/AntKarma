if (Meteor.isClient) {

	angular.module('antkarma', ['angular-meteor', 'ui.router',  'ui.bootstrap']);

	angular.module('antkarma').config(function($urlRouterProvider, $stateProvider, $locationProvider) {

		// $locationProvider.html5Mode(true);
		$stateProvider
			.state('questionnaire', {
				url: '/questionnaire',
				templateUrl: 'client/templates/questions.ng.html'
				
			});
			// $urlRouterProvider.otherwise('/questionnaire');
		});

}


