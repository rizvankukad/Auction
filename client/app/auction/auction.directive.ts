'use strict';
const angular = require('angular');

export default angular.module('auctionApp.auction', [])
  .directive('auction', function() {
    return {
      templateUrl: 'app/auction/auction.html',
      restrict: 'EA',
      link: function(scope, element, attrs) {}
    };
  })
  .name;
