'use strict';

var server      =  require('./server/server')
  , setupDb     =  require('./server/setup-db')
  , viewStreams =  require('./server/view-streams')
  , opener      =  require('opener')
  , format      =  require('util').format
  , sviz        =  require('stream-viz')

var go = module.exports = function () {
  var streams = [].slice.call(arguments)
  var db, sublevels;

  setupDb(streams, onDbSetup);

  function onDbSetup (err, db_, sublevels_) {
    if (err) return console.error(err);
    db = db_
    sublevels = sublevels_;
    server(db_, onServerListening);
  }

  function onServerListening (err, address) {
    var url = format('http://%s:%d', address.address, address.port)
    console.log('listening: ', url);  
    opener(url);
    viewStreams(streams, db, sublevels)
  }
};


// Test
if (!module.parent) {
  
  var numbers = require('stream-spectrum/readable/number')
    , tarpit = require('stream-spectrum/writable/tarpit')
    , inspect = require('inspect-stream') 

  var nums = numbers()
    , pit = tarpit()

  go(nums, pit)

  //numbers().pipe(inspect()).pipe(tarpit());
}
