import { Tester } from './tester.mjs';

const $t = new Tester();

$t.it('Check the library structure', () => {
  $t.assert('WCWC must export the WC class as "export class WC {...}" from src/index.ts', () => {        
    return WC;
  });

  $t.assert('WCWC must export a member called wcwc as "export const wcwc = { WC }" from src/index.ts for browser compatibility', () => {        
    return wcwc;
  });

  $t.assert('The { wcwc } exported member from src/index.ts must contain the WC class: "export const wcwc = { WC }"', () => {        
    return wcwc.WC;
  });

  $t.assert('The "wcwc.WC" and "WC" objects must be the same WC class on src/index.ts', () => {        
    return wcwc.WC === WC;
  });
})

$t.it('Check WC class { f, h, expose } statics', () => {
  $t.assert('A { f } static method should exist', () => {
    return !!WC.f && typeof WC.f === 'function';
  });

  $t.assert('A { h } static method should exist', () => {
    return !!WC.h && typeof WC.h === 'function';
  });

  $t.assert('A { expose } static method should exist', () => {
    return !!WC.expose && typeof WC.expose === 'function';
  });
});

$t.it('Check the { f } static method (Fragment)', () => {
  $t.assert('WC.f() === undefined', () => {
    return WC.f() === undefined;
  });

  $t.assert('WC.f({}) === undefined', () => {
    return WC.f({}) === undefined;
  });

  [
    null,
    undefined,
    true,
    'Testing',
    Symbol('Test'),
    document.createElement('span'),
    document.createTextNode('Testing')
  ].every(item => {
    const result =  WC.f({ children: item }) === item;
    const itemPrint = item ? item.toString() : item;
    $t.assert(`WC.f({ children: ${itemPrint} }) === ${itemPrint}`, () => result);
    return result;
  });
});
