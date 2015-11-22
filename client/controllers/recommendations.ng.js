// Recommendation Controller : RecommendationCtrl

angular.module('antkarma').controller('RecommendationCtrl', function($scope, $modal, $meteor, $timeout, sharedProperties) {


	var MIN_COVERAGE_AMOUNT = 2500000;
	var MAX_COVERAGE_AMOUNT = 50000000;
	var MIN_POLICY_TERM = 20;
	var MAX_POLICY_TERM = 40;
	var TAX_SAVING_LIMIT = 150000;
	var totalTaxSavingAmount = TAX_SAVING_LIMIT;
	$scope.minCoverageAmount = MIN_COVERAGE_AMOUNT;
	$scope.maxCoverageAmount = MAX_COVERAGE_AMOUNT;
	$scope.minPolicyTerm = MIN_POLICY_TERM;
	$scope.maxPolicyTerm = MAX_POLICY_TERM;
	$scope.hideLifeInsranceReco = false;
	
	$scope.$meteorSubscribe('elss');
	$scope.elss	 = $meteor.collection(function(){
	    	return ELSS.find({});
	});
	var RECOMMENDED_LIFE_INSURANCE =  "hdfcData";
	var selectedLifeInsurance = RECOMMENDED_LIFE_INSURANCE;

	$scope.coverageAmount = Number(sharedProperties.getAnnualSalary()) * 15;

	if ($scope.coverageAmount == 0) $scope.coverageAmount = "5000000";

	var age = sharedProperties.getAge();
	if (typeof age == "undefined") age = "32";
	
	var smoker = sharedProperties.getSmokerStatus();
	if (typeof smoker == "undefined") smoker = "no";
	
	var gender = sharedProperties.getGender();
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
	        console.log('success sbi', new Date().getTime() / 1000);
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
	        console.log('success lic', new Date().getTime() / 1000);
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
	        console.log('success icici', new Date().getTime() / 1000);
	        
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

		$meteor.call('get_hdfc_data', hdfcQuery).then(
	      function(data){
	        console.log('success hdfc', new Date().getTime() / 1000);
	        $scope.toggleLifeInsurance();
	        $scope.hdfcDataSpinner = false;
	        if (typeof data == "undefined"){
	        	$scope.noHDFCdata = true;
	        } else {
	        	$scope.hdfcData = data;
	        	compute_elss_ppf_details();
	        }
	      },
	      function(err){
	        console.log('failed', err);
	      }
	    );
	}

	refresh_life_insurance(query, hdfcQuery);

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

	function compute_elss_ppf_details() {

		recoAmountForELSSandPPF = totalTaxSavingAmount - Number($scope[selectedLifeInsurance].premium);


		console.log('Premium amount: ' + $scope[selectedLifeInsurance].premium);
		console.log("Amount for ELSS and PPF : " + recoAmountForELSSandPPF);

		//use the risk score to get PPF and ELSS percentage
		var riskScore = 8;
		var ppfELSS = compute_ppf_elss_percent(riskScore);
		
		//Rounding up the amount to the nearest multiple of 1000
		recoPPFamount = Math.ceil((recoAmountForELSSandPPF * ppfELSS.ppf)/1000)*1000 ;
		$scope.ppfAmount = recoPPFamount;
		recoELSSamount = Math.ceil((recoAmountForELSSandPPF * ppfELSS.elss)/1000)*1000;
		$scope.elssAmount = recoELSSamount;	
		$scope.elssSliderValue = recoELSSamount;
		$scope.elss_investment_amount = Math.ceil($scope.elssAmount/2);
		$scope.displayMaxELSSPPFAmount =  Math.ceil(recoAmountForELSSandPPF);

	}

	function compute_ppf_elss_percent(riskScore) {
		var ppf, elss;
		if (riskScore <=2 ) {
			ppf = 0.8;
			elss = 0.2;
		} else if (riskScore > 2 && riskScore <= 4) {
			ppf = 0.6;
			elss = 0.4;
		} else if (riskScore > 4 && riskScore <= 6 ) {
			ppf = 0.5;
			elss = 0.5;
		} else if (riskScore > 6 && riskScore <= 8 ) {
			ppf = 0.4;
			elss = 0.6;
		} else if (riskScore > 9) {
			ppf = 0.2;
			elss = 0.8;
		}

		return {"ppf" : ppf, "elss" : elss};

	}
});






