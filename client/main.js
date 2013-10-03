'use strict';
var multilevel = require('multilevel')
  , manifest = require('./manifest.json')
  , createSublevels = require('../lib/create-sublevels')

var db = multilevel.client(manifest)
  , sublevels = createSublevels(db) 

console.log('hello stream-view', sublevels)
