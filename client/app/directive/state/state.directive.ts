'use strict';
const angular = require('angular');

export default angular.module('auctionApp.state', [])
  .directive('state', function($http, socket) {
    return {
        templateUrl: 'app/directive/state/state.html',
      restrict: 'EA',
      link: function(scope, element, attrs) {
		  $http.get('/api/users/' + scope.username).then(response => {
			  scope.users = response.data;
			  socket.syncUpdates('user', scope.users);
		  });
      }
    };
  })
  .name;
