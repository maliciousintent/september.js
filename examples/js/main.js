/*jshint laxcomma:true */
/*global require:true */
require(['september'], function(september) {
  'use strict';
  var varText = september.var()
    , varCheck = september.var()
    , varRadio = september.var()
    ;

  // text
  september.textInputBindingAll('.inputText', varText);
  september.textInputBindingAll('#textarea', varText);
  september.domBinding('#result', varText);

  // checks
  september.checkboxBinding('check1', varCheck);
  september.checkboxBinding('check2', varCheck);

  // radio
  september.radioBinding('radio1', varRadio);
  september.radioBinding('radio2', varRadio);
  september.domBinding('#radioResults', varRadio, function(element) {
    var text = '';
    Object.keys(element).forEach(function(key) {
      text += '<br />Radio ' + key + ' has value ' + element[key] + '<br />';
    });
    return text;
  });
});