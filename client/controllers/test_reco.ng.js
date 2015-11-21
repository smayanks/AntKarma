// // Recommendation Controller : RecommendationCtrl

// angular.module('antkarma').controller('RecommendationCtrl', function($scope, $modal, $meteor, $timeout, sharedProperties) {

// 	//--------------Variable declaration-----------------------//
// 	var TAX_SAVING_LIMIT = 150000;
// 	var selectedLifeInsuance; // variable to track the selected life insurance
// 	var totalTaxSavingAmount = TAX_SAVING_LIMIT;
// 	var recoAmountForELSSandPPF, recoELSSamount, recoPPFamount ;
// 	var recommendedCoverageAmount = sharedProperties.getAnnualSalary() * 15; // Logic for recommended coverage amount is annual salary * 15
//     var displayCoverageAmountArr = ["25 Lacs", "50 Lacs", "1 Crore"];
//     var actualCoverageAmountArr = ["25", "50", "100"];
//     var displayPolicyTermArr = ["20 yrs", "25 yrs", "30 yrs"];
//     var actualPolicyTermArr = ["20", "25", "30"];
// 	var delayRefresh;

// 	//--------------DB/Collection related calls-----------------------//
// 	// $scope.$meteorSubscribe('lifeInsRecos');
// 	$scope.$meteorSubscribe('elss');
// 	$scope.$meteorSubscribe('reco_life_insurance');

// 	$scope.elss	 = $meteor.collection(function(){
// 	    	return ELSS.find({});
// 	});

// 	// $scope.reco_life_insurance	 = $meteor.collection(function(){
// 	//     	return RecommendedLifeInsurance.find({});
// 	// });

// 	$scope.reco_life_insurance = $meteor.call('getAllInuranceInfo', function(error, result) {
// 		return result;
// 	});
// 	console.log('$scope.reco_life_insurance : ' + JSON.stringify($scope.reco_life_insurance));

// 	//--------------Scope Variables-----------------------//

// 	// $scope.age = sharedProperties.getAge();
// 	$scope.age = '32';  //hardcoded temporarily to 32
// 	$scope.displayPolicyTerm = "25 yrs";
// 	$scope.coverageAmount = "10000000";
// 	$scope.isRecommended = true;
// 	$scope.policyTermSlider = 1;
// 	$scope.noRecordsFound = false;
// 	$scope.hideLIReco = true; // Initially hide all the life insurance options except the recommended one

// 	// query life_insurances based on age of user
//     $scope.query = {age: $scope.age, gender: 'male', smoker : 'no', sum_assured_in_lacs: "50", policy_term: "25"};		

//  //    $scope.lifeInsRecos	 = $meteor.collection(function(){
// 	//     	return LifeInsurances.find($scope.getReactively('query'));
// 	// });	

// 	$scope.lifeInsRecos;

// 	// var hdfcPremium = $meteor.call('get_hdfc_premium', $scope.query); 
// 	var sbiPremium = $meteor.call('get_sbi_premium', $scope.query); 
// 	var licData = $meteor.call('get_lic_premium', $scope.query); 
// 	var iciciData = $meteor.call('get_icici_premium', $scope.query); 

// 	console.log("some random data");



// 	function convert_number_to_text_currency(amount) {
// 		return "50 lacs";
// 	}

// 	$scope.displayCoverageAmount = convert_number_to_text_currency(recommendedCoverageAmount);

//     function set_slider_attributes(sliderId, text, value, min, max) {
//     	$(sliderId).text(text);
// 		$(sliderId).css("margin-left", (value-min)/(max-min)*100+"%");
// 		$(sliderId).css("left", "-25px");	
//     }
    
//     //Setting recommended values of sliders
//     set_slider_attributes("#sliderLabel", "50 lacs", 1, 0 , 2);
//     set_slider_attributes("#policyTermSliderLabel", "25 yrs", 1, 0 , 2);
    





// 	// console.log('Risk score from client: ' + $scope.lifeInsRecos.riskScore);

// 	function table_reload(tableId) {
// 		// $('table tbody tr:first').addClass('reco-selected');
// 		$(tableId + ' tbody tr button.select-li-reco').text("Select");
// 		$(tableId + ' tbody tr:first button.select-li-reco').text("Selected");
// 		$(tableId + ' tbody tr').not(':first').hide();
// 		selectedLifeInsuance = $scope.lifeInsRecos[0];
// 		compute_elss_ppf_details();
// 	}

// 	$scope.$watch('selectedLifeInsuance.premium', function(){
// 		// recoAmountForELSSandPPF = totalTaxSavingAmount - Number(selectedLifeInsuance.premium.replace(',',''));
// 		$scope.elssAmount = recoELSSamount;	
// 		$scope.elssSliderValue = recoELSSamount;
// 		$scope.elss_investment_amount = $scope.elssAmount/2;		

// 	});

// 	$scope.compute_premium = function(id) {

// 		if (id == 1) { //i.e. HDFC
// 			return id * 100000;
// 		} else {
// 			return -1;
// 		}
		
// 	}

// 	function compute_elss_ppf_details() {

// 		// recoAmountForELSSandPPF = totalTaxSavingAmount - Number(selectedLifeInsuance.premium.replace(',',''));	

// 		// console.log('Premium amount: ' + selectedLifeInsuance.premium.replace(',',''));
// 		console.log("Amount for ELSS and PPF : " + recoAmountForELSSandPPF);

// 		//use the risk score to get PPF and ELSS percentage
// 		var riskScore = 8;
// 		var ppfELSS = compute_ppf_elss_percent(riskScore);
		
// 		//Rounding up the amount to the nearest multiple of 1000
// 		recoPPFamount = Math.ceil((recoAmountForELSSandPPF * ppfELSS.ppf)/1000)*1000 ;
// 		$scope.ppfAmount = recoPPFamount;
// 		recoELSSamount = Math.ceil((recoAmountForELSSandPPF * ppfELSS.elss)/1000)*1000;
// 		$scope.elssAmount = recoELSSamount;	
// 		$scope.elssSliderValue = recoELSSamount;
// 		$scope.elss_investment_amount = Math.ceil($scope.elssAmount/2);
// 		$scope.displayMaxELSSPPFAmount =  Math.ceil(recoAmountForELSSandPPF);

// 	}

// 	function compute_ppf_elss_percent(riskScore) {
// 		var ppf, elss;
// 		if (riskScore <=2 ) {
// 			ppf = 0.8;
// 			elss = 0.2;
// 		} else if (riskScore > 2 && riskScore <= 4) {
// 			ppf = 0.6;
// 			elss = 0.4;
// 		} else if (riskScore > 4 && riskScore <= 6 ) {
// 			ppf = 0.5;
// 			elss = 0.5;
// 		} else if (riskScore > 6 && riskScore <= 8 ) {
// 			ppf = 0.4;
// 			elss = 0.6;
// 		} else if (riskScore > 9) {
// 			ppf = 0.2;
// 			elss = 0.8;
// 		}

// 		return {"ppf" : ppf, "elss" : elss};

// 	}
// 	//Need to fix this: hacky way to render function after dom is rendered

// 	function delay_table_reload() {
// 		$timeout(function() {
// 			table_reload("#liTable");	
// 		}, 3000);	
// 	};
	
// 	delay_table_reload();
// 	// $scope.initialize();

// 	$scope.$watch('hideLIReco',function(){
// 		if ($scope.hideLIReco) {
// 			$(".toggleLIReco").text("+ More options");
// 		} else {
// 			$(".toggleLIReco").text("- Hide Options");
// 		}

// 	});


//     $scope.update_life_ins_reco = function(event) {

//     	$scope.query = {age: $scope.age, sum_assured_in_lacs: actualCoverageAmountArr[$scope.sliderValue], policy_term: actualPolicyTermArr[$scope.policyTermSlider]};	

//     	$scope.lifeInsRecos	 = $meteor.call('getLifeInsuranceRecos', $scope.query); 
//    		if ($scope.lifeInsRecos.length == 0) {
//    			$scope.noRecordsFound = true;
//    		} else {
// 	    	$scope.hideLIReco = false;
// 	    	// var target = $(event.target);
// 	    	// $(target).closest(".toggleLIReco").text("- Hide Options");

// 	    	// $(target).closest(".row").find(".toggleLIReco").text("- Hide Options");
// 			$scope.isRecommended = false;		

// 			//slider related attributes
// 			set_slider_attributes("#sliderLabel", displayCoverageAmountArr[$scope.sliderValue], $scope.sliderValue, 0 , 2);
// 			set_slider_attributes("#policyTermSliderLabel", displayPolicyTermArr[$scope.policyTermSlider], $scope.policyTermSlider, 0 , 2);

// 	    	$scope.displayCoverageAmount = displayCoverageAmountArr[$scope.sliderValue];
// 	    	$scope.displayPolicyTerm = displayPolicyTermArr[$scope.policyTermSlider];

// 	    	refresh_table("#liTable");
// 			// delay_table_reload();
// 			compute_elss_ppf_details();

//    		}


// 	};

// 	function refresh_table(tableId) {

// 			$(tableId).fadeOut( "slow" );

// 			$timeout(function() {
// 				$(tableId).fadeIn( "slow" );
// 				$(tableId + ' tbody tr:first').addClass('reco-selected');
// 				$(tableId + ' tbody tr button.select-li-reco').text("Select");
// 				$(tableId + ' tbody tr:first button.select-li-reco').text("Selected");
// 			}, 300);

// 	}

// 	// $scope.show_all_li_recos = function(event) {

// 	// 	var target = $(event.target);
// 	// 	if ($scope.hideLIReco) {
// 	// 		$scope.hideLIReco = false;			
// 	// 	} else {
// 	// 		$scope.hideLIReco = true;
// 	// 	}

// 	// 	if ($scope.hideLIReco) {
// 	// 		$('#liTable tbody tr').not('.reco-selected').fadeOut("slow");
// 	// 		// reco-selected
// 	// 	} else {
// 	// 		$('#liTable tbody tr').not('.reco-selected').fadeIn("slow");
// 	// 	}

// 	// }

// 	$scope.select_recommendation = function(event, index, type) {

// 		$('table tbody tr button.select-li-reco').text("Select");
		
// 		//find the tr element of clicked row
// 		var target = $(event.target);
// 		var tableRow = $(target).closest("tr");

// 		$(tableRow).find('button.select-li-reco').text("Selected");
// 		$("table tr").removeClass("reco-selected");
// 		$(tableRow).addClass("reco-selected");
		
		
// 		selectedLifeInsuance = $scope.lifeInsRecos[index];	
		

// 		compute_elss_ppf_details();
// 	}

// });























