angular.module('myApp').controller('QuestionnaireCtrl', function($scope, $modal, $meteor, $state, $rootScope, ngDialog, sharedProperties) {
	$scope.$on("$routeChangeSuccess", function (scope, next, current) {
        $scope.transitionState = "active"
    });
    
	$scope.questionnaire = $meteor.collection(Questionnaire);

	var questions = Session.get('questions');
	if (! questions) {
		$scope.questions = {};
		$scope.questions.username = '';
		$scope.submitted = sharedProperties.getSubmitted();
		$scope.lifeInsuranceFieldCounter = 0;
		$scope.questions.currentOutStandingLoans = [];
		$scope.questions.currentOutStandingLoans.push({existingLoanType: '', existingLoanUnpaidAmt: '', comments:''});
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
		];
		$scope.questions.currentLifeInsurancePolicies = [{existingLifeInsPolicyName: '', existingLifeInsSumInsured: '', existingLifeInsYrlyPrem: ''}];
		$scope.questions.alreadyMadeElSSInvestmentAmt = 0;
		$scope.questions.alreadyMadeLIInvestmentAmt = 0;
		$scope.questions.alreadyMadePPFInvestmentAmt = 0;
		$scope.questions.alreadyMadeOtherInvestmentAmt = 0;

	} else {
		$scope.questions = questions;
	}
	

	
	// if ($scope.questions.alreadyMadeTaxInvestmentAmount == '' || $scope.questions.alreadyMadeTaxInvestmentAmount == null) {
	// 	$scope.questions.alreadyMadeTaxInvestmentAmount = 0;	
	// }
	
	
	$scope.resetOutStandingLoans = function() {
		$scope.questions.currentOutStandingLoans = [];
		$scope.questions.currentOutStandingLoans.push({existingLoanType: '', existingLoanUnpaidAmt: '', comments:''});
	}

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
		

		Session.set('questions', $scope.questions);
		sharedProperties.setQuestionnaire($scope.questions);
		sharedProperties.setSubmitted(true);


		$meteor.call('submitQuestionnaire', angular.copy($scope.questions)).then(
	      function(data){

	        // $scope.sbiDataSpinner = false;
	        
	       	var computedRiskScore = data;	

	       	// sharedProperties.setRiskScore(computedRiskScore);
	       	$rootScope.riskScore = computedRiskScore;
	       	// Session.set('riskScore', computedRiskScore);

	        
	      },
	      function(err){

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
      var percent = (parseInt(step) / 7) * 100;
      $('.progress-bar').css({width: percent + '%'});
      $('.progress-bar').text("Step " + step + " of 7");
      //e.relatedTarget // previous tab
	});

  	$('.first').click(function(){
    	$('[href=#step1]').tab('show');
  	});

  	$('[data-toggle="tooltip"]').tooltip();

});