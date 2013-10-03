'use strict';

var go = module.exports = function (streams, db) {

  function createSublevels(acc, stream) {

    var id = stream.id || stream.constructor.name;

    var sublevels = [{ id: id + '-chunkrate' ,  valueEncoding: 'utf8' } ];

    if (stream._readableState) 
      sublevels = sublevels.concat([
        { id: id + '-readable-bufferlen',  valueEncoding: 'utf8' }
      , { id: id + '-readable',  valueEncoding: 'json' } ])

    if (stream._writableState) 
      sublevels = sublevels.concat([
        { id: id + '-writable-bufferlen',  valueEncoding: 'utf8' }
      , { id: id + '-writable'  ,  valueEncoding: 'json' } ])


    sublevels.forEach(createSublevel);
    
    function createSublevel (x) {
      acc[x.id] = db.sublevel(x.id, { valueEncoding: x.valueEncoding })
    }
    return acc;
  }

  return streams.reduce(createSublevels, {});
}
