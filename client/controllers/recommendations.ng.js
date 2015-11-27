// Recommendation Controller : RecommendationCtrl

angular.module('myApp').controller('RecommendationCtrl', function($scope, $modal, $state, $meteor, $timeout,$rootScope, sharedProperties) {

	// console.log('rootScope.submitted : ' + $rootScope.submitted);
	if ( typeof $rootScope.submitted == "undefined" || !$rootScope.submitted) {
		$state.go('home');	
		return;
	}
		
	var MIN_COVERAGE_AMOUNT = 2500000;
	var MAX_COVERAGE_AMOUNT = 50000000;
	var MIN_POLICY_TERM = 20;
	var MAX_POLICY_TERM = 40;
	var TAX_SAVING_LIMIT = 150000;
	var DEFAULT_RISK_SCORE = 6;
	var DEFAULT_USERNAME = "Happy Saver";
	var DEFAULT_COVERAGE_AMOUNT = 5000000;
	var COVERAGE_AMOUNT_FACTOR = 10;
	var MIN_COVERAGE_AMOUNT = 1000000;
	var totalTaxSavingAmount = TAX_SAVING_LIMIT;
	var id = sharedProperties.getId();

	console.log('Value of id in reco: ' + id);
	$scope.minCoverageAmount = MIN_COVERAGE_AMOUNT;
	$scope.maxCoverageAmount = MAX_COVERAGE_AMOUNT;
	$scope.minPolicyTerm = MIN_POLICY_TERM;
	$scope.maxPolicyTerm = MAX_POLICY_TERM;
	$scope.hideLifeInsranceReco = false;
	$scope.showLifeIns = true;
	
	$scope.$meteorSubscribe('elss');
	$scope.elss	 = $meteor.collection(function(){
	    	return ELSS.find({});
	});
	var RECOMMENDED_LIFE_INSURANCE =  "hdfcData";
	var selectedLifeInsurance = RECOMMENDED_LIFE_INSURANCE;

	var questions = sharedProperties.getQuestionnaire();

	var username = questions.username;
	if (typeof username == "undefined") {
		$scope.username = DEFAULT_USERNAME;
	} else {
		$scope.username = username;
	}



	function compute_coverage_amount() {
		var coverageAmount = 0;
		if (questions.annualSalary) {
			coverageAmount = (Number(questions.annualSalary.replace(/,/g,'')) * COVERAGE_AMOUNT_FACTOR) + '';	
		} else {
			console.log('Error no annual salary found');
			// $scope.coverageAmount = DEFAULT_COVERAGE_AMOUNT + '';
		}
		if (coverageAmount == "0") {
			coverageAmount = DEFAULT_COVERAGE_AMOUNT + '';
		}
		console.log('Returning compute_coverage_amount : ' + coverageAmount);
		return coverageAmount;
	}

	$scope.coverageAmount = compute_coverage_amount();


	//Get the life insurance policy details if user has already invested money

	function check_for_life_insurance(coverage) {
		var alreadyInvestedLifeInsurance = 0;

		if (questions.currentLifeInsurancePolicies) {
			var currentLIArray = [];

			currentLIArray = questions.currentLifeInsurancePolicies;
			var existingSumAssured = 0;
			for ( i = 0; i < currentLIArray.length; i++) {
				var amount = currentLIArray[i].existingLifeInsSumInsured;
				console.log('value of amount : ' + amount);
				if (amount) {
					amount = Number(amount.replace(/,/g,''))
				}
				existingSumAssured += amount;
			}
			console.log('existingSumAssured : ' + existingSumAssured);
			var amountDiff = coverage - existingSumAssured;

			console.log('amountDiff : ' + amountDiff);

			if (amountDiff > MIN_COVERAGE_AMOUNT) {
				$scope.coverageAmount = amountDiff;
				return true;
			} else {
				return false
			}

		}

	}

	$scope.showLifeIns = check_for_life_insurance($scope.coverageAmount);

	var age = questions.currentAge;
	if (typeof age == "undefined") age = "32";
	
	var smoker = questions.smoker;
	if (typeof smoker == "undefined") smoker = "no";
	
	var gender = questions.gender;
	if (typeof gender == "undefined" ) gender = "male";

	var paymentTerm = "25";
	$scope.paymentTerm = paymentTerm;
	var query = {age: age, sum_assured: $scope.coverageAmount, payment_term: $scope.paymentTerm};
	var hdfcQuery = {age: age, sum_assured: $scope.coverageAmount, payment_term: $scope.paymentTerm, gender: gender, smoker: smoker};


	function set_slider_attributes(sliderId, value, min, max) {
    	// $(sliderId).text(text);
		$(sliderId).css("margin-left", (value-min)/(max-min)*100+"%");
		$(sliderId).css("left", "-25px");	
    }

    // Setting initial values of slider attributes based on recommendations
    set_slider_attributes("#coverageAmountSlider", $scope.coverageAmount, $scope.minCoverageAmount , $scope.maxCoverageAmount );
    set_slider_attributes("#policyTermSlider", $scope.paymentTerm, $scope.minPolicyTerm , $scope.maxPolicyTerm);


	function refresh_life_insurance(query, hdfcQuery) {

		$scope.sbiDataSpinner = true;
		$scope.hdfcDataSpinner = true;
		$scope.licDataSpinner = true;
		$scope.iciciDataSpinner = true;
		$scope.noSBIdata = false;
		$scope.noHDFCdata = false;
		$scope.noLICdata = false;
		$scope.noICICIdata = false;
		$meteor.call('get_sbi_data', query).then(
	      function(data){
	        // console.log('success sbi', new Date().getTime() / 1000);
	        $scope.sbiDataSpinner = false;
	        if (typeof data == "undefined"){
	        	$scope.noSBIdata = true;
	        } else {
	        	$scope.sbiData = data;	
	        }
	      },
	      function(err){
	        console.log('sbi failed', err);
	      }
	    );

		$meteor.call('get_lic_data', query).then(
	      function(data){
	        // console.log('success lic', new Date().getTime() / 1000);
	        $scope.licDataSpinner = false;
	        if (typeof data == "undefined"){
	        	$scope.noLICdata = true;
	        } else {
	        	$scope.licData = data;
	        }
	      },
	      function(err){
	        console.log('lic failed', err);
	      }
	    );


		$meteor.call('get_icici_data', query).then(
	      function(data){
	        // console.log('success icici', new Date().getTime() / 1000);
	        
	        $scope.iciciDataSpinner = false;
	        if (typeof data == "undefined"){
	        	$scope.noICICIdata = true;
	        } else {
	        	$scope.iciciData = data;
	        }
	      },
	      function(err){
	        console.log('icici failed', err);
	      }
	    );

	    $meteor.call('get_hdfc_policy_info').then(
	      function(data){
	        // console.log('success hdfc policy info', new Date().getTime() / 1000);
	        if (typeof data == "undefined"){
	        	$scope.noHDFCpolicyInfo = true;
	        } else {
	        	$scope.hdfcData = data;
	        	// compute_elss_ppf_details();
	        }
	      },
	      function(err){
	        console.log('failed get_hdfc_policy_info', err);
	      }
	    );

		$meteor.call('get_hdfc_data', hdfcQuery).then(
	      function(data){
	        // console.log('success hdfc', new Date().getTime() / 1000);
	        $scope.toggleLifeInsurance();
	        $scope.hdfcDataSpinner = false;
	        if (typeof data == "undefined"){
	        	$scope.noHDFCdata = true;
	        } else {
	        	// $scope.hdfcData = data;
	        	var premiumBeforeTax = ($scope.coverageAmount * data.mortality_rate_per_1000)/1000;
    			var taxes = premiumBeforeTax * 0.145;  //Assuming 14.5 in taxes
    			var premium = Math.ceil(premiumBeforeTax + taxes);
    			// console.log('HDFC Premium : ' + premium);
    			$scope.hdfcData.premium = premium;
    			$scope.hdfcData.sum_assured = $scope.coverageAmount;
    			$scope.hdfcData.payment_term = data.policy_term;
	        	compute_elss_ppf_details();
	        }
	      },
	      function(err){
	        console.log('failed', err);
	      }
	    );
	}
	if ($scope.showLifeIns) {
		refresh_life_insurance(query, hdfcQuery);	
	} else {
		compute_elss_ppf_details();
	}
	

    $scope.update_life_ins_reco = function(event) {
	    
	    set_slider_attributes("#coverageAmountSlider", $scope.coverageAmount, $scope.minCoverageAmount , $scope.maxCoverageAmount );
    	set_slider_attributes("#policyTermSlider", $scope.paymentTerm, $scope.minPolicyTerm , $scope.maxPolicyTerm);
    	
    	$scope.select_life_insurance(RECOMMENDED_LIFE_INSURANCE);
    	
    	query = {age: age, sum_assured: $scope.coverageAmount, payment_term: $scope.paymentTerm};
		hdfcQuery = {age: age, sum_assured: $scope.coverageAmount, payment_term: $scope.paymentTerm, gender: gender, smoker: smoker};
		refresh_life_insurance(query, hdfcQuery);

		compute_elss_ppf_details();

   	};

   	// Show only recommended content of initial page load
	$scope.toggleLifeInsurance = function() {

		if ($scope.hideLifeInsranceReco === false) {
			$scope.hideLifeInsranceReco = true;
			$('.li-insurance-content').hide();
			$('.reco-selected').show();
		} else {
			$scope.hideLifeInsranceReco = false;
			$('.li-insurance-content').show();

		}
		// $scope.hideLifeInsranceReco = $scope.hideLifeInsranceReco === false ? true : false;


	}

	$scope.select_life_insurance = function(id) {

		$("button.select-li-reco").text("Select");
		$("#" + id).find("button.select-li-reco").text("Selected");

		$(".li-insurance-content").removeClass("reco-selected");
		$("#" + id).addClass("reco-selected");		
		selectedLifeInsurance = id;
		compute_elss_ppf_details();
	}

	$scope.openDialog = function() {
		$( "#dialog" ).dialog({
	      autoOpen: false,
	      show: {
	        effect: "blind",
	        duration: 1000
	      },
	      hide: {
	        effect: "explode",
	        duration: 1000
	      }
    	});
	}

	function compute_elss_ppf_details() {

		if (questions.taxInvestmentAmount) {
			var planToInvest = Number(questions.taxInvestmentAmount.replace(/,/g,''));	
		} else {
			console.log('Error no plan to invest amount found - returning from compute_elss_ppf_details');
			return;
			// planToInvest = 
		}
		var premium = 0;
		if ($scope[selectedLifeInsurance] && $scope[selectedLifeInsurance].premium) {
			premium = Number($scope[selectedLifeInsurance].premium);
			console.log('Number($scope[selectedLifeInsurance].premium) : ' + premium)
		}
		console.log('Number($scope[selectedLifeInsurance].premium) : ' + premium)
		recoAmountForELSSandPPF = planToInvest - premium;

		if (! $scope.riskScore) {
			// computeScore(questions.currentAge, questions.investmentFocusOn,questions.whenMarketVolatile);
			$meteor.call('get_risk_score', questions.currentAge, questions.investmentFocusOn, questions.whenMarketVolatile).then(
		      function(data){
		      		console.log("assigning risk score from server: " + data);
		        	$scope.riskScore = data;
		        	compute_ppf_elss_percent($scope.riskScore);
		      },
		      function(err){
		        console.log('Error in getting risk score', err);
		      }
		    );
			
		} else {
			
			compute_ppf_elss_percent($scope.riskScore);
			$scope.displayRiskScore = $scope.riskScore;
			console.log('Inside else part $scope.displayRiskScore  : ' + $scope.displayRiskScore );
		}
		

	}

	function compute_ppf_elss_percent(score) {
		var ppf, elss;
		if (score <=2 ) {
			ppf = 0.8;
			elss = 0.2;
		} else if (score > 2 && score <= 4) {
			ppf = 0.6;
			elss = 0.4;
		} else if (score > 4 && score <= 6 ) {
			ppf = 0.5;
			elss = 0.5;
		} else if (score > 6 && score <= 8 ) {
			ppf = 0.4;
			elss = 0.6;
		} else if (score > 8) {
			ppf = 0.2;
			elss = 0.8;
		}

		var ppfELSS =  {"ppf" : ppf, "elss" : elss};

		console.log('ppfELSS : ' + JSON.stringify(ppfELSS));
		//Rounding up the amount to the nearest multiple of 1000
		var recoPPFamount = Math.ceil((recoAmountForELSSandPPF * ppfELSS.ppf)/1000)*1000 ;
		$scope.ppfAmount = recoPPFamount;
		var recoELSSamount = Math.ceil((recoAmountForELSSandPPF * ppfELSS.elss)/1000)*1000;
		$scope.elssAmount = recoELSSamount;	
		$scope.elssSliderValue = recoELSSamount;
		$scope.elss_investment_amount = Math.ceil($scope.elssAmount/2);
		$scope.displayMaxELSSPPFAmount =  Math.ceil(recoAmountForELSSandPPF);
		$scope.displayRiskScore = $scope.riskScore;
	}


});






