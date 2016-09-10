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
          seller : "A",
          item: "bread"
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
      expect(newAuction.seller).to.equal('A');
      expect(newAuction.item).to.equal('bread');
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
      expect(auction.seller).to.equal('A');
      expect(auction.item).to.equal('bread');
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
