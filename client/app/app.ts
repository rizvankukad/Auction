'use strict';
const angular = require('angular');
// import ngAnimate from 'angular-animate';
const ngCookies = require('angular-cookies');
const ngResource = require('angular-resource');
const ngSanitize = require('angular-sanitize');
import 'angular-socket-io';

const uiRouter = require('angular-ui-router');
const uiBootstrap = require('angular-ui-bootstrap');
// const ngMessages = require('angular-messages');



import {routeConfig} from './app.config';


import footer from '../components/footer/footer.component';
import main from './main/main.component';
import dashboard from './dashboard/dashboard.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import socket from '../components/socket/socket.service';
import common from './common/common.service';

import state from './directive/state/state.directive';
import inventory from './directive/inventory/inventory.directive';
import auction from './directive/auction/auction.directive';

import min from './directive/min/min.directive';
import max from './directive/max/max.directive';

import './app.scss';

angular.module('auctionApp', [
  ngCookies,
  ngResource,
  ngSanitize,

  'btford.socket-io',

  uiRouter,
  uiBootstrap,
  footer,
  main,
  dashboard,
  constants,
  socket,
  common,
  util,
  state,
  inventory,
  auction,
  min,
  max
])
  .config(routeConfig)
;

angular
  .element(document)
  .ready(() => {
    angular.bootstrap(document, ['auctionApp'], {
      strictDi: true
    });
  });
