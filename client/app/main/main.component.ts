const angular = require('angular');
const uiRouter = require('angular-ui-router');
import routing from './main.routes';

export class MainController {
  $http;
  socket;
  commonService;
  state;
  Users = [];
  newUser = '';

  /*@ngInject*/
  constructor($http, $scope, socket, $state, common) {
    this.commonService = common;
    this.$http = $http;
    this.socket = socket;
    this.state = $state;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('user');
    });
  }

  $onInit() {
    this.$http.get('/api/users').then(response => {
      this.Users = response.data;
      this.socket.syncUpdates('user', this.Users);
    });
  }

  addUser() {
    let index = -1;
    for (let i = 0, len = this.Users.length; i < len; i++) {
      if (this.Users[i].name === this.newUser) {
        index = i;
        break;
      }
    }
    if (index > -1) {
      this.$http.get('/api/users/' + this.newUser).then(response => {
        this.state.go("dashboard", { user: response.data[0].name });
      });
    } else {
      this.$http.post('/api/users', { name: this.newUser, active: true }).then(response => {
        this.commonService.setInfo('coins', response.data.coins);
        this.state.go("dashboard", { user: response.data.name });
      });
    }
    this.newUser = '';
  }

  deleteUser(user) {
    this.$http.delete('/api/users/' + user._id);
  }
}

export default angular.module('auctionApp.main', [
  uiRouter])
    .config(routing)
    .component('main', {
      template: require('./main.html'),
      controller: MainController
    })
    .name;
