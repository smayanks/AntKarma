
angular.module('antkarma', ['angular-meteor', 'ngAnimate','ui.router',  'ui.bootstrap', 'ngMessages']);




angular.module('antkarma').controller('QuestionnaireCtrl', function($scope, $modal, $meteor, $state, sharedProperties) {

	$scope.questionnaire = $meteor.collection(Questionnaire);
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
		console.log(JSON.stringify(questions));

		sharedProperties.setSubmitted(true);
		sharedProperties.setAnnualSalary($scope.questions.annualSalary);
		sharedProperties.setAge($scope.questions.currentAge);

		$meteor.call('submitQuestionnaire',  angular.copy($scope.questions));
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


	// questionnaire navigation between tabs
	$('.next').click(function(){
    	var nextId = $(this).parents('.tab-pane').next().attr("id");
    	console.log('nextId : ' + nextId);
    	$('[href=#'+nextId+']').tab('show');
    	return false;
  	});

	$('.prev').click(function(){
		var prevId = $(this).parents('.tab-pane').prev().attr("id");
		console.log('prevId : ' + prevId);
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

	// Subscribing to life_insurances
	$scope.$meteorSubscribe('lifeInsRecos');




	$scope.isArrowDown = true;

	$scope.initialize = function() {
		console.log('initialize called');
		$('table tbody tr:first').addClass('reco-selected');
		$('table tbody tr button.select-li-reco').text("Select");
		$('table tbody tr:first button.select-li-reco').text("Selected");

		$('table tbody tr').not(':first').hide();

	}	

	$scope.initialize();

	$scope.showAllLIReco = function() {
		$('table tbody tr').not(':first').fadeToggle("slow");
	}

	$scope.selectLI = function(event, index) {

		$('table tbody tr button.select-li-reco').text("Select");
		
		var element = event.target;
		element.textContent = "Selected";
		if (index == 0) {

		}
		
		$("table tr").removeClass("reco-selected");
		$(element).closest("tr").addClass("reco-selected");
	}

	// Logic for recommended coverage amount is annual salary * 15
	var recommendedCoverageAmount = sharedProperties.getAnnualSalary() * 15;
	
	// Age is requried to get query life_insrances 
	// $scope.age = sharedProperties.getAge();
	$scope.age = '32';  //hardcoded temporarily to 32
	// $scope.sliderValue = 2;
	// $scope.policyTermSlider = 1;
	$scope.displayCoverageAmount = "50 Lacs";
	$scope.displayPolicyTerm = "25 yrs";
	$scope.coverageAmount = "10000000";

	// query life_insurances based on age of user
    $scope.query = {age: $scope.age, sum_assured_in_lacs: "50", payment_term: "25"};		

    console.log('Query: ' + $scope.query);
    $scope.lifeInsRecos	 = $meteor.collection(function(){
	    	return LifeInsurances.find($scope.getReactively('query'));
	});

	// $scope.premium = $scope.lifeInsRecos.premium;
		
	// $('.table-reload').fadeOut( "slow" );



    console.log('Premium value: ' + $scope.premium);
    var displayCoverageAmountArr = ["25 Lacs", "50 Lacs", "1 Crore"];
    var actualCoverageAmountArr = ["25", "50", "100"];
    var displayPolicyTermArr = ["20 yrs", "25 yrs", "30 yrs"];
    var actualPolicyTermArr = ["20", "25", "30"];


    //Setting recommended values of slider
    var min = 0, max = 2;
	$("#sliderLabel").text("50 Lacs");
	$("#sliderLabel").css("margin-left", (1-min)/(max-min)*100+"%");
	$("#sliderLabel").css("left", "-25px");
	$("#policyTermSliderLabel").text("25 yrs");
	$("#policyTermSliderLabel").css("margin-left", (1-min)/(max-min)*100+"%");
	$("#policyTermSliderLabel").css("left", "-25px");
	$scope.isRecommended = true;
	$scope.policyTermSlider = 1;

	var delayRefresh;
    $scope.updateLIRecos = function() {

		$scope.isRecommended = false;		
		console.log('JSON : ' + JSON.stringify($scope.lifeInsRecos));
		console.log('SLider value : ' + $scope.sliderValue);

		//slider related attributes

	    $("#sliderLabel").text(displayCoverageAmountArr[$scope.sliderValue]);
    	$("#sliderLabel").css("margin-left", ($scope.sliderValue-min)/(max-min)*100+"%");
    	$("#sliderLabel").css("left", "-25px");

	    $("#policyTermSliderLabel").text(displayPolicyTermArr[$scope.policyTermSlider]);
    	$("#policyTermSliderLabel").css("margin-left", ($scope.policyTermSlider-min)/(max-min)*100+"%");
    	$("#policyTermSliderLabel").css("left", "-25px");    	

    	$scope.displayCoverageAmount = displayCoverageAmountArr[$scope.sliderValue];
    	$scope.displayPolicyTerm = displayPolicyTermArr[$scope.policyTermSlider];

    	//Change query parameters based on change in slider values

    	if (delayRefresh) {
			console.log('Canceling delay refresh');
			$timeout.cancel(delayRefresh);	
		} 
		
		$('.table-rel').fadeOut( "slow" );

		delayRefresh = $timeout(function() {
			$('.table-rel').fadeIn( "slow" );
		}, 300);

    	$scope.query = {age: $scope.age, sum_assured_in_lacs: actualCoverageAmountArr[$scope.sliderValue], payment_term: actualPolicyTermArr[$scope.policyTermSlider]};	





	};




});


angular.module('antkarma').service('sharedProperties', function() {
	var submitted = false;
	var annularSalary = 0;
	var age;

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
		},

		getAge: function() {
			return age;
		},

		setAge: function(value) {
			age = value;
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

angular.module('antkarma').animation('.table-reload', function () {
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

