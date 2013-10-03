'use strict';

var levelup         =  require('levelup')
  , Memdown         =  require('memdown')
  , sublevel        =  require('level-sublevel')
  , multilevel      =  require('multilevel')
  , livestream      =  require('level-live-stream')
  , path            =  require('path')
  , createSublevels =  require('../lib/create-sublevels')

var manifestPath = path.join(__dirname, '..', 'client', 'manifest.json')

function createMemdown (l) { return new Memdown(l) }

var go = module.exports = function (streams, cb) {
  levelup('stream-view-db', { db: createMemdown }, ondbOpened) 

  function ondbOpened(err, db) {
    if (err) return cb(err);
    
    db = sublevel(db)

    var sublevels = createSublevels(streams, db);

    Object.keys(sublevels).forEach(function (k) {
      livestream.install(sublevels[k]);
    });

    multilevel.writeManifest(db, manifestPath);
    cb(null, db, sublevels);
  }
}
