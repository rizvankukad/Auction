'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('dashboard', {
      url: '/dashboard/:user',
      template: '<dashboard></dashboard>'
    });
}
