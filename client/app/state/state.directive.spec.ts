'use strict';

describe('Directive: state', function() {
  // load the directive's module and view
  beforeEach(module('auctionApp.state'));
  beforeEach(module('app/state/state.html'));

  var element, scope;

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function($compile) {
    element = angular.element('<state></state>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the state directive');
  }));
});
