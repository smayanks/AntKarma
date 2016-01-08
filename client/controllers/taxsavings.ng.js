angular.module('myApp').controller('TaxSavingsCtrl', function($scope, $state, $timeout, $meteor, toaster, $document) {

	$scope.showQuestions = false;
	
	$scope.accessRiskProfile = function() {
		$scope.showQuestions = true;
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