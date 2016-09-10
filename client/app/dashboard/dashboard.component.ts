'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './dashboard.routes';

export class DashboardComponent {
  /*@ngInject*/

  constructor($scope, $stateParams, common, $http, $uibModal, socket, $interval) {
    
    //Player State
    $scope.username = $stateParams.user;
    
    // Inventory
    $scope.currentUsersItem = function(user) {
      return user.name === $scope.username;
    };
    
    //Current Auction
    $scope.alerts = [];
    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
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
