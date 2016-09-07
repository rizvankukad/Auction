'use strict';

describe('Service: common', function() {
  // load the service's module
  beforeEach(module('auctionApp.common'));

  // instantiate service
  var common;
  beforeEach(inject(function(_common_) {
    common = _common_;
  }));

  it('should do something', function() {
    expect(!!common).to.be.true;
  });
});
