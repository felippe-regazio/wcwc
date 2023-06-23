import WCWC from '../../lib/index.js';
import check from './exported.js';
const { WC, wcwc } = WCWC;

check(WC, wcwc, '\nTesting if WCWC is correctly exposed as a CommonJS Module.');