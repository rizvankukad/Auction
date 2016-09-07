'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './dashboard.routes';

export class DashboardComponent {
  /*@ngInject*/

  constructor($scope, $stateParams, common, $http, $uibModal, socket, $interval) {
    
    //Player State
    $scope.username = $stateParams.user;

    $http.get('/api/users/' + $scope.username).then(response => {
      $scope.users = response.data;
      socket.syncUpdates('user', $scope.users);
    });

    // Inventory
    $http.get('/api/inventory/' + $scope.username).then(response => {
      $scope.items = response.data;
      socket.syncUpdates('inventory', $scope.items);
    });
    $scope.currentUsersItem = function(user) {
      return user.name === $scope.username;
    };
    
    this.initAuctionModal($scope, $uibModal, $http);

    //Current Auction
    $http.get('/api/auction').then(response => {
      $scope.auctions = response.data;
      socket.syncUpdates('auction', $scope.auctions);
    });
    $scope.alerts = [];
    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
    $scope.placeBid = function(bid){
      if (bid >= $scope.auctions[0].winbid){
          $scope.auctions[0].winbid = bid;
          $scope.auctions[0].winner = $scope.username;
          $http.patch('/api/auction/' + $scope.auctions[0]._id, $scope.auctions[0]);
      }
    };
    
    $interval(function() {
      if($scope.auctions.length) {
        $scope.timeleft = 90 - (Date.now() - $scope.auctions[0].starttime) / 1000;
      }
    },1000);
  }

  initAuctionModal($scope, $uibModal, $http){

    $scope.open = function(size, i) {

      $scope.selectedItem = i;

      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'myModalContent.html',
        controller: DashboardComponent,
        controllerAs: '$ctrl',
        size: size,
        resolve: {
          items: function() {
            return $scope.aucItems;
          }
        }
      });

      modalInstance.result.then(selectedItem => {

        /*if($scope.auctions.length > 0){
          $scope.alerts.push({ msg: 'Your Auction is queued, wait until previous actions finished.' });
        } else {
          $scope.alerts.push({ msg: 'Auction Started...' });
        }*/
        
        var auctioner = $scope.selectedItem;
        
        $http.post('/api/auction', {
          seller: auctioner.name,
          item: auctioner.item,
          qty: selectedItem[0],
          minbid: selectedItem[1],
          winbid: selectedItem[1],
          pending: true/*,
          active: $scope.auctions.length > 0 ? false : true,
          starttime: $scope.auctions.length > 0 ? -1 : Date.now()*/

        }).then(response => {
          
        });

      }, function() {
        console.log('Modal dismissed at: ' + new Date());
      });
    };
  }
}

export default angular.module('auctionApp.dashboard', [uiRouter])
  .config(routes)
  .component('dashboard', {
    template: require('./dashboard.html'),
    controller: DashboardComponent,
    controllerAs: 'dashboardCtrl'
  })
  .name;
