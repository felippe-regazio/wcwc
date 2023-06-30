import { Tester } from '../tester/index.mjs';

const $t = new Tester();

$t.it('Check the library structure', () => {
  $t.assert('WCWC must export the WC class as "export class WC {...}" from src/index.ts', () => {
    return !!WC;
  });

  $t.assert('WCWC must export a member called wcwc as "export const wcwc = { WC }" from src/index.ts for browser compatibility', () => {        
    return !!wcwc;
  });

  $t.assert('The { wcwc } exported member from src/index.ts must contain the WC class: "export const wcwc = { WC }"', () => {        
    return !!wcwc.WC;
  });

  $t.assert('The "wcwc.WC" and "WC" objects must be the same WC class on src/index.ts', () => {        
    return wcwc.WC === WC;
  });
});
