'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable no-extend-native */
function addEscape() {
  String.prototype.escape = function () {
    if (typeof this === 'undefined') {
      // validator will cath it
      return this;
    }

    return this.trim().replace(/&/g, '&amp;').replace(/>/g, '&gt;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/\//g, '&#x2F;').replace(/( )(?= )/g, '&nbsp;').replace(/\n/g, '<br />').replace(/\t/g, '&emsp;');
  };
}

exports.addEscape = addEscape;