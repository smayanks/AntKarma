
angular.module('myApp', ['angular-meteor', 'ngAnimate','ui.router',  'ui.bootstrap', 'ngMessages']);



angular.module('myApp').directive ('numbersOnly', function() {
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




angular.module('myApp').service('sharedProperties', function() {
	var submitted = false;
	var questionnaire;
	var annualSalary;
	var age;
	var smoker;
	var gender;
	var username;
	var planToInvest;
	var currentLifeInsValue;
	var id;

	return {

		getQuestionnaire: function() {
			return questionnaire;
		},

		setQuestionnaire: function(value) {
			questionnaire = value;
		},
		getSubmitted: function() {
			return submitted;
		},

		setSubmitted: function(value) {
			submitted = value;
		},
		getId: function() {
			return id;
		},
		setId: function(value) {
			id = value;
		}

		// getAnnualSalary: function() {
		// 	return annualSalary;
		// },

		// setAnnualSalary: function(value) {
		// 	annualSalary = value;
		// },

		// getAge: function() {
		// 	return age;
		// },

		// setAge: function(value) {
		// 	age = value;
		// },
		// getSmokerStatus: function() {
		// 	return smoker;
		// },

		// setSmokerStatus: function(value) {
		// 	smoker = value;
		// },
		// getGender: function() {
		// 	return gender;
		// },

		// setGender: function(value) {
		// 	gender = value;
		// },
		// getUsername: function() {
		// 	return username;
		// },

		// setUsername: function(value) {
		// 	username = value;
		// },
		// getPlanToInvest: function() {
		// 	return planToInvest;
		// },

		// setPlanToInvest: function(value) {
		// 	planToInvest = value;
		// },
		// getCurrentLifeInsurance: function() {
		// 	return currentLifeInsValue;
		// },
		// setCurrentLifeInsurance: function(value) {
		// 	currentLifeInsValue = value;
		// }
		
	}

});

angular.module('myApp').animation('.slide', function () {

   
    return {
        enter: function (element, done) {
            element.hide().slideDown(900, done);
        },
        move: function(element, done) {
            element.slideUp(900, done);
        },
        leave: function(element, done) {
            element.slideUp(900, done);
        }
    };
    
});

angular.module('myApp').animation('.table-reload', function () {
    return {
        enter: function (element, done) {
            element.hide().slideDown(1500, done);
        },
        move: function(element, done) {
            element.slideUp(1500, done);
        },
        leave: function(element, done) {
            element.slideUp(1200, done);
        }
    };
    
});

angular.module('myApp').animation('.slide-animation', function () {
        return {
            addClass: function (element, className, done) {
                if (className == 'ng-hide') {
                    TweenMax.to(element, 0.5, {left: -element.parent().width(), onComplete: done });
                }
                else {
                    done();
                }
            },
            removeClass: function (element, className, done) {
                if (className == 'ng-hide') {
                    element.removeClass('ng-hide');

                    TweenMax.set(element, { left: element.parent().width() });
                    TweenMax.to(element, 0.5, {left: 0, onComplete: done });
                }
                else {
                    done();
                }
            }
        };
});

angular.module('myApp').animation('.if-element', function() {
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

