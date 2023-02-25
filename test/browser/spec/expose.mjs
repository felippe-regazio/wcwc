import { Tester } from './tester.mjs';

const $t = new Tester();

$t.it('Check { expose } method WC creation', () => {
  const content = 'Hello world';

  (class TestComponent extends WC {
    render() {
      return content;
    }
  }).expose('test-component');

  $t.assert('Expose function must define the component as a Vanilla WC', () => {    
    const testComponent = document.createElement('test-component');
    document.body.append(testComponent);
    const result = testComponent.innerHTML === content;
    testComponent.remove();
    return result;
  });

  $t.assert('The element must not render when in memory-only mode (if not connected to the DOM)', () => {
    const testComponent = document.createElement('test-component');
    return !testComponent.innerHTML;
  });
});


$t.it(`Check { expose } with { mode: 'open' } option - Shadow DOM WC`, () => {
  const content = 'Hello world';

  (class ShadowedOpened extends WC {
    render() {
      return content;
    }
  }).expose(`shadowed-component-open`, {
    shadow: { mode: 'open' }
  });

  const shadowed = document.createElement(`shadowed-component-open`);
  document.body.append(shadowed);
  const wrapper = shadowed.shadowRoot.firstChild;

  $t.assert('Expose function with { shadow: open } option must create a opened shadowed WC', () => {    
    const shadowed = document.createElement(`shadowed-component-open`);
    document.body.append(shadowed);
    const result = !!shadowed.shadowRoot;
    shadowed.remove();
    return result;
  });

  $t.assert('Shadowed component must have a single first child (wcwc component requires it to proper update)', () => {
    return shadowed.shadowRoot.childNodes.length === 1;
  });

  $t.assert('Shadowed component single first child (wrapper) must be a DIV', () => {
    return wrapper.tagName.toLowerCase() === 'div';
  });

  $t.assert('Shadowed component single wrapper DIV must have a data-wc-root="true" attribute', () => {
    return wrapper.hasAttribute('data-wc-root') && wrapper.dataset.wcRoot === 'true';
  });

  $t.assert('Shadowed component must have its content rendered inside the wrapper DIV', () => {
    return wrapper.innerHTML === content;
  });

  $t.assert('The shadow root mode must be the same that was passed to exposed option', () => {
    return shadowed.shadowRoot.mode === 'open';
  });

  shadowed.remove();
});

$t.it(`Check { expose } with { mode: 'closed' } option - Shadow DOM WC`, () => {
  const content = 'Hello world';

  (class ShadowedClosed extends WC {
    render() {
      return content;
    }
  }).expose(`shadowed-component-closed`, {
    shadow: { mode: 'closed' }
  });

  const shadowed = document.createElement(`shadowed-component-closed`);
  document.body.append(shadowed);

  $t.assert('Expose function with { shadow: closed } option must create a closed shadowed WC', () => {    
    const result = !shadowed.shadowRoot;
    shadowed.remove();
    return result;
  });

  shadowed.remove();
});

