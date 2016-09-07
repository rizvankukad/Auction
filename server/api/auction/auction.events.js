/**
 * Auction model events
 */

'use strict';

import {EventEmitter} from 'events';
var Auction = require('../../sqldb').Auction;
var AuctionEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
AuctionEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Auction.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    AuctionEvents.emit(event + ':' + doc._id, doc);
    AuctionEvents.emit(event, doc);
    done(null);
  };
}

export default AuctionEvents;
