
angular.module('antkarma', ['angular-meteor', 'ngAnimate','ui.router',  'ui.bootstrap', 'ngMessages']);


angular.module('antkarma').controller('QuestionnaireCtrl', function($scope, $modal, $meteor) {

	// $scope.fullQuestionnaire = [];
	// $scope.activeQuestionnaire = [];
	
	$scope.questionnaire = $meteor.collection(Questionnaire);

	$scope.questions = {};
	$scope.questions.username = '';
	$scope.questions.alreadyInvestedPPFAmount = 'no';
	$scope.questions.alreadyMadeLifeInsInvestment = 'no';
	$scope.questions.alreadyMadeHealthInsInvestment = 'no';
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


});

