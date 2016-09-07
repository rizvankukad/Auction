'use strict';

describe('Directive: auction', function() {
  // load the directive's module and view
  beforeEach(module('auctionApp.auction'));
  beforeEach(module('app/auction/auction.html'));

  var element, scope;

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function($compile) {
    element = angular.element('<auction></auction>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the auction directive');
  }));
});
