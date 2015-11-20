  Meteor.startup(function () {
    
    Meteor.publish('lifeInsRecos', function() {
    	return LifeInsurances.find();
    });

    Meteor.publish('elss', function() {
    	return ELSS.find();
    });
    Meteor.publish('reco_life_insurance', function() {
    	return RecommendedLifeInsurance.find();
    });
    Meteor.methods({
    	submitQuestionnaire: function(questions) {

    		var riskScore = computeScore(questions.currentAge, questions.investmentFocusOn,questions.whenMarketVolatile);
    		console.log("Your Risk Score: " + riskScore);

    		Questionnaire.insert({
    			questions: questions,
    			createdAt: new Date(),
    			userAge: questions.currentAge,
    			email: questions.email,
    			name: questions.username,
    			riskScore: riskScore
    		});
    	},

  //   	{
  //   "policy_name": "HDFC Life Click 2 Protect Plus",
  //   "img": "/images/HDFC_Life_logo.png",
  //   "age": "25",
  //   "sum_assured_in_lacs": "100",
  //   "premium": "7,833",
  //   "payment_term": "20",
  //   "claim_settlement_ratio": "0.94",
  //   "max_policy_term": "40",
  //   "max_age_at_maturity": "75",
  //   "comments": "",
  //   "additional_features": "Accidental Death Benefit, Increasing life cover",
  //   "policy_link": "http://ops.hdfclife.com/ops/click2protectPlus.do?source=W_HP_BIOBox_CPP"
  // }
    	getLifeInsuranceRecos: function(query) {
    		// 1. Get list of all recommendations

    		console.log('getLifeInsuranceRecos is called');
    		recoLifeIsurances = function() {
    			console.log('inside recoLifeIsurances');
    			var values = [];
    				RecommendedLifeInsurance.find({}).forEach(function(value) {
    					console.log('value : ' + JSON.stringify(value));	
    					values.push(value);
    				});
    				return values;
    		}

    		recoLifeIsurancesSync = Meteor.wrapAsync(recoLifeIsurances);
    		recoLifeIsurancesResult = recoLifeIsurancesSync();

    		console.log('recoLifeIsurancesResult : ' + recoLifeIsurancesResult.length);

    		getOtherData = function(input)  {
    			console.log('getOtherData value of input:  ' + JSON.stringify(input));
	    		var recommendedData = [];
	    		var insuranceId;
	    		if (input.length > 0) {
	    			// 2. For each of the recos compute premium based on Ids
	    			for (lifeInsurance in input) {
	    				insuranceId = lifeInsurance.id;
	    				
	    				if (insuranceId == 1) {
	    					// 2.1 Query hdfc_data collection
	    					// var hdfcRecos = get_hdfc_data(query);
	    					lifeInsurance.premium = 12345;
	    				} 
	    					// 2.2 Query rest of life insurance recommendations
	    					// var restOfRecos = LifeInsurances.find(query);
	    					recommendedData.push(lifeInsurance);
	    				
	    			}
	    		}

	    		console.log('Returning data : ' + JSON.stringify(recommendedData));

	    		return recommendedData;
	    		// console.log('Query from server: ' + JSON.stringify(query));
	    		// return LifeInsurances.find(query);

    		}

    		// getOtherDataSync = Meteor.wrapAsync(getOtherData);

    		getOtherDataResult = getOtherData(recoLifeIsurancesResult);

    		console.log('getOtherDataResult : ' + JSON.stringify(getOtherDataResult));

    		return getOtherDataResult;

    	}
    });



    function get_hdfc_data(query) {

    	var age = query.age;
    	var gender = query.gender;
    	var smoker = query.smoker;
    	var coverageAmount = query.coverageAmount;
    	var policy_term = query.policy_term;

    	var hdfc_query_string;

    	hdfc_query_string = age;

    	if (gender == 'male') {
    		hdfc_query_string += 'M';
    	} else {
    		hdfc_query_string += 'F';
    	}






    }


    function computeScore(age, investmentFocusOn, whenMarketVolatile) {

		var baseScore = 10;
		var currentScore = 0
		var currentAgeScore = getAgeScore(age);


		var currentAttitudeScoreForLossGain = getAttitudeScoreForLossGain(investmentFocusOn);

		var currentAttitudeScoreForBuySell = getAttitudeScoreForBuySell(whenMarketVolatile);

		currentScore = baseScore - currentAttitudeScoreForLossGain - currentAttitudeScoreForBuySell;
		return currentScore;

	}

	function getAttitudeScoreForBuySell(whenMarketVolatile) {

		var attitudeScoreForBuySell = 0;
		if (whenMarketVolatile == 'sellAll') {
			attitudeScoreForLossGain = 4;
		}
		else if (whenMarketVolatile == 'sellSome'){
			attitudeScoreForBuySell = 2;
		}

		else if (whenMarketVolatile == 'maintainAll') {
			attitudeScoreForBuySell = 1;
		}
		else if (whenMarketVolatile == 'buyMore') {
			attitudeScoreForBuySell = 0;
		}


		return attitudeScoreForBuySell;

	}

	function getAttitudeScoreForLossGain(investmentFocusOn) {
		var attitudeScoreForLossGain = 0;
		if (investmentFocusOn == 'maximizeReturns') {
			attitudeScoreForLossGain = 0;
		}
		else if (investmentFocusOn == 'minimizeLosses'){
			attitudeScoreForLossGain = 5;
		}

		else if (investmentFocusOn == 'bothEqually') {
			attitudeScoreForLossGain = 1;
		}

		return attitudeScoreForLossGain;

	}

	function getAgeScore(age) {
		var ageScore = 0;

		if (age < 29) {
			ageScore = -1;
		}	
		else if (age >=29 && age <=34) {
			ageScore = 0;
		}
		else if (age >=35 && age <=39) {
			ageScore = 0.5;
		}
		else if (age >=40 && age <=44) {
			ageScore = 1;
		}
		else if (age >=45 && age <=46) {
			ageScore = 2;
		}
		else if (age >=47 && age <=49) {
			ageScore = 3;
		}
		else if (age >=50 && age <=52) {
			ageScore = 4;
		}
		else if (age >=53 && age <=56) {
			ageScore = 5;
		}
		else if (age >=57 && age <=59) {
			ageScore = 6;
		}
		else if (age >=60) {
			ageScore = 6;
		}

		return ageScore;

	}

  });



