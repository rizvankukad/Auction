'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var inventoryCtrlStub = {
  index: 'inventoryCtrl.index',
  show: 'inventoryCtrl.show',
  create: 'inventoryCtrl.create',
  upsert: 'inventoryCtrl.upsert',
  patch: 'inventoryCtrl.patch',
  destroy: 'inventoryCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var inventoryIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './inventory.controller': inventoryCtrlStub
});

describe('Inventory API Router:', function() {
  it('should return an express router instance', function() {
    expect(inventoryIndex).to.equal(routerStub);
  });

  describe('GET /api/inventory', function() {
    it('should route to inventory.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'inventoryCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/inventory/:name', function() {
    it('should route to inventory.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:name', 'inventoryCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/inventory', function() {
    it('should route to inventory.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'inventoryCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/inventory/:id', function() {
    it('should route to inventory.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'inventoryCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/inventory/:id', function() {
    it('should route to inventory.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'inventoryCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/inventory/:id', function() {
    it('should route to inventory.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'inventoryCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
