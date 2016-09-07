'use strict';
const angular = require('angular');

export default angular.module('auctionApp.inventory', [])
  .directive('inventory', function() {
    return {
      templateUrl: 'app/inventory/inventory.html',
      restrict: 'EA',
      link: function(scope, element, attrs) {}
    };
  })
  .name;
