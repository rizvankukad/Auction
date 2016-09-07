'use strict';

var app = require('../..');
import request from 'supertest';

var newAuction;

describe('Auction API:', function() {
  describe('GET /api/auction', function() {
    var auctions;

    beforeEach(function(done) {
      request(app)
        .get('/api/auction')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          auctions = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(auctions).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/auction', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/auction')
        .send({
          name: 'New Auction',
          info: 'This is the brand new auction!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newAuction = res.body;
          done();
        });
    });

    it('should respond with the newly created auction', function() {
      expect(newAuction.name).to.equal('New Auction');
      expect(newAuction.info).to.equal('This is the brand new auction!!!');
    });
  });

  describe('GET /api/auction/:id', function() {
    var auction;

    beforeEach(function(done) {
      request(app)
        .get(`/api/auction/${newAuction._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          auction = res.body;
          done();
        });
    });

    afterEach(function() {
      auction = {};
    });

    it('should respond with the requested auction', function() {
      expect(auction.name).to.equal('New Auction');
      expect(auction.info).to.equal('This is the brand new auction!!!');
    });
  });

  describe('PUT /api/auction/:id', function() {
    var updatedAuction;

    beforeEach(function(done) {
      request(app)
        .put(`/api/auction/${newAuction._id}`)
        .send({
          name: 'Updated Auction',
          info: 'This is the updated auction!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedAuction = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedAuction = {};
    });

    it('should respond with the original auction', function() {
      expect(updatedAuction.name).to.equal('New Auction');
      expect(updatedAuction.info).to.equal('This is the brand new auction!!!');
    });

    it('should respond with the updated auction on a subsequent GET', function(done) {
      request(app)
        .get(`/api/auction/${newAuction._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let auction = res.body;

          expect(auction.name).to.equal('Updated Auction');
          expect(auction.info).to.equal('This is the updated auction!!!');

          done();
        });
    });
  });

  describe('PATCH /api/auction/:id', function() {
    var patchedAuction;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/auction/${newAuction._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Auction' },
          { op: 'replace', path: '/info', value: 'This is the patched auction!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedAuction = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedAuction = {};
    });

    it('should respond with the patched auction', function() {
      expect(patchedAuction.name).to.equal('Patched Auction');
      expect(patchedAuction.info).to.equal('This is the patched auction!!!');
    });
  });

  describe('DELETE /api/auction/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/auction/${newAuction._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when auction does not exist', function(done) {
      request(app)
        .delete(`/api/auction/${newAuction._id}`)
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
