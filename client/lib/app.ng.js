
angular.module('antkarma', ['angular-meteor', 'ngAnimate','ui.router',  'ui.bootstrap', 'ngMessages']);



angular.module('antkarma').directive ('numbersOnly', function() {
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




angular.module('antkarma').service('sharedProperties', function() {
	var submitted = false;
	var annualSalary = 0;
	var age;
	var smoker;
	var gender;
	var username;

	return {
		getSubmitted: function() {
			return submitted;
		},

		setSubmitted: function(value) {
			submitted = value;
		},

		getAnnualSalary: function() {
			return annualSalary;
		},

		setAnnualSalary: function(value) {
			// annularSalary = Number(value);
			annualSalary = 1000000;
		},

		getAge: function() {
			return age;
		},

		setAge: function(value) {
			age = value;
		},
		getSmokerStatus: function() {
			return smoker;
		},

		setSmokerStatus: function(value) {
			smoker = value;
		},
		getGender: function() {
			return gender;
		},

		setGender: function(value) {
			gender = value;
		},
		getUsername: function() {
			return username;
		},

		setUsername: function(value) {
			username = value;
		}
	}

});

angular.module('antkarma').animation('.slide', function () {
	var options = { direction: 'left' };
	var effect = 'slide';
    // Set the duration (default: 400 milliseconds)
    var duration = 500;

    // return $(element).toggle(effect, options, duration);
    return {
        enter: function (element, done) {
          console.log('enter');
            element.hide().slideDown(500, done);
        },
        move: function(element, done) {
            console.log('move');
            element.slideUp(500, done);
        },
        leave: function(element, done) {
          console.log('slide up', element.text())
            element.slideUp(500, done);
        }
    };
    
});

angular.module('antkarma').animation('.table-reload', function () {
    return {
        enter: function (element, done) {
          console.log('enter');
            element.hide().slideDown(1500, done);
        },
        move: function(element, done) {
            console.log('move');
            element.slideUp(1500, done);
        },
        leave: function(element, done) {
          console.log('slide up', element.text())
            element.slideUp(1200, done);
        }
    };
    
});

angular.module('antkarma').animation('.slide-animation', function () {
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

angular.module('antkarma').animation('.if-element', function() {
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

