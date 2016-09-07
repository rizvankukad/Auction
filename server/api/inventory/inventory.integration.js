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
          name: 'New Inventory',
          info: 'This is the brand new inventory!!!'
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
      expect(newInventory.name).to.equal('New Inventory');
      expect(newInventory.info).to.equal('This is the brand new inventory!!!');
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

    it('should respond with the requested inventory', function() {
      expect(inventory.name).to.equal('New Inventory');
      expect(inventory.info).to.equal('This is the brand new inventory!!!');
    });
  });

  describe('PUT /api/inventory/:id', function() {
    var updatedInventory;

    beforeEach(function(done) {
      request(app)
        .put(`/api/inventory/${newInventory._id}`)
        .send({
          name: 'Updated Inventory',
          info: 'This is the updated inventory!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedInventory = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedInventory = {};
    });

    it('should respond with the original inventory', function() {
      expect(updatedInventory.name).to.equal('New Inventory');
      expect(updatedInventory.info).to.equal('This is the brand new inventory!!!');
    });

    it('should respond with the updated inventory on a subsequent GET', function(done) {
      request(app)
        .get(`/api/inventory/${newInventory._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let inventory = res.body;

          expect(inventory.name).to.equal('Updated Inventory');
          expect(inventory.info).to.equal('This is the updated inventory!!!');

          done();
        });
    });
  });

  describe('PATCH /api/inventory/:id', function() {
    var patchedInventory;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/inventory/${newInventory._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Inventory' },
          { op: 'replace', path: '/info', value: 'This is the patched inventory!!!' }
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
      expect(patchedInventory.name).to.equal('Patched Inventory');
      expect(patchedInventory.info).to.equal('This is the patched inventory!!!');
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
