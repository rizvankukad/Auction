/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/auction              ->  index
 * POST    /api/auction              ->  create
 * GET     /api/auction/:id          ->  show
 * PUT     /api/auction/:id          ->  upsert
 * PATCH   /api/auction/:id          ->  patch
 * DELETE  /api/auction/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {Auction} from '../../sqldb';
import {Inventory} from '../../sqldb';
import {User} from '../../sqldb';

let isAuctionRunning = false;
let bid;

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches, res) {
  return function(entity) {
    return entity.update({ winbid : patches.winbid, winner : patches.winner })
      .then(function(entity){
        bid = entity;
        res.status(200).json({});
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.destroy()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    console.log(err);
    res.status(statusCode).send(err);
  };
}

function startNextAuction() {
  Auction.find({
    where: {
      pending: true
    }
  })
  .then(updateQueue())
  .catch(handleError());
}

function startTimerForAuction(res) {
  return function(entity) {
    if(entity) {
      if(!isAuctionRunning){
        startTimer(entity);
      }
      return entity;
    }
    return null;
  };
}

function updateQueue( auction ){
  return function(entity) {
    if(entity) {
      entity.update({ active : true, starttime : Date.now() });
      startTimer(entity);
    }
  }
}
function startTimer(entity){
  setTimeout(function(){
    if(bid && bid !== null && bid.winner){
      console.log(JSON.stringify(bid));
      Inventory.find({
        where : {
          name : bid.winner,
          item : bid.item
        }
      }).then(function(inventory){
        inventory.update({ quantity : inventory.quantity + bid.qty })
      });

      Inventory.find({
        where : {
          name : bid.seller,
          item : bid.item
        }
      }).then(function(inventory){
        inventory.update({ quantity : inventory.quantity - bid.qty })
      });

      User.find({
        where : {
          name : bid.winner
        }
      }).then(function(user){
        user.update({ coins : user.coins - bid.winbid });
      });

      User.find({
        where : {
          name : bid.seller
        }
      }).then(function(user){
        user.update({ coins : user.coins + bid.winbid });
      });
    }
    //setTimeout(entity.destroy(), 1000);
    entity.destroy();
    isAuctionRunning = false;
    startNextAuction();
  },100000);
  //bid = null;
  isAuctionRunning = true;
}

function beforeCreate( auction, options ){
  if(isAuctionRunning){
    auction.active = false;
  } else {
    auction.active = true;
    auction.starttime = Date.now();
  }
}

Auction.addHook('beforeCreate', 'checkauction', beforeCreate);

// Gets a list of Auctions
export function index(req, res) {
  return Auction.findAll({
    where: {
      active: true
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Auction from the DB
export function show(req, res) {
  return Auction.find({
    where: {
      active: true
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Auction in the DB
export function create(req, res) {
  return Auction.create(req.body)
    .then(startTimerForAuction(res))
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Auction in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }

  return Auction.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Auction in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Auction.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body,res))
    .catch(handleError(res));
}

// Deletes a Auction from the DB
export function destroy(req, res) {
  return Auction.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
