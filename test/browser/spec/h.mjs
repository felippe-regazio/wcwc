import { Tester } from '../tester/index.mjs';

const h = WC.h;
const Fragment = WC.f;
const $t = new Tester();

$t.it('Check { h } module', () => {
  $t.assert('A Fragment must simply return children (no parent)', () => {
    return `${Fragment({ children: 1 })} ${Fragment({})}` === `1 undefined`;
  });
});
