'use strict';
const angular = require('angular');

export default angular.module('auctionApp.max', [])
  .directive('max', function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attr, ctrl) {
        function isEmpty(value) {
          return angular.isUndefined(value) || value === '' || value === null || value !== value;
        }
        scope.$watch(attr.max, function() {
          ctrl.$setViewValue(ctrl.$viewValue);
        });
        var maxValidator = function(value) {
          var max = scope.$eval(attr.max) || Infinity;
          if (!isEmpty(value) && value > max) {
            ctrl.$setValidity('max', false);
            return undefined;
          } else {
            ctrl.$setValidity('max', true);
            return value;
          }
        };

        ctrl.$parsers.push(maxValidator);
        ctrl.$formatters.push(maxValidator);
      }
    };
  })
  .name;
