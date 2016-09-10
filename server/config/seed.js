/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import sqldb from '../sqldb';
var Thing = sqldb.Thing;

Thing.sync()
  .then(() => {
    Thing.bulkCreate([{
      name: 'A',
      info: 'Test'
    }]);
  });

