var TestModule = (function () {
  var my = {}
  var privateVariable = 1;

  function privateMethod() {
    // ...
  }

  my.moduleProperty = 1;
  my.moduleMethod = function () {
    return privateVariable;
  };

  return my;
}());
