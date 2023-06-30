import JSX from '../../../lib/jsx.js';
const { jsx, h, Fragment } = JSX;
import check from './checker.js';

check(jsx, h, Fragment, '\nTesting if { jsx, h, Fragment } are correctly exposed as a CommonJS Module.');