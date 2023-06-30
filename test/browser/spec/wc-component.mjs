import { Tester } from '../tester/index.mjs';

const $t = new Tester();

$t.it('Checking Component API behavior (No shadow)', () => {
  const create = (tag, attrs = {}) => Object.assign(document.createElement(tag), attrs);

  (class WCCounter extends WC {
    data = this.reactive({ count: 0 });

    static styles = [`
      wc-counter { 
        border: solid 1px #bbb;
        display: block;
        padding: 16px;
        max-width: 300px;
        border-radius: 8px;
        margin: 16px 0;

        & p {
          margin: 0;
          margin-bottom: 8px;
        }
      }
    `];

    render() {
      const t = create('div', { innerHTML: `<p>Count: ${this.data.count}</p>` });
      t.append(create('button', { textContent: 'Dec', onclick: () => this.data.count--, style: 'margin-right: 8px' }));
      t.append(create('button', { textContent: 'Inc', onclick: () => this.data.count++ }));
      return t;
    }
  }).expose('wc-counter');
  
  const $counter = document.createElement('wc-counter');
  document.body.append($counter);

  $t.assert('Checks the component initial state', () => {
    return $counter.querySelector('p').textContent === 'Count: 0';
  });

  $t.assert('Checks the component reactive state (count +)', () => {
    $counter.querySelector('button:last-child').click();    
    return $counter.querySelector('p').textContent === 'Count: 1';
  });
  
  $t.assert('Checks the component reactive state (count -)', () => {
    $counter.querySelector('button').click();
    return $counter.querySelector('p').textContent === 'Count: 0';
  });
});

$t.it('Checking Component API behavior (Shadowed)', () => {
  const create = (tag, attrs = {}) => Object.assign(document.createElement(tag), attrs);

  (class WCCounter extends WC {
    data = this.reactive({ count: 0 });

    static styles = [`
      :host { 
        border: solid 1px #bbb;
        display: block;
        padding: 16px;
        max-width: 300px;
        border-radius: 8px;
        margin: 16px 0;
      }

      :host p {
        margin: 0;
        margin-bottom: 8px;
      }
    `];

    render() {
      const t = create('div', { innerHTML: `<p>Count: ${this.data.count}</p>` });
      t.append(create('button', { textContent: 'Dec', onclick: () => this.data.count--, style: 'margin-right: 8px' }));
      t.append(create('button', { textContent: 'Inc', onclick: () => this.data.count++ }));
      return t;
    }
  }).expose('wc-counter-shadowed', {
    shadow: { mode: 'open' }
  });
  
  const $counter = document.createElement('wc-counter-shadowed');
  document.body.append($counter);

  $t.assert('Checks the component initial state', () => {
    return $counter.shadowRoot.querySelector('p').textContent === 'Count: 0';
  });

  $t.assert('Checks the component reactive state (count +)', () => {
    $counter.shadowRoot.querySelector('button:last-child').click();    
    return $counter.shadowRoot.querySelector('p').textContent === 'Count: 1';
  });
  
  $t.assert('Checks the component reactive state (count -)', () => {
    $counter.shadowRoot.querySelector('button').click();
    return $counter.shadowRoot.querySelector('p').textContent === 'Count: 0';
  });
});