angular.module('antkarma').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
	$locationProvider.html5Mode(true);

	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: 'client/templates/main.ng.html'
		})
		.state('process', {
			url: '/process',
			templateUrl: 'client/templates/process.ng.html'
		})
		.state('pricing', {
			url: '/pricing',
			templateUrl: 'client/templates/pricing.ng.html'
		})
		.state('team', {
			url: '/team',
			templateUrl: 'client/templates/team.ng.html'
		})
		.state('faq', {
			url: '/faq',
			templateUrl: 'client/templates/faq.ng.html'
		})
		.state('questions', {
			url: '/questions',
			templateUrl: 'client/templates/questions.ng.html',
			controller: 'QuestionnaireCtrl'
		})
		.state('recommendations', {
			url: '/recommendations',
			templateUrl: 'client/templates/reco.ng.html',
			controller: 'RecommendationCtrl'
		});

	$urlRouterProvider.otherwise('/home');
});