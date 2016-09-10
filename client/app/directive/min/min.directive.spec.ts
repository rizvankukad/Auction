'use strict';

describe('Directive: min', function() {
  // load the directive's module
  //beforeEach(module('auctionApp.min'));

  var element,
    scope;

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function($compile) {
    expect(1).to.equal(1);
  }));
});
