import { Tester } from '../tester/index.mjs';

const $t = new Tester();

$t.it('Check add-styles module', () => {
  $t.assert('Static property "styles" must assign a style tag to the page', async () => {
    const styleContent = '--style-test: 1';

    (class TestComponent extends WC {
      static styles = [ styleContent ]

      render() { 
        return '' 
      }

      mounted() {
        this.$el.check();
      }
    }).expose('c-style-a');

    return new Promise(resolve => {
      const $el = document.createElement('c-style-a');
      
      $el.check = () => {
        const styleElement = document.head.querySelector('style[data-id=c-style-a]');
        const styleContentOk = styleContent === styleElement.innerHTML;
        resolve(!!styleElement && styleContentOk);
      }
      
      document.body.append($el);
    });
  });

  $t.assert('Same multiple components must assign only one style to the Head', async () => {
    (class TestComponent extends WC {
      static styles = [ '--style-test: 2' ]

      render() { 
        return '' 
      }

      mounted() {
        this.$el.check && this.$el.check();
      }
    }).expose('c-style-b');

    return new Promise(resolve => {
      const $elA = document.createElement('c-style-b');
      const $elB = document.createElement('c-style-b');
      const $elC = document.createElement('c-style-b');
      const $elD = document.createElement('c-style-b');
      
      $elD.check = () => {
        const styles = document.querySelectorAll('style[data-id=c-style-b]');

        resolve(styles.length === 1);
      }

      document.body.append($elA, $elB, $elC);
      document.body.append($elD);
    });
  });
  
  $t.assert('Shadowed components must adopt style sheet internally', async () => {
    const styleContent = ':host { display: none; }';
      
    (class ShadowedOpened extends WC {
      static styles = [ styleContent ]

      render() {
        return 'Hello world';
      }
    }).expose('shadowed-open-styled-component', {
      shadow: { mode: 'open' }
    });
  
    const shadowed = document.createElement('shadowed-open-styled-component');
    document.body.append(shadowed);
    const adoptedStyle = shadowed.shadowRoot.adoptedStyleSheets[0].cssRules[0].cssText;
    shadowed.remove();

    return adoptedStyle === styleContent;
  });
});