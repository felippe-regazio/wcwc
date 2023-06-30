const { jsx, h, Fragment } = require('../../../lib/jsx.js');
const check = require('./checker.js');

check(jsx, h, Fragment, '\nTesting if { jsx, h, Fragment } are correctly exposed as a EcmaScript Module.');