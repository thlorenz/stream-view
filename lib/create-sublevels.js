'use strict';

var go = module.exports = function (db) {
  return {
      bufferlen: db.sublevel('bufferlen', { valueEncoding: 'utf8' })
    , readable: db.sublevel('readable', { valueEncoding: 'json' })
    , writable: db.sublevel('writable', { valueEncoding: 'json' })
    , chunkrate: db.sublevel('chunkrate', { valueEncoding: 'utf8' })
  }
}
