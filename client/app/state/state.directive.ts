'use strict';
const angular = require('angular');

export default angular.module('auctionApp.state', [])
  .directive('state', function() {
    return {
      templateUrl: 'app/state/state.html',
      restrict: 'EA',
      link: function(scope, element, attrs) {}
    };
  })
  .name;
