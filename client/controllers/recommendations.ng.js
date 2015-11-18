// Recommendation Controller : RecommendationCtrl

angular.module('antkarma').controller('RecommendationCtrl', function($scope, $modal, $meteor, $timeout, sharedProperties) {

	var TAX_SAVING_LIMIT = 150000;

	// Subscribing to life_insurances	
	$scope.$meteorSubscribe('lifeInsRecos');
	$scope.$meteorSubscribe('elss');

	$scope.elss	 = $meteor.collection(function(){
	    	return ELSS.find({});
	});


	// Initially hide all the life insurance options except the recommended one
	$scope.hideLIReco = true;
	// variable to track the selected life insurance
	var selectedLifeInsuance;

	//  All ELSS and PPF related content

	var totalTaxSavingAmount = TAX_SAVING_LIMIT;

	var recoAmountForELSSandPPF, recoELSSamount, recoPPFamount ;


	// console.log('Risk score from client: ' + $scope.lifeInsRecos.riskScore);

	function table_reload(tableId) {
		// $('table tbody tr:first').addClass('reco-selected');
		$(tableId + ' tbody tr button.select-li-reco').text("Select");
		$(tableId + ' tbody tr:first button.select-li-reco').text("Selected");
		$(tableId + ' tbody tr').not(':first').hide();
		selectedLifeInsuance = $scope.lifeInsRecos[0];
		compute_elss_ppf_details();
	}

	function compute_elss_ppf_details() {

		recoAmountForELSSandPPF = totalTaxSavingAmount - Number(selectedLifeInsuance.premium.replace(',',''));		
		console.log('Premium amount: ' + selectedLifeInsuance.premium.replace(',',''));
		console.log("Amount for ELSS and PPF : " + recoAmountForELSSandPPF);

		//use the risk score to get PPF and ELSS percentage
		var ppfELSS = compute_ppf_elss_percent(8);
		console.log("PPF ELSS : " + JSON.stringify(ppfELSS));

		//Rouding up the amount to the nearest multiple of 1000
		// $scope.ppfAmount = Math.ceil((recoAmountForELSSandPPF * ppfELSS.ppf)/1000)*1000 ;
		// $scope.elssAmount = Math.ceil((recoAmountForELSSandPPF * ppfELSS.elss)/1000)*1000 ;
		recoPPFamount = Math.ceil((recoAmountForELSSandPPF * ppfELSS.ppf)/1000)*1000 ;
		$scope.ppfAmount = recoPPFamount;

		recoELSSamount = Math.ceil((recoAmountForELSSandPPF * ppfELSS.elss)/1000)*1000 ;

		if (typeof $scope.elssSliderValue == "undefined") {
			$scope.elssAmount = recoELSSamount;	
			$scope.elssSliderValue = recoELSSamount;
			elss_investment_amount = $scope.elssAmount/2;
		} else {
			$scope.elssAmount = $scope.elssSliderValue;
		}

		$scope.elss_investment_amount = Math.ceil($scope.elssAmount/2);
		
		

		$scope.displayMaxELSSPPFAmount =  Math.ceil(recoAmountForELSSandPPF/1000)*1000;

		set_slider_attributes("#elssSliderLabel", $scope.elssSliderValue, $scope.elssSliderValue, 1000 , $scope.displayMaxELSSPPFAmount);

	}

	function compute_ppf_elss_percent(riskScore) {
		var ppf, elss;
		if (riskScore <=2 ) {
			ppf = 0.08;
			elss = 0.02;
		} else if (riskScore > 2 && riskScore <= 4) {
			ppf = 0.06;
			elss = 0.04;
		} else if (riskScore > 4 && riskScore <= 6 ) {
			ppf = 0.05;
			elss = 0.05;
		} else if (riskScore > 6 && riskScore <= 8 ) {
			ppf = 0.04;
			elss = 0.06;
		} else if (riskScore > 9) {
			ppf = 0.02;
			elss = 0.08;
		}

		return {"ppf" : ppf, "elss" : elss};

	}
	//Need to fix this: hacky way to render function after dom is rendered

	function delay_table_reload() {
		$timeout(function() {
			table_reload("#liTable");	
		}, 300);	
	};
	
	delay_table_reload();
	// $scope.initialize();

	$scope.$watch('hideLIReco',function(){
		if ($scope.hideLIReco) {
			$(".toggleLIReco").text("+ More options");
		} else {
			$(".toggleLIReco").text("- Hide Options");
		}

	});


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

    $scope.lifeInsRecos	 = $meteor.collection(function(){
	    	return LifeInsurances.find($scope.getReactively('query'));
	});

    var displayCoverageAmountArr = ["25 Lacs", "50 Lacs", "1 Crore"];
    var actualCoverageAmountArr = ["25", "50", "100"];
    var displayPolicyTermArr = ["20 yrs", "25 yrs", "30 yrs"];
    var actualPolicyTermArr = ["20", "25", "30"];

    function set_slider_attributes(sliderId, text, value, min, max) {
    	$(sliderId).text(text);
		$(sliderId).css("margin-left", (value-min)/(max-min)*100+"%");
		$(sliderId).css("left", "-25px");	
    }
    //Setting recommended values of slider
    // var min = 0, max = 2;
    //setting the default values
    set_slider_attributes("#sliderLabel", "50 lacs", 1, 0 , 2);
    set_slider_attributes("#policyTermSliderLabel", "25 yrs", 1, 0 , 2);
    set_slider_attributes("#elssSliderLabel", 8000, 8000, 1000 , 140000);
    
	$scope.isRecommended = true;
	$scope.policyTermSlider = 1;

	var delayRefresh;
	$scope.noRecordsFound = false;

    $scope.update_life_ins_reco = function(event) {

    	$scope.query = {age: $scope.age, sum_assured_in_lacs: actualCoverageAmountArr[$scope.sliderValue], payment_term: actualPolicyTermArr[$scope.policyTermSlider]};	


   		if ($scope.lifeInsRecos.length == 0) {
   			$scope.noRecordsFound = true;
   		} else {
	    	$scope.hideLIReco = false;
	    	// var target = $(event.target);
	    	// $(target).closest(".toggleLIReco").text("- Hide Options");

	    	// $(target).closest(".row").find(".toggleLIReco").text("- Hide Options");
			$scope.isRecommended = false;		

			//slider related attributes
			set_slider_attributes("#sliderLabel", displayCoverageAmountArr[$scope.sliderValue], $scope.sliderValue, 0 , 2);
			set_slider_attributes("#policyTermSliderLabel", displayPolicyTermArr[$scope.policyTermSlider], $scope.policyTermSlider, 0 , 2);

	    	$scope.displayCoverageAmount = displayCoverageAmountArr[$scope.sliderValue];
	    	$scope.displayPolicyTerm = displayPolicyTermArr[$scope.policyTermSlider];

	    	refresh_table("#liTable");
			// delay_table_reload();
			compute_elss_ppf_details();

   		}


	};

	function refresh_table(tableId) {

			$(tableId).fadeOut( "slow" );

			$timeout(function() {
				$(tableId).fadeIn( "slow" );
				$(tableId + ' tbody tr:first').addClass('reco-selected');
				$(tableId + ' tbody tr button.select-li-reco').text("Select");
				$(tableId + ' tbody tr:first button.select-li-reco').text("Selected");
			}, 300);

	}


	$scope.update_elss_reco = function(event) {

    	// $scope.query = {age: $scope.age, sum_assured_in_lacs: actualCoverageAmountArr[$scope.sliderValue], payment_term: actualPolicyTermArr[$scope.policyTermSlider]};	

			// $scope.isRecommended = false;		

			//slider related attributes
			
			set_slider_attributes("#elssSliderLabel", $scope.elssSliderValue, $scope.elssSliderValue, 1000 , $scope.displayMaxELSSPPFAmount);
	    	
	    	$scope.elssAmount = $scope.elssSliderValue;
	    	
	    	// refresh_table("#elssTable");

	    	$("#elssTable").fadeOut( "slow" );
	    	$timeout(function() {
	    		$("#elssTable").fadeIn( "slow" );
	    	}, 300);

			compute_elss_ppf_details();
	};

	$scope.show_all_li_recos = function(event) {

		var target = $(event.target);
		if ($scope.hideLIReco) {
			$scope.hideLIReco = false;			
		} else {
			$scope.hideLIReco = true;
		}

		if ($scope.hideLIReco) {
			$('#liTable tbody tr').not('.reco-selected').fadeOut("slow");
			// reco-selected
		} else {
			$('#liTable tbody tr').not('.reco-selected').fadeIn("slow");
		}

	}

	$scope.select_recommendation = function(event, index, type) {

		$('table tbody tr button.select-li-reco').text("Select");
		
		//find the tr element of clicked row
		var target = $(event.target);
		var tableRow = $(target).closest("tr");

		$(tableRow).find('button.select-li-reco').text("Selected");
		$("table tr").removeClass("reco-selected");
		$(tableRow).addClass("reco-selected");
		
		if (type == 'life_insurance') {
			selectedLifeInsuance = $scope.lifeInsRecos[index];	
		} 

		compute_elss_ppf_details();
	}

});















