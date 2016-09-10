'use strict';

var app = require('../..');
import request from 'supertest';

var newInventory;

describe('Inventory API:', function() {
  describe('GET /api/inventory', function() {
    var inventorys;

    beforeEach(function(done) {
      request(app)
        .get('/api/inventory')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          inventorys = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(inventorys).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/inventory', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/inventory')
        .send({
          name: 'A',
          item: 'bread'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newInventory = res.body;
          done();
        });
    });

    it('should respond with the newly created inventory', function() {
      expect(newInventory.name).to.equal('A');
      expect(newInventory.item).to.equal('bread');
    });
  });

  describe('GET /api/inventory/:id', function() {
    var inventory;

    beforeEach(function(done) {
      request(app)
        .get(`/api/inventory/${newInventory._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          inventory = res.body;
          done();
        });
    });

    afterEach(function() {
      inventory = {};
    });

    it('should respond with JSON array', function() {
      expect(inventory).to.be.instanceOf(Array);
    });
  });

  describe('PATCH /api/inventory/:id', function() {
    var patchedInventory;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/inventory/${newInventory._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'C' },
          { op: 'replace', path: '/item', value: 'diamond' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedInventory = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedInventory = {};
    });

    it('should respond with the patched inventory', function() {
      expect(patchedInventory.name).to.equal('C');
      expect(patchedInventory.item).to.equal('diamond');
    });
  });

  describe('DELETE /api/inventory/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/inventory/${newInventory._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when inventory does not exist', function(done) {
      request(app)
        .delete(`/api/inventory/${newInventory._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
