'use strict';
const angular = require('angular');

export default angular.module('auctionApp.min', [])
  .directive('min', function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attr, ctrl) {
        function isEmpty(value) {
          return angular.isUndefined(value) || value === '' || value === null || value !== value;
        }

        scope.$watch(attr.min, function() {
          ctrl.$setViewValue(ctrl.$viewValue);
        });

        var minValidator = function(value) {
          var min = scope.$eval(attr.min) || 1;
          if (!isEmpty(value) && value < min) {
            ctrl.$setValidity('min', false);
            return undefined;
          } else {
            ctrl.$setValidity('min', true);
            return value;
          }
        };
        ctrl.$parsers.push(minValidator);
        ctrl.$formatters.push(minValidator);
      }
    };
  })
  .name;
