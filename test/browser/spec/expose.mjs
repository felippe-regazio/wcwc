import { Tester } from '../tester/index.mjs';

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

$t.it('Check Component Lifecycle Hooks', () => {
  $t.assert('beforeMount', () => {
    const keycheck = '__wcBeforeMountCheck';

    (class TestComponent extends WC {
      render() { 
        this.rendered = true;
        return 'Hello world'; 
      }
      
      beforeMount() {
        window[keycheck] = this.rendered;
      }
    }).expose('wc-before-mount');

    const c = document.createElement('wc-before-mount');
    document.body.append(c);
    c.remove();

    return window[keycheck] === undefined;
  });

  $t.assert('mounted', async () => {
    (class TestComponent extends WC {
      render() { 
        return Object.assign(document.createElement('div'), { id: 'mounted', style: 'display: none' }); 
      }
      
      beforeMount() {
        this.mustBeTrue = !this.$el && !this.isConnected;
      }

      mounted() {
        this.$el.__mounted(this.mustBeTrue && this.$el.isConnected);
      }
    }).expose('wc-mounted');
    
    return new Promise(resolve => {
      const c = document.createElement('wc-mounted');
      c.__mounted = result => resolve(result);
      
      document.body.append(c);
      setTimeout(() => resolve(false), 200);
    });
  });

  $t.assert('beforeUpdate', async () => {
    (class TestComponent extends WC {
      data = this.reactive({ content: 1 })

      render() { 
        return Object.assign(document.createElement('div'), {
          style: 'display: none',
          textContent: this.data.content
        }); 
      }

      mounted() {
        this.data.content = 2;
      }
      
      beforeUpdate() {
        this.$el.__beforeUpdate(this.$el.textContent.trim() === '1');
      }
    }).expose('wc-before-update');
    
    return new Promise(resolve => {
      const c = document.createElement('wc-before-update');
      c.__beforeUpdate = result => resolve(result);
      
      document.body.append(c);
      setTimeout(() => resolve(false), 200);
    });
  });

  $t.assert('updated', async () => {
    (class TestComponent extends WC {
      data = this.reactive({ content: 1 })

      render() { 
        return Object.assign(document.createElement('div'), {
          style: 'display: none',
          textContent: this.data.content
        }); 
      }

      mounted() {
        this.data.content = 2;
      }
      
      updated() {
        this.$el.__updated(this.$el.textContent.trim() === '2');
      }
    }).expose('wc-updated');
    
    return new Promise(resolve => {
      const c = document.createElement('wc-updated');
      c.__updated = result => resolve(result);
      
      document.body.append(c);
      setTimeout(() => resolve(false), 200);
    });
  });

  $t.assert('unmounted', async () => {
    (class TestComponent extends WC {
      render() { 
        return Object.assign(document.createElement('div'), {
          style: 'display: none',
          textContent: 'should be unmounted'
        }); 
      }

      mounted() {
        this.wasmounted = this.$el.isConnected;
      }

      unmounted() {
        this.$el.__unmounted(this.wasmounted && !this.$el.isConnected);
      }
    }).expose('wc-unmounted');
    
    return new Promise(resolve => {
      const c = document.createElement('wc-unmounted');
      c.__unmounted = result => resolve(result);
      
      document.body.append(c);
      c.remove();
      
      setTimeout(() => resolve(false), 200);
    });
  });

  $t.assert('attrChanged', async () => {
    (class TestComponent extends WC {
      attrs = [];

      render() { 
        return Object.assign(document.createElement('div'), { style: 'display: none' });
      }

      attrChanged(name, oldv, newv) {
        if (oldv === '1' && newv === '2') {
          this.$el.__done(true);
        }
      }
    }).expose('wc-attr-changed', {
      props: {
        testing: { initial: 1 }
      }
    });
    
    return new Promise(resolve => {
      const c = document.createElement('wc-attr-changed');
      c.__done = result => resolve(result);
      document.body.append(c);
      c.setAttribute('testing', '2');
      setTimeout(() => resolve(false), 200);
    });
  });  
});
