/*jshint laxcomma:true, browser:true, jquery:true, eqnull:true */
/*global PathObserver:true, Platform:true */

'use strict';

(function(global){

  var tunnel = {}
    , noopFn = function(){}
    , _inputBindingHelper
    ;


  /**
   * An helper function
   * @param  {DOM Element} domElement the element to bind
   * @param  {Tunnel Var} variable   the var to bind
   * @param  {String} eventName  The dom event
   * @param  {String} attrName   the attribute of the dom
   * @param  {Function} callBkFn   An optional callback function that is inovked when something changes
   */
  _inputBindingHelper = function(domElement, variable, eventName, attrName, callBkFn) {
    var observer
      ;

    if (!domElement) return false;

    callBkFn = callBkFn || noopFn;
    
    // bind the variable to the input
    observer = new PathObserver(variable, 'value');
    observer.open(function(newValue) {
      domElement[attrName] = newValue;
      callBkFn(newValue);
    });

    domElement.addEventListener('input', function() {
      variable.value = domElement[attrName];
      callBkFn();
    });
  };

  /**
   * binds the value of a text input or textarea with a variable
   * @param  {String} textInputSelector A valid selector for an input text (the function will take just the first one)
   * @param  {Variable} variable          The variable to bind
   * @param  {Function} callBkFn          An optional callback function that is called when the variable changes
   */
  tunnel.textInputBinding = function (textInputSelector, variable, callBkFn) {
    var domElement = document.querySelector(textInputSelector)
      ;
    _inputBindingHelper(domElement, variable, 'input', 'value', callBkFn);
  };

  /**
   * binds the value of a text input or textarea with a variable
   * @param  {String} textInputSelector A valid selector for an input text
   * @param  {Variable} variable          The variable to bind
   * @param  {Function} callBkFn          An optional callback function that is called when the variable changes
   */
  tunnel.textInputBindingAll = function (textInputSelector, variable, callBkFn) {
    var domElements = Array.prototype.slice.call(document.querySelectorAll(textInputSelector))
      ;
    domElements.forEach(function (domElement) {
      _inputBindingHelper(domElement, variable, 'input', 'value', callBkFn);
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
  tunnel.var = function(initialValue) {
    var obj = { value : initialValue }
      ;

    obj.valueOf = function() {
      return obj.value;
    };

    return obj;
  };

  // TODO: export as AMD?
  global.tunnel = tunnel;

})(window);