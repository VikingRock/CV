'use strict';

var my = {};
var privateVariable = 1;

my.moduleProperty = 1;

my.moduleMethod = function () {
  return privateVariable;
};

module.exports = my.moduleMethod();
