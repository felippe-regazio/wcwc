import { Tester } from '../tester/index.mjs';

const h = WC.h;
const Fragment = WC.f;
const $t = new Tester();

$t.it('Check { h } module', () => {
  $t.assert('A Fragment must simply return its children (no parent)', () => {
    return `${Fragment({ children: 1 })} ${Fragment({})}` === `1 undefined`;
  });

  $t.assert('{ h } element creation. E.g. h("SVG|DIV|SPAN|P|H1")', () => {
    return [
      'svg',
      'div',
      'span',
      'p',
      'h1'
    ].map(tagName => {
      return { input: tagName, output: h(tagName) };
    }).every(item => {
      return item.input.toUpperCase() === item.output.tagName.toUpperCase();
    });
  });

  $t.assert('{ h } with props children', () => {
    const children = [ 
      document.createElement('div'), 
      document.createElement('p'), 
      document.createElement('i'), 
    ];

    const el = h('div', { children });

    return children.every((item, index) => Array.from(el.children)[index] === item);
  });

  $t.assert('{ h } with element children', () => {
    const children = [ 
      document.createElement('div'), 
      document.createElement('p'), 
      document.createElement('i'), 
    ];

    const el = h('div', {}, children);

    return children.every((item, index) => Array.from(el.children)[index] === item);
  });

  $t.assert('{ h } with props & element children', () => {
    const elemChildren = [
      document.createElement('h1'),
      document.createElement('h2'), 
      document.createElement('h3'), 
    ];

    const propsChildren = [ 
      document.createElement('h4'),
      document.createElement('h5'), 
      document.createElement('h6'), 
    ];

    const checkChildren = [].concat(elemChildren, propsChildren);
    const el = h('div', { children: propsChildren }, elemChildren);

    return checkChildren.every((item, index) => Array.from(el.children)[index] === item);
  });

  $t.assert('{ h } with Object as arg', () => {
    const div = document.createElement('div');
    const result = h(div, { test: true }, [ 'testing' ]);
    return result.component === div && result.props.test && result.props.children[0] === 'testing';
  });

  $t.assert('{ h } bindProps()', () => {
    let eventBindingOk = false;

    const element = h('div', {
      style: { display: 'flex', alignItems: 'center' },
      class: 'fizz buzz',
      'data-x': 'fizz',
      'disabled': true,
      innerHTML: 'testing',
      onClick: () => { eventBindingOk = true; }
    });

    element.click();

    return (
      element.style.display === 'flex' &&
      element.style.alignItems === 'center' &&
      element.classList.contains('fizz', 'buzz') &&
      element.dataset.x === 'fizz' &&
      element.getAttribute('disabled') === 'true' &&
      element.textContent === 'testing' &&
      eventBindingOk
    );
  });
});
