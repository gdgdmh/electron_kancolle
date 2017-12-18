'use strict';

// 存在チェック
var Log = Log || {};

Log = function(name) {
  this.name = name;
  this.console = function(write_string) {
    console.log(write_string);
  }
  this.write = function(write_string) {
    var fs = require('fs');
    var path = require('path');
    fs.appendFile(path.join(__dirname, 'log.txt'), write_string + "\n", 'UTF-8', function(err) {
      if (err) {
        // error発生したらコンソールに出力
        console.log(err);
      }
    })
  }

}

module.exports = Log;
