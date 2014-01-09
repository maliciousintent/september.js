/*jshint laxcomma:true, browser:true, jquery:true, eqnull:true */
/*global PathObserver:true, Platform:true */

'use strict';

(function(global){

  var tunnel = {}
    , noopFn = function(){}
    ;

  /**
   * Bind the value of a text input selector with a variable
   * @param  {String} textInputSelector A valid selector for an input text
   * @param  {Variable} variable          The variable to bind
   * @param  {Function} callBkFn          An optional callback function that is called when the variable changes
   */
  tunnel.textInputBinding = function (textInputSelector, variable, callBkFn) {
    var domElement = document.querySelector(textInputSelector)
      , observer
      ;

    if (!domElement) return false;

    callBkFn = callBkFn || noopFn;
    
    // bind the variable to the input
    observer = new PathObserver(variable, 'value');
    observer.open(function(newValue) {
      domElement.value = newValue;
      callBkFn(newValue);
    });

    domElement.addEventListener('input', function() {
      variable.value = domElement.value;
      callBkFn();
    });
  };

  /**
   * Bind the content of an element (innerHTML) with a variable
   * @param  {String} domSelector A valid selector for a dom item
   * @param  {Variable} variable          The variable to bind
   * @param  {Function} callBkFn          An optional callback function that is called when the variable changes
   */
  tunnel.domBinding = function (domSelector, variable, callBkFn) {
    var domElement = document.querySelector(domSelector)
      , observer
      ;

    if (!domElement) return false;

    callBkFn = callBkFn || noopFn;
    
    // bind the variable to the input
    observer = new PathObserver(variable, 'value');
    observer.open(function(newValue) {
      domElement.innerHTML = newValue;
      callBkFn(newValue);
    });

  };

  //for browsers that don't support Object.observer
  setInterval(function(){ Platform.performMicrotaskCheckpoint(); }, 100);

  /**
   * A variable that can be bind to dom domElement
   * @param  {Any} initialValue an optional initial value
   */
  tunnel.bindVariable = function(initialValue) {
    var obj = { value : initialValue }
      ;
    return obj;
  };

  // TODO: export as AMD?
  global.tunnel = tunnel;

})(window);