
angular.module('antkarma', ['angular-meteor', 'ngAnimate','ui.router',  'ui.bootstrap', 'ngMessages', 'fcsa-number']);


angular.module('antkarma').controller('QuestionnaireCtrl', function($scope, $modal, $meteor) {

	// $scope.fullQuestionnaire = [];
	// $scope.activeQuestionnaire = [];
	
	$scope.questionnaire = $meteor.collection(Questionnaire);

	$scope.questions = {};
	$scope.questions.username = '';
	$scope.questions.alreadyInvestedPPFAmount = 'no';
	$scope.questions.alreadyMadeLifeInsInvestment = 'no';
	$scope.questions.alreadyMadeHealthInsInvestment = 'no';
	$scope.questions.alreadyHaveHealthInsurance = 'no';
	$scope.questions.alreadyMadeTaxInvestment = 'no';
	$scope.onlyNumbers = /^\d+$/;
	$scope.submitted = false;
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

	
	
	// var outstandingLoanTemplate = {existingLoanType: '', existingLoanUnpaidAmt: ''};
	

	$scope.questions.currentOutStandingLoans = [];
	$scope.questions.currentOutStandingLoans.push({existingLoanType: '', existingLoanUnpaidAmt: ''});

	$scope.addOutstandingLoanDetails = function() {
		
		$scope.questions.currentOutStandingLoans.push({existingLoanType: '', existingLoanUnpaidAmt: ''});

	}

	$scope.removeOutstandingLoan = function(index) {
		$scope.questions.currentOutStandingLoans.splice(index, 1);
		
		if ($scope.questions.currentOutStandingLoans.length == 0) {

			$scope.questions.outstandingLoans = 'no';
			$scope.questions.currentOutStandingLoans.push({existingLoanType: '', existingLoanUnpaidAmt: ''});

		}
		
	}

	$scope.questions.currentLifeInsurancePolicies = [{existingLifeInsPolicyName: '', existingLifeInsSumInsured: '', existingLifeInsYrlyPrem: ''}];
	$scope.addLifeInsurance = function() {
		// var counter = $scope.lifeInsuranceFieldCounter++;

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
		// var counter = $scope.lifeInsuranceFieldCounter++;

		$scope.questions.existingHealthInsPolicies.push({existingHealthInsName: '', existingHealthInsCover: '', existingHealthInsYrlyPrem: '', dependents: { self: true, spouse: false, children: false, parents: false }});

	}

	$scope.removeHealthInsurance = function(index) {
		// var counter = $scope.lifeInsuranceFieldCounter++;
		$scope.questions.existingHealthInsPolicies.splice(index, 1);
		
		if ($scope.questions.existingHealthInsPolicies.length == 0) {

			$scope.questions.alreadyHaveHealthInsurance = 'no';
			$scope.questions.existingHealthInsPolicies.push({existingHealthInsName: '', existingHealthInsCover: '', existingHealthInsYrlyPrem: '', dependents: { self: true, spouse: false, children: false, parents: false }});

		}
		
	}


	$scope.addThousandSeperator = function(str) {
		console.log('addThousandSeparator fired');
  		var sRegExp = new RegExp('(-?[0-9]+)([0-9]{3})'),
		sValue = str + "", // to be sure we are dealing with a string
		arrNum = [];
		var thousandSeparator = ","; 
		var decimalSeparator = "."; 
		arrNum = sValue.split(decimalSeparator);
		// let's be focused first only on the integer part
		sValue = arrNum[0];
		while(sRegExp.test(sValue)) {
			sValue = sValue.replace(sRegExp, '$1' + thousandSeparator + '$2');
		}
		// time to add back the decimal part
		if (arrNum.length > 1) {
			sValue = sValue + decimalSeparator + arrNum[1];
		}
		$scope.amount  = sValue;
	}


	$scope.submitForm = function(questions) {
		console.log(questions);
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


})
.directive ('numbersOnly', function() {
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



			// Add thousand seperator
			// console.log('Adding thousand seperator');
			// transformedInput = scope.addThousandSeparator(transformedInput);
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