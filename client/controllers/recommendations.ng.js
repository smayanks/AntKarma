// Recommendation Controller : RecommendationCtrl

angular.module('antkarma').controller('RecommendationCtrl', function($scope, $modal, $meteor, $timeout, sharedProperties) {

	var MIN_COVERAGE_AMOUNT = 2500000;
	var MAX_COVERAGE_AMOUNT = 50000000;
	var MIN_POLICY_TERM = 20;
	var MAX_POLICY_TERM = 40;
	$scope.minCoverageAmount = MIN_COVERAGE_AMOUNT;
	$scope.maxCoverageAmount = MAX_COVERAGE_AMOUNT;
	$scope.minPolicyTerm = MIN_POLICY_TERM;
	$scope.maxPolicyTerm = MAX_POLICY_TERM;

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
		$meteor.call('get_sbi_data', query).then(
	      function(data){
	        console.log('success sbi', data);
	        $scope.sbiDataSpinner = false;
	        $scope.sbiData = data;

	      },
	      function(err){
	        console.log('failed', err);
	      }
	    );

		$meteor.call('get_lic_data', query).then(
	      function(data){
	        console.log('success lic', data);
	        $scope.licData = data;
	        $scope.licDataSpinner = false;
	      },
	      function(err){
	        console.log('failed', err);
	      }
	    );


		$meteor.call('get_icici_data', query).then(
	      function(data){
	        console.log('success icici', data);
	        $scope.iciciData = data;
	        $scope.iciciDataSpinner = false;
	      },
	      function(err){
	        console.log('failed', err);
	      }
	    );

		$meteor.call('get_hdfc_data', hdfcQuery).then(
	      function(data){
	        console.log('success hdfc', data);
	        $scope.hdfcDataSpinner = false;
	        $scope.hdfcData = data;
	      },
	      function(err){
	        console.log('failed', err);
	      }
	    );
		Session.set('lifeInsuranceLoaded', true);
		console.log("is insurance loaded : " + Session.get('lifeInsuranceLoaded'));
	}

	if (!Session.get('lifeInsuranceLoaded')) {
		console.log("Time to show spinner");
	}

	refresh_life_insurance(query, hdfcQuery);

    $scope.update_life_ins_reco = function(event) {

	    set_slider_attributes("#coverageAmountSlider", $scope.coverageAmount, $scope.minCoverageAmount , $scope.maxCoverageAmount );
    	set_slider_attributes("#policyTermSlider", $scope.paymentTerm, $scope.minPolicyTerm , $scope.maxPolicyTerm);
    	query = {age: age, sum_assured: $scope.coverageAmount, payment_term: $scope.paymentTerm};
		hdfcQuery = {age: age, sum_assured: $scope.coverageAmount, payment_term: $scope.paymentTerm, gender: gender, smoker: smoker};
		refresh_life_insurance(query, hdfcQuery);

		// compute_elss_ppf_details();

   	};
	

});






