'use strict';

// 存在チェック
var Log = Log || {};

Log = function(name) {
  this.name = name;
  this.toString = function() {
    return "Person:" + this.name + "]";
  }
}

module.exports = Log;
