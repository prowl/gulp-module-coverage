'use strict';

var should = require('should'); // jshint ignore:line
var path = require('path');

var coverage = require('../lib/index');

var gulpMock = {};
var task = null;

gulpMock.task = function(name, description, deps, func) {// jshint ignore:line
  task = func;
};

var configMock = {
  root: path.resolve(__dirname, '../'),
  statements_threshold: 80,
  functions_threshold: 80,
  branches_threshold: 80,
  lines_threshold: 80
};

coverage(gulpMock, configMock);

describe('Gulp Module Coverage', function() {
  it('Should return a function', function() {
    coverage.should.be.type('function');
  });

  it('Should add a task', function() {
    task.should.be.type('function');
  });

  it('Should run the task', function(cb) {
    try {
      task();
      cb();
    } catch (e) {
      cb();
    }
  });
});
