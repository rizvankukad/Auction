'use strict';
const angular = require('angular');

/*@ngInject*/
export function commonService() {
// AngularJS will instantiate a singleton by calling "new" on this function
  var info = {};

  return {
    getInfo: getInfo,
    setInfo: setInfo
  };


  function getInfo(key) {
    return info[key];
  }

  function setInfo(key, value) {
    info[key] = value;
  }
}

export default angular.module('auctionApp.common', [])
.service('common', commonService)
.name;
