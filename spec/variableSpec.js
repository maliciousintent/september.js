/*global describe:true, it:true, expect:true */
describe('Variable tests', function() {
  'use strict';
  it('true should be equal to true', function() {
    expect(true).toEqual(true);
  });

  it('string 1 should be equal to 1', function() {
    expect('1').toEqual('1');
  });
});