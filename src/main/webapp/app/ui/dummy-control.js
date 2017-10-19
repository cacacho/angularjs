
var module = angular.module('mpApp.ui');

/**
 * Validates if input contains e
 */
module.directive('dummyControl', function($log) {
    return {
        require: 'ngModel',
        link: function(scope, element, attr, mCtrl) {
          function myValidation(value) {
            $log.warn('validating '+value);
            if (value.indexOf("e") > -1) {
              mCtrl.$setValidity('charE', true);
            } else {
              mCtrl.$setValidity('charE', false);
            }
            return value;
          }
          mCtrl.$parsers.push(myValidation);
        }
    };
});