module.exports = function (WC, wcwc, msg = '') {
  try {
    console.log(msg);
  
    if (!WC) {
      error('WCWC must export the WC class as "export class WC {...}" from src/index.ts');
    }
  
    if (!wcwc) {
      error('WCWC must export a member called wcwc as "export const wcwc = { WC }" from src/index.ts for browser compatibility');
    }
  
    if (!wcwc.WC) {
      error('The { wcwc } exported member from src/index.ts must contain the WC class: "export const wcwc = { WC }"');
    }
  
    if (wcwc.WC !== WC ) {
      error('The "wcwc.WC" and "WC" objects must be the same WC class on src/index.ts');
    }
  
    console.log('Done.\n')
  } catch (error) {
    console.error(error);
  }
}