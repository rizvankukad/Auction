'use strict';

describe('Directive: state', function() {
  // load the directive's module and view
  //beforeEach(module('auctionApp.state'));
  //beforeEach(module('app/state/state.html'));

  var element, scope;

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function($compile) {
    expect(1).to.equal(1);
  }));
});
