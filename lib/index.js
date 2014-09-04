'use strict';

var path = require('path');
var exec = require('child_process').exec;

// save local references to our parameters
var gulp = null;
var config = null;

/**
 * Adds the check coverage task to gulp
 *
 * @param {Object} gulpRef The instance of gulp to add the task to
 * @param {Object} conf The configuration options
 */
function checkCoverageSetup(gulpRef, conf) {
  gulp = gulpRef;
  config = conf;

  gulp.task('checkCoverage', false, ['unit'], checkCoverageTask);
}

/**
 * Runs the check-coverage task
 */
function checkCoverageTask() {
  var istanbulPath = path.resolve(__dirname, '../node_modules/.bin/istanbul');
  var coverageFiles = path.resolve(config.root, 'docs/coverage/**/coverage*.json');

  var cmd = istanbulPath;
  cmd += ' check-coverage';
  cmd += ' --statements ' + config.statements_threshold;
  cmd += ' --functions ' + config.functions_threshold;
  cmd += ' --branches ' + config.branches_threshold;
  cmd += ' --lines ' + config.lines_threshold;
  cmd += ' ' + coverageFiles;

  exec(cmd, execCallback);
}

/**
 * Handles the output recieved from the execute command
 *
 * @param {Object} err Any error that occured while executing the command
 * @param {Buffer} stdout The stdout given back by the executable
 * @param {Buffer} stderr The stderr given back by the executable
 */
function execCallback(err, stdout, stderr) {
  console.log(stdout);
  console.error(stderr);

  if (err) {
    throw err;
  }
}

module.exports = checkCoverageSetup;
