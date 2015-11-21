// Recommendation Controller : RecommendationCtrl

angular.module('antkarma').controller('RecommendationCtrl', function($scope, $modal, $meteor, $timeout, sharedProperties) {



	$meteor.subscribe('reco_life_insurance');
	$meteor.subscribe('sbi_life_insurance');
	$meteor.subscribe('lic_life_insurance');



	// $scope.reco_life_insurance = $meteor.collection(function() {
	// 	return RecommendedLifeInsurance.find({});
	// });

	


	// $scope.sbiData = $meteor.collection(function() {
		
	// 	return SBIlifeInsurance.find(query);
	// });


	// var hdfc = $scope.reco_life_insurance[0];
	// console.log('hdfc : ' + hdfc);


	// Meteor.call('getAllInuranceInfo', function(err, data) {
	// 	if (err) {
	// 		console.log("Error: " + err);
	// 	} else {
	// 		Session.set('data',data);

	// 	}
	// });


	// console.log('$scope.reco_life_insurance : ' + JSON.stringify($scope.reco_life_insurance));
	// var temp;

	// Meteor.call('getAllInuranceInfo', function(error, result){
	// 	if(error){
	// 		alert('Error');
	// 	} else{
	// 		// console.log('Result: ' + JSON.stringify(result));
	// 		Session.set("data", result);
	// 		$scope.reco_life_insurance = result;
			
	// 	}
	// });

	// $meteor.call('getAllInuranceInfo').then(
 //      function(data){
 //        console.log('success inviting', data);
 //        $scope.reco_life_insurance = data;
 //      },
 //      function(err){
 //        console.log('failed', err);
 //      }
 //    );
	var query = {age: "32", sum_assured: "10000000", payment_term: "20"};
	$meteor.call('get_sbi_data', query).then(
      function(data){
        console.log('success sbi', data);
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
      },
      function(err){
        console.log('failed', err);
      }
    );


	$meteor.call('get_icici_data', query).then(
      function(data){
        console.log('success icici', data);
        $scope.iciciData = data;
      },
      function(err){
        console.log('failed', err);
      }
    );

	$meteor.call('get_hdfc_data', query).then(
      function(data){
        console.log('success hdfc', data);
        $scope.hdfcData = data;
      },
      function(err){
        console.log('failed', err);
      }
    );


	// Meteor.call('getAllInuranceInfo', function(error, result){
	// 	if(error){
	// 		alert('Error');
	// 	} else{
	// 		// console.log('Result: ' + JSON.stringify(result));
	// 		// Session.set("data", result);
			
	// 			setValue(result);
				
			
			
	// 	}
	// });

	// function setValue(val) {
	// 	$scope.reco_life_insurance = val;
	// }
	var dataReactive =  Session.get("data");
	// $scope.reco_life_insurance = dataReactive;	
	
	// $scope.reco_life_insurance = Session.get("data");;
	// // var hdfc = dataReactive[0];
	// var query = {age: "32", sum_assured_in_lacs: "100", payment_term: "20"};

	// $scope.$watch('dataReactive', function() {
	// 	Meteor.call('get_sbi_premium', query, function(error, data) {
	// 		if (error) {
	// 			alert("error");

	// 		} else {
	// 			console.log('sbi premium' + data);
	// 			Session.set('sbiPremium', data);
	// 		}
	// 	});
	// 	$scope.sbiPremium = Session.get('sbiPremium');
	// });

	
	// console.log("hdfc : "  + hdfc);

    // $scope.query = {age: $scope.age, gender: 'male', smoker : 'no', sum_assured_in_lacs: "50", policy_term: "25"};		
	// var hdfcPremium = $meteor.call('get_hdfc_premium', $scope.query); 
	// var sbiPremium = $meteor.call('get_sbi_premium', $scope.query); 
	// var licData = $meteor.call('get_lic_premium', $scope.query); 
	// var iciciData = $meteor.call('get_icici_premium', $scope.query); 



});






