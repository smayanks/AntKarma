
angular.module('antkarma', ['angular-meteor', 'ngAnimate','ui.router',  'ui.bootstrap', 'ngMessages']);


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

angular.module('antkarma').controller('QuestionnaireCtrl', function($scope, $modal, $meteor, $state, sharedProperties) {

	$scope.questionnaire = $meteor.collection(Questionnaire);
	$scope.questions = {};
	$scope.questions.username = '';
	$scope.submitted = sharedProperties.getSubmitted();
	$scope.lifeInsuranceFieldCounter = 0;


	$scope.questions.financialHelpTypes = [
		{
			text: 'I want to make tax saving investments efficiently', 
			subtext:'We intend to help you do just that. Tax saving investments should be personalized to an invidual\'s needs and we will walk you through the steps over the next two sections.',
			checked: false
		},
		{
			text: 'I want to do financial goal planning effectively', 
			subtext:'One has several goals in life and financial stability is necessary for achieving these goals. We intend to help you achieve your goals in life by simplifying and demistifying the financial planning process.',
			checked: false
		},
		{
			text: 'I\'d like to make the most of my savings.', 
			subtext:'And everyone should do the same. We believe that good financial advice should be for everyone irrespective of their wealth or status. Our platform will enable effective investments with optimum growth for everyone.',
			checked: false
		}
	]

	
	$scope.questions.currentOutStandingLoans = [];
	$scope.questions.currentOutStandingLoans.push({existingLoanType: 'Housing', existingLoanUnpaidAmt: '', comments:''});

	$scope.addOutstandingLoanDetails = function() {
		
		$scope.questions.currentOutStandingLoans.push({existingLoanType: 'Housing', existingLoanUnpaidAmt: '', comments:''});

	}

	$scope.removeOutstandingLoan = function(index) {
		$scope.questions.currentOutStandingLoans.splice(index, 1);
		
		if ($scope.questions.currentOutStandingLoans.length == 0) {

			$scope.questions.outstandingLoans = 'no';
			$scope.questions.currentOutStandingLoans.push({existingLoanType: 'Housing', existingLoanUnpaidAmt: '', comments:''});

		}
		
	}

	$scope.questions.currentLifeInsurancePolicies = [{existingLifeInsPolicyName: '', existingLifeInsSumInsured: '', existingLifeInsYrlyPrem: ''}];
	$scope.addLifeInsurance = function() {
		$scope.questions.currentLifeInsurancePolicies.push({existingLifeInsPolicyName: '', existingLifeInsSumInsured: '', existingLifeInsYrlyPrem: ''});

	}

	$scope.removeLifeInsurance = function(index) {
		// var counter = $scope.lifeInsuranceFieldCounter++;
		$scope.questions.currentLifeInsurancePolicies.splice(index, 1);
		
		if ($scope.questions.currentLifeInsurancePolicies.length == 0) {

			$scope.questions.alreadyMadeLifeInsInvestment = 'no';
			$scope.questions.currentLifeInsurancePolicies.push({existingLifeInsPolicyName: '', existingLifeInsSumInsured: '', existingLifeInsYrlyPrem: ''});

		}
		
	}

	$scope.questions.existingHealthInsPolicies = [{existingHealthInsName: '', existingHealthInsCover: '', existingHealthInsYrlyPrem: '', dependents: { self: true, spouse: false, children: false, parents: false }}];

	$scope.addHealthInsurance = function() {

		$scope.questions.existingHealthInsPolicies.push({existingHealthInsName: '', existingHealthInsCover: '', existingHealthInsYrlyPrem: '', dependents: { self: true, spouse: false, children: false, parents: false }});

	}

	$scope.removeHealthInsurance = function(index) {
		
		$scope.questions.existingHealthInsPolicies.splice(index, 1);
		
		if ($scope.questions.existingHealthInsPolicies.length == 0) {

			$scope.questions.alreadyHaveHealthInsurance = 'no';
			$scope.questions.existingHealthInsPolicies.push({existingHealthInsName: '', existingHealthInsCover: '', existingHealthInsYrlyPrem: '', dependents: { self: true, spouse: false, children: false, parents: false }});

		}
		
	}



	$scope.questions.currentTaxInvestments = [{existingTaxInvType: '', existingTaxInvAmt: '', comments: ''}];
	$scope.addTaxInvestOption = function() {
		$scope.questions.currentTaxInvestments.push({existingTaxInvType: '', existingTaxInvAmt: '', comments: ''});

	}

	$scope.removeTaxInvestOption = function(index) {
		// var counter = $scope.lifeInsuranceFieldCounter++;
		$scope.questions.currentTaxInvestments.splice(index, 1);
		
		if ($scope.questions.currentTaxInvestments.length == 0) {

			// $scope.questions.alreadyMadeTaxInvestment = 'no';
			$scope.detailedDescForAlreadyMadeTaxInvestment = false;
			$scope.questions.currentTaxInvestments.push({existingTaxInvType: '', existingTaxInvAmt: '', comments: ''});

		}
		
	}

	$scope.showHideSubtext = function(index) {
		// .ng-hide-add 
		// $('.subtext').addClass('ng-hide ng-hide-add');
		// $('#helptypeSubtext_'+index).removeClass('ng-hide');
		// $('#helptypeSubtext_'+index).addClass('ng-hide-remove');



		for ( i=0; i<$scope.questions.financialHelpTypes.length; i++) {
			if (index != i) {
				$('#helptypeSubtext_'+i).addClass('ng-hide');
			}
		}
	}


	$scope.submitForm = function(questions) {
		console.log(questions);
		// $scope.submitted = true;
		sharedProperties.setSubmitted(true);
		sharedProperties.setAnnualSalary($scope.questions.annualSalary);
		$state.go('recommendations');
		// $scope.questionnaire.save(questions);


		// $('#goToReco').click();
		
		// $scope.data = {
		// 	boldTextTitle: "Congratulations! " + $scope.questions.username,
		// 	textAlert : "Check your email for your tax saving recommendation.",
		// 	mode : 'success'
		// };

		// $scope.$modalInstance = $modal.open({
		// 	scope: $scope,
		// 	templateUrl: 'client/templates/alertTemplate.ng.html',
		// 	size: 'lg',
		// 	backdrop: 'static',
		// 	keyboard: false
		// });

		// $scope.ok = function(){
		// 	$scope.$modalInstance.close();
		// 	$('div.modal').removeClass('fade').addClass('hidden');
  //     		$('body').removeClass('modal-open');
  //     		$('.modal-backdrop').remove();
  //     		$('#goToPageTop').click();
		// }
	};


});

angular.module('antkarma').directive ('numbersOnly', function() {
	return {


		require: 'ngModel',
		link: function(scope, element, attrs, modelCtrl) {
			modelCtrl.$parsers.push(function(inputValue) {

			var transformedInput = inputValue;
			var transformedInput = inputValue ? inputValue.replace(/[^\d.-]/g,'') : null;

			if (transformedInput !== null ) {
				if (transformedInput.split('.').length > 2) {
					transformedInput = transformedInput.substring(0, transformedInput.length - 1);	
				}
				//Add thousand seperator

				var regEx = new RegExp('(-?[0-9]+)([0-9]{3})'),
					arrNum = [],
					thousandSeparator = ",",
					decimalSeparator = ".";
					arrNum = transformedInput.split(decimalSeparator);
					// let's be focused first only on the integer part
					transformedInput = arrNum[0];

					while (regEx.test(transformedInput)) {
						transformedInput = transformedInput.replace(regEx, '$1' + thousandSeparator + '$2');
					}
					// time to add back the decimal part
					if (arrNum.length > 1) {
						transformedInput = transformedInput + arrNum[1];
					}

			}
				if (transformedInput != inputValue) {

					modelCtrl.$setViewValue(transformedInput);
					modelCtrl.$render();
				}

				return transformedInput;
			});
		}
	}

});

// Recommendation Controller : RecommendationCtrl

angular.module('antkarma').controller('RecommendationCtrl', function($scope, $modal, $meteor, $timeout, sharedProperties) {


	// $scope.coverageAmount = sharedProperties.getAnnualSalary() * 10;
	$scope.coverageAmount = 10000000;
	$scope.sliderValue = 1;
	var delayRefresh;

	$scope.updateLIRecos = function() {
		if (delayRefresh) $timeout.cancel(delayRefresh);

		delayRefresh = $timeout(function() {
			if($scope.sliderValue == 0) {
				
				$scope.displayCoverageAmount = "50 Lacs";
				$scope.coverageAmount = "5000000";

			} else if ($scope.sliderValue == 1) {
				$scope.displayCoverageAmount = "1 Crore";
				$scope.coverageAmount = "10000000";
			} else {
				$scope.displayCoverageAmount = "2 Crores";
				$scope.coverageAmount = "20000000";
			}

			 
	            $scope.query = {sumAssured: $scope.coverageAmount};
	        
			
			console.log('Query: ' + $scope.query);			

		}, 1000);

		

	}

		$scope.lifeInsRecos	 = $meteor.collection(function(){
        	return LifeInsurances.find($scope.getReactively('query'));
     	});
 //    delayRefresh = $timeout(function() {
	// }, 1000);
	// $scope.$apply ();
	
});


angular.module('antkarma').service('sharedProperties', function() {
	var submitted = false;
	var annularSalary = 0;

	return {
		getSubmitted: function() {
			return submitted;
		},

		setSubmitted: function(value) {
			submitted = value;
		},

		getAnnualSalary: function() {
			return annularSalary;
		},

		setAnnualSalary: function(value) {
			annularSalary = Number(value);
		}
	}

});

angular.module('antkarma').animation('.slide', function () {
    return {
        enter: function (element, done) {
          console.log('enter');
            element.hide().slideDown(1500, done);
        },
        move: function(element, done) {
            console.log('move');
            element.slideUp(1500, done);
        },
        leave: function(element, done) {
          console.log('slide up', element.text())
            element.slideUp(1200, done);
        }
    };
    
});

angular.module('antkarma').animation('.if-element', function() {
  return {
    enter : function(element, done) {
      element.css('opacity',0);
      jQuery(element).animate({
        opacity: 1
      },1500, done);

      return function(isCancelled) {
        if(isCancelled) {
          jQuery(element).stop();
        }
      }
    },
    leave : function(element, done) {
      element.css('opacity', 1);
      jQuery(element).animate({
        opacity: 0
      },1500, done);

      return function(isCancelled) {
        if(isCancelled) {
          jQuery(element).stop();
        }
      }
    }
  }
});

