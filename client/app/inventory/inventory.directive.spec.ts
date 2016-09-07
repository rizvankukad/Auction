'use strict';

describe('Directive: inventory', function() {
  // load the directive's module and view
  beforeEach(module('auctionApp.inventory'));
  beforeEach(module('app/inventory/inventory.html'));

  var element, scope;

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function($compile) {
    element = angular.element('<inventory></inventory>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the inventory directive');
  }));
});
