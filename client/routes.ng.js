angular.module('myApp').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
	$locationProvider.html5Mode(true);

	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: 'client/templates/main.ng.html'
		})
		.state('questions', {
			url: '/questions',
			templateUrl: 'client/templates/questions.ng.html',
			controller: 'QuestionnaireCtrl'
		})
		.state('signin', {
			url: '/signin',
			templateUrl: 'client/templates/signin.ng.html',
			controller: 'AccountsCtrl'
		})
		.state('signup', {
			url: '/signup',
			templateUrl: 'client/templates/signup.ng.html',
			controller: 'AccountsCtrl'
		})
		.state('recommendations', {
			url: '/recommendations',
			templateUrl: 'client/templates/reco.ng.html',
			controller: 'RecommendationCtrl'
		});

	$urlRouterProvider.otherwise('/home');
});