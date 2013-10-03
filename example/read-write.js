'use strict';

var numbers = require('stream-spectrum/readable/number')
  , tarpit = require('stream-spectrum/writable/tarpit')
  , inspect = require('inspect-stream') 
  , sview = require('../')

sview(numbers, tarpit)

numbers().pipe(inspect()).pipe(tarpit());

