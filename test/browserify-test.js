/* Copyright (c) 2012-2016 LevelUP contributors
 * See list at <https://github.com/level/levelup#contributing>
 * MIT License <https://github.com/level/levelup/blob/master/LICENSE.md>
 */

var assert = require('referee').assert
var refute = require('referee').refute
var buster = require('bustermove')
var browserify = require('browserify')
var path = require('path')

var PACKAGE_JSON = path.join(__dirname, '..', 'package.json')

buster.testCase('Browserify Bundle', {
  'does not contain package.json': function (done) {
    var b = browserify(path.join(__dirname, '..'), {browserField: true})
      .once('error', function (error) {
        assert.fail(error)
        done()
      })
    b.pipeline
      .on('file', function (file, id, parent) {
        refute.equals(file, PACKAGE_JSON)
      })
    b.bundle(done)
  }
})
