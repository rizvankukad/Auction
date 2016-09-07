'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var auctionCtrlStub = {
  index: 'auctionCtrl.index',
  show: 'auctionCtrl.show',
  create: 'auctionCtrl.create',
  upsert: 'auctionCtrl.upsert',
  patch: 'auctionCtrl.patch',
  destroy: 'auctionCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var auctionIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './auction.controller': auctionCtrlStub
});

describe('Auction API Router:', function() {
  it('should return an express router instance', function() {
    expect(auctionIndex).to.equal(routerStub);
  });

  describe('GET /api/auction', function() {
    it('should route to auction.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'auctionCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/auction/:id', function() {
    it('should route to auction.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'auctionCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/auction', function() {
    it('should route to auction.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'auctionCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/auction/:id', function() {
    it('should route to auction.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'auctionCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/auction/:id', function() {
    it('should route to auction.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'auctionCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/auction/:id', function() {
    it('should route to auction.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'auctionCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
