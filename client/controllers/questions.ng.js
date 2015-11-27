angular.module('myApp').controller('QuestionnaireCtrl', function($scope, $modal, $meteor, $state, $rootScope, sharedProperties) {
	$scope.$on("$routeChangeSuccess", function (scope, next, current) {
        $scope.transitionState = "active"
    });
    
	$scope.questionnaire = $meteor.collection(Questionnaire);

	// $meteor.session('questions').bind(scope, quesions);

	var questions = Session.get('questions');
	if (! questions) {
		$scope.questions = {};
		$scope.questions.username = '';
		$scope.submitted = sharedProperties.getSubmitted();
		$scope.lifeInsuranceFieldCounter = 0;
		$scope.questions.currentOutStandingLoans = [];
		$scope.questions.currentOutStandingLoans.push({existingLoanType: '', existingLoanUnpaidAmt: '', comments:''});
	
	} else {
		$scope.questions = questions;
	}
	

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


	$scope.addOutstandingLoanDetails = function() {
		
		$scope.questions.currentOutStandingLoans.push({existingLoanType: '', existingLoanUnpaidAmt: '', comments:''});

	}

	$scope.removeOutstandingLoan = function(index) {
		$scope.questions.currentOutStandingLoans.splice(index, 1);
		
		if ($scope.questions.currentOutStandingLoans.length == 0) {

			$scope.questions.outstandingLoans = 'no';
			$scope.questions.currentOutStandingLoans.push({existingLoanType: '', existingLoanUnpaidAmt: '', comments:''});

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


		if ($scope.questions.financialHelpTypes[index].checked == true) {

			$('#helpTypeAccordion').find('.collapse.in').collapse('hide');
			$('#collapseHelpType_'+index).collapse('toggle');	
		} else {
			$('#collapseHelpType_'+index).collapse('hide');				
		}
		
	}

	
	
	$scope.submitForm = function(questions) {
		var randomId = Random.id;
		console.log(JSON.stringify(questions));
		sharedProperties.setId(randomId);

		console.log('Random id : ' + randomId);
		Session.set('questions', $scope.questions);
		sharedProperties.setQuestionnaire($scope.questions);
		sharedProperties.setSubmitted(true);
		// sharedProperties.setAnnualSalary($scope.questions.annualSalary);
		// sharedProperties.setAge($scope.questions.currentAge);
		// sharedProperties.setSmokerStatus($scope.questions.smoker);
		// sharedProperties.setGender($scope.questions.gender);
		// sharedProperties.setUsername($scope.questions.username);
		// sharedProperties.setPlanToInvest($scope.questions.taxInvestmentAmount);
		// sharedProperties.setCurrentLifeInsurance(questions.currentLifeInsurancePolicies);

		$meteor.call('submitQuestionnaire', angular.copy($scope.questions)).then(
	      function(data){
	        console.log('Questionnaire submitted succesfully', new Date().getTime() / 1000);
	        // $scope.sbiDataSpinner = false;
	        
	       	var computedRiskScore = data;	
	       	console.log('computedRiskScore : ' + computedRiskScore);
	       	// sharedProperties.setRiskScore(computedRiskScore);
	       	$rootScope.riskScore = computedRiskScore;
	       	// Session.set('riskScore', computedRiskScore);

	        
	      },
	      function(err){
	        console.log('Questionnaire submission failed', err);
	      }
	    );

	    $rootScope.submitted = true;
		$state.go('recommendations');	
		
		
	};


	// questionnaire navigation between tabs
	$('.next').click(function(){
    	var nextId = $(this).parents('.tab-pane').next().attr("id");
    	$('[href=#'+nextId+']').tab('show');
    	return false;
  	});

	$('.prev').click(function(){
		var prevId = $(this).parents('.tab-pane').prev().attr("id");
		$('[href=#'+prevId+']').tab('show');
		return false;
	});
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
      //update progress
      var step = $(e.target).data('step');
      var percent = (parseInt(step) / 11) * 100;
      $('.progress-bar').css({width: percent + '%'});
      $('.progress-bar').text("Step " + step + " of 11");
      //e.relatedTarget // previous tab
	});

  	$('.first').click(function(){
    	$('[href=#step1]').tab('show');
  	});

  	$( "#currentAge" ).validate({
  		rules: {
    	field: {
      	required: true,
      	range: [18, 65]
    }
  }
});


});