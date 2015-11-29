  Meteor.startup(function () {
    
    process.env.MAIL_URL = "smtp://postmaster@sandbox36da93257751471db69ded9a0b65ee9c.mailgun.org:62cb7bf9dcc5e7da22a1c01155dd0c0f@smtp.mailgun.org:587";

    function loadData1() {

        if (ELSS.find().count() === 0) {
            var data = {};
            data = JSON.parse(Assets.getText("elss_data.json"));

            for (var i = 0; i < data.length; i++)
                ELSS.insert(data[i]);
        }

    }

    function loadData2() {

        if (ICICIlifeInsurance.find().count() === 0) {
            var data = {};
            data = JSON.parse(Assets.getText("icici_data.json"));

            for (var i = 0; i < data.length; i++)
                ICICIlifeInsurance.insert(data[i]);
        }

    }

    function loadData3() {

        if (LIClifeInsurance.find().count() === 0) {
            var data = {};
            data = JSON.parse(Assets.getText("lic_data.json"));

            for (var i = 0; i < data.length; i++)
                LIClifeInsurance.insert(data[i]);
        }

    }

    function loadData4() {

        if (SBIlifeInsurance.find().count() === 0) {
            var data = {};
            data = JSON.parse(Assets.getText("sbi_data.json"));

            for (var i = 0; i < data.length; i++)
                SBIlifeInsurance.insert(data[i]);
        }

    }

    function loadData5() {

        if (HDFClifeInsurance.find().count() === 0) {
            var data = {};
            data = JSON.parse(Assets.getText("hdfc_data_do_not_delete.json"));

            for (var i = 0; i < data.length; i++)
                HDFClifeInsurance.insert(data[i]);
        }

    }
    loadData1();
    loadData2();
    loadData3();
    loadData4();
    loadData5();


    Meteor.publish('lifeInsRecos', function() {
    	return LifeInsurances.find();
    });

    Meteor.publish('elss', function() {
    	return ELSS.find();
    });
    Meteor.publish('reco_life_insurance', function() {
    	return RecommendedLifeInsurance.find();
    });

    Meteor.publish('sbi_life_insurance', function() {
    	return SBIlifeInsurance.find();
    });
    Meteor.methods({
    	submitQuestionnaire: function(questions) {

    		var riskScore = computeScore(questions.currentAge, questions.investmentFocusOn,questions.whenMarketVolatile);
    		// console.log("Your Risk Score: " + riskScore);

    		Questionnaire.insert({
    			questions: questions,
    			createdAt: new Date(),
    			userAge: questions.currentAge,
    			email: questions.email,
    			name: questions.username,
    			riskScore: riskScore
    		});

            return riskScore;
    	},

    	myMethod: function() {

    		var data = [{policy_name: "a"}, {policy_name: "b"}, {policy_name: "c"}];
    		return data;
    	},

        get_hdfc_policy_info: function() {
            var hdfcData = { policy_id: "1", policy_name: "HDFC Life Click 2 Protect Plus", claim_settlement_ratio: "0.94", 
            max_policy_term: "40", max_age_at_maturity: "75", additional_features: "Accidental Death Benefit, Increasing life cover",
            img: "/images/HDFC_Life_logo.png",policy_link: "http://ops.hdfclife.com/ops/click2protectPlus.do?source=W_HP_BIOBox_CPP"};
            
            return hdfcData;
        },

    	get_hdfc_data: function(query) {

    		console.log('hdfc query in server: ' + JSON.stringify(query));
    		var queryString = "";
    		var coverageAmount = query.sum_assured;
    		var smoker = query.smoker;
    		var gender = query.gender;
    		var policy_term = query.payment_term;
    		var age = query.age;

    		//build query string for lookup for HDFCData
    		// Format: [Age][Gender][Smoker][CoverageAmountRange][PolicyTerm]
    		queryString = age;

    		if (gender == 'male') {
    			queryString += 'M';
    		} else if (gender == 'female') {
    			queryString += 'F';
    		}

    		if (smoker == 'yes') {
    			queryString += 'S';
    		} else {
    			queryString += 'NA';
    		}

    		if (coverageAmount <= 7499999) {
    			queryString += "7499999";
    		} else if (coverageAmount > 7499999 && coverageAmount <= 9999999) {
    			queryString += "9999999";
    		} else if (coverageAmount > 9999999 && coverageAmount <= 1000000000) {
    			queryString += "1000000000";
    		}
    		queryString += policy_term;

    		// console.log("Created query string: " + queryString);

    		var findById = {id: queryString} ;
    		var doc = HDFClifeInsurance.findOne(findById);
            return doc;
    		// setTimeout(function() {return hdfcData;}, 1000);
    		

    	},

    	// get_hdfc_premium: function(query) {
    	// 	return HDFClifeInsuance.find(query);
    	// },

    	get_sbi_data: function(query) {
    		var doc ;
    		console.log('sbi query in server: ' + JSON.stringify(query));

    		doc = SBIlifeInsurance.findOne(query);
    		// console.log(doc);
    		return doc;

    		// setTimeout(function() {return doc;}, 2000);
    		
    	},

    	get_lic_data: function(query) {
    		var doc ;
    		// console.log('lic query in server: ' + JSON.stringify(query));
    		doc = LIClifeInsurance.findOne(query);
    		// console.log(doc);
    		return doc;
    		// setTimeout(function() {return doc;}, 3000);
    	},

    	get_icici_data: function(query) {
    		var doc ;
    		// console.log('lic query in server: ' + JSON.stringify(query));
    		doc = ICICIlifeInsurance.findOne(query);
    		// console.log(doc);
    		return doc;
    		// setTimeout(function() {return doc;}, 4000);
    	},

        get_risk_score: function(age, focus, marketVolatile) {
            var riskScore = computeScore(age, focus, marketVolatile);
            // console.log('get_risk_score : riskScore : ' + riskScore);
            return riskScore;
        },

        send_email: function(query) {

            var toEmail = query.email;
            var fromEmail = "MintingWorks <saurabh@antkarma.com>";
            var subject = "Your investment plan form MintingWorks";
            var life_insurance = query.life_insurance;
            var elss_amount = query.elss_amount;
            var ppf_amount = query.elss_amount;
            var total_amount = Number(life_insurance.premium) + Number(elss_amount) + Number(ppf_amount);
            // console.log('life_insurance : ' + JSON.stringify(life_insurance));
            // console.log('Sending emails to: ' + toEmail + " from: " + fromEmail);

            SSR.compileTemplate( 'htmlEmail', Assets.getText( 'email_template.html' ) );

            var emailData = {
              policy_name: life_insurance.policy_name,
              img_link: life_insurance.img,
              amount: life_insurance.sum_assured,
              premium: life_insurance.premium,
              payment_term: life_insurance.payment_term,
              policy_link: life_insurance.policy_link, 
              elss_amount: elss_amount,
              ppf_amount: ppf_amount,
              total_amount: total_amount
            };

            Email.send({
              to: toEmail,
              from: fromEmail,
              subject: subject,
              html: SSR.render( 'htmlEmail', emailData )
            });
            // console.log('emailData: ' + JSON.stringify(emailData));
        }

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



