  Meteor.startup(function () {
    if (LifeInsurances.find().count() === 0) {
    	var lifeInsRecos = {};

    	lifeInsRecos = JSON.parse(Assets.getText("life_insurance_data.json"));
		

      for (var i = 0; i < lifeInsRecos.length; i++)
        LifeInsurances.insert(lifeInsRecos[i]);
    }

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
    	}

    	// getLIRecommendations: function(query) {
    	// 	reurn LifeInsurances.find($scope.getReactively('query'));
    	// }
    });


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



