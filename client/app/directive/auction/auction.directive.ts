'use strict';
const angular = require('angular');

export default angular.module('auctionApp.auction', [])
	.directive('auction', function($http, socket, $interval) {
    return {
        templateUrl: 'app/directive/auction/auction.html',
      restrict: 'EA',
      link: function(scope, element, attrs) {

		  $http.get('/api/auction').then(response => {
			  scope.auctions = response.data;
			  socket.syncUpdates('auction', scope.auctions);
		  });

		  scope.placeBid = function(bid) {
			  if (bid >= scope.auctions[0].winbid) {
				  scope.auctions[0].winbid = bid;
				  scope.auctions[0].winner = scope.username;
				  $http.patch('/api/auction/' + scope.auctions[0]._id, scope.auctions[0]).then(res => {
					  scope.alerts.push({ msg: 'Your bid placed successfully...', type: 'success' });
				  });
			  }
		  };

		  $interval(function() {
			  if (scope.auctions.length) {
				  scope.timeleft = 90 - (Date.now() - scope.auctions[0].starttime) / 1000;
			  }
		  }, 1000);

      }
    };
  })
  .name;
