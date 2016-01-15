
angular.module('myApp', ['angular-meteor', 'ngAnimate','ui.router',  'ui.bootstrap',  'ngDialog', 'toaster', 'ngMessages']);


angular.module('myApp').directive ('numbersCurrency', function() {
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

angular.module('myApp').directive('contenteditable', function() {
	return {
		require: 'ngModel',
		link: function(scope, elm, attrs, ctrl) {
			//view to model
			elm.bind('blur', function() {
				$scope.apply(function() {
					ctrl.$setViewValue(elem.html());
				});
			});
			// from model to view
			ctrl.$render = function() {
				elm.html(ctrl.$viewValue);
			};

		}
	};
});

angular.module('myApp').directive('slider', function() {
    return {
        restrict: 'AE',
        link: function(scope, element, attrs) {
            element.slider({
                value: scope[attrs.ngModel],
                min: parseInt(attrs.min),
                max: parseInt(attrs.max),
                step: parseFloat(attrs.step),
                slide: function(event, ui) {
                    scope.$apply(function() {
                        scope[attrs.ngModel] = ui.value;
                    });
                }
            });
        }
    };
});
angular.module('myApp').service('sharedProperties', function() {
	var submitted = false;
	var questionnaire;
	var id;
	var finalRecommendation;

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
		},
		getFinalReco: function() {
			return finalRecommendation;
		},
		setFinalReco: function(value) {
			finalRecommendation = value;
		}		
	}
});

