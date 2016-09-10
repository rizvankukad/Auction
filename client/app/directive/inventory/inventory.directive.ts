'use strict';
const angular = require('angular');

export default angular.module('auctionApp.inventory', [])
  .directive('inventory', function($http, socket, $uibModal) {
    return {
        templateUrl: 'app/directive/inventory/inventory.html',
      restrict: 'EA',
      link: function(scope, element, attrs) {

      $http.get('/api/inventory/' + scope.username).then(response => {
        scope.items = response.data;
        socket.syncUpdates('inventory', scope.items);
      });

      scope.open = function(size, i) {
        scope.selectedItem = i;

        scope.maxqty = i.quantity;

        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          controller: function($scope, items) {
            $scope.items = items;
          },
          templateUrl: 'startAuction.html',
          size: size,
          resolve: {
            items: function() {
              return scope.selectedItem;
            }
          }
        });

        modalInstance.result.then(selectedItem => {

          var auctioner = scope.selectedItem;

          $http.post('/api/auction', {
            seller: auctioner.name,
            item: auctioner.item,
            qty: selectedItem[0],
            minbid: selectedItem[1],
            winbid: selectedItem[1],
            pending: true
          }).then( response => {
            console.log(response);
            if(response.data.active){
              scope.alerts.push({ msg: "Your Auction Started...", type: 'success' });
            } else {
              scope.alerts.push({ msg: "Your Auction Queued...", type: 'info' });
            }
          });

        }, function() {
          console.log('Modal dismissed at: ' + new Date());
        });
      };
      
      }
    };
  })
  .name;
