/*jshint laxcomma:true */
/*global describe:true, it:true, expect:true, require:true */
var september = require('../september').september;

describe('Variable tests', function() {
  'use strict';

  var intVar = september.var(1)
    , intVarTwo = september.var(2)
    , floatVar = september.var(1.0)
    , floatVarTwo = september.var(2.0)
    , strVar = september.var('string')
    , strVarTwo = september.var('string2')
    ;

  it('addition should work as native elements', function() {
    expect(intVar + intVarTwo).toEqual(intVar.value + intVarTwo.value);
    expect(strVar + intVarTwo).toEqual(strVar.value + intVarTwo.value);
    expect(strVar + strVarTwo).toEqual(strVar.value + strVarTwo.value);
  });

  it('subtraction should work as native elements', function() {
    expect(intVar - intVarTwo).toEqual(intVar.value - intVarTwo.value);
    expect(floatVar - floatVarTwo).toEqual(floatVar.value - intVarTwo.value);
  });

  it('multiplication should work as native elements', function() {
    expect(intVar * intVarTwo).toEqual(intVar.value * intVarTwo.value);
    expect(floatVar * floatVarTwo).toEqual(floatVar.value * intVarTwo.value);
  });

  it('division should work as native elements', function() {
    expect(intVar / intVarTwo).toEqual(intVar.value / intVarTwo.value);
    expect(floatVar / floatVarTwo).toEqual(floatVar.value / intVarTwo.value);
  });
});