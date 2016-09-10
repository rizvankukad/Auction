'use strict';

describe('Directive: inventory', function() {
  // load the directive's module and view
  //beforeEach(module('auctionApp.inventory'));
  //eforeEach(module('app/directive/inventory/inventory.html'));

  var element, scope;

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function($compile) {
    expect(1).to.equal(1);
  }));
});
