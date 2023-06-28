import { Tester } from '../tester/index.mjs';

const $t = new Tester();

$t.it('Check { expose } function', () => {
  const content = 'Hello world';

  (class TestComponent extends WC {
    render() {
      return content;
    }
  }).expose('test-component');

  function checkBasics() {
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
  }

  function checkShadowedOpened() {
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
      const result = !!shadowed.shadowRoot;
      return result;
    });
  
    $t.assert('The shadow root mode must be the same that was passed to exposed option', () => {
      return shadowed.shadowRoot.mode === 'open';
    });
  
    shadowed.remove();
  }

  function checkShadowedClosed() {
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
  }

  checkBasics();
  checkShadowedOpened();
  checkShadowedClosed();
});


$t.it(`Check { expose } props declaration and props reactivity`, () => {
  $t.assert('Non exposed props will not be reactive, wont trigger update and and wont be on this.props object', () => {
    (class TestComponent extends WC {
      ok = true;

      render() { 
        return this.props.testing || '';
      }

      updated() {
        this.ok = false;
      }

      unmounted() {
        this.$el.__done(this.ok && !this.props.testing);
      }
    }).expose('wc-prop-check-a');

    return new Promise(resolve => {
      const c = document.createElement('wc-prop-check-a');
      c.__done = result => resolve(result);
      document.body.append(c);
      c.setAttribute('testing', '1');
      c.setAttribute('testing', '2');
      c.remove();  
      setTimeout(() => resolve(false), 200);
    })
  });

  $t.assert('Exposed props must be reactive, trigger update and be on this.props', () => {
    (class TestComponent extends WC {
      ok = false;

      render() { 
        return this.props.testing;
      }

      updated() {
        this.ok = true;
      }

      unmounted() {
        this.$el.__done(this.ok && this.props.testing && this.$el.textContent === '2');
      }
    }).expose('wc-prop-check-b', {
      props: {
        testing: { initial: 1 }
      }
    });

    return new Promise(resolve => {
      const c = document.createElement('wc-prop-check-b');
      c.__done = result => resolve(result);
      document.body.append(c);
      c.setAttribute('testing', '2');
      c.remove();
      setTimeout(() => resolve(false), 200);
    });
  });

  $t.assert('Exposed props with { css: true } must mirror to css prop', () => {
    (class TestComponent extends WC {
      render() { 
        return '';
      }

      mounted() {
        const propCheck = window.getComputedStyle(this.$el).getPropertyValue('--wc-attr-testCssColor');
        
        this.$el.__done(propCheck === 'blue');
      }
    }).expose('wc-prop-check-c', {
      props: {
        testCssColor: { 
          css: true,
          initial: 'blue'
        }
      }
    });

    return new Promise(resolve => {
      const c = document.createElement('wc-prop-check-c');
      c.__done = result => resolve(result);
      document.body.append(c);
      c.remove();
      setTimeout(() => resolve(false), 200);
    });    
  });
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
        this.$el.__done(name === 'testing' && oldv === '1' && newv === '2');
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

$t.it('Check Component Lifecycle Hooks { Shadow Mode }', () => {
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
    }).expose('wc-before-mount-shadowed', { shadow: { mode: 'open' } });

    const c = document.createElement('wc-before-mount-shadowed');
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
    }).expose('wc-mounted-shadowed', { shadow: { mode: 'open' } });
    
    return new Promise(resolve => {
      const c = document.createElement('wc-mounted-shadowed');
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
    }).expose('wc-before-update-shadowed', { shadow: { mode: 'open' } });
    
    return new Promise(resolve => {
      const c = document.createElement('wc-before-update-shadowed');
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
    }).expose('wc-updated-shadowed', { shadow: { mode: 'open' } });
    
    return new Promise(resolve => {
      const c = document.createElement('wc-updated-shadowed');
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
    }).expose('wc-unmounted-shadowed', { shadow: { mode: 'open' } });
    
    return new Promise(resolve => {
      const c = document.createElement('wc-unmounted-shadowed');
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
        this.$el.__done(name === 'testing' && oldv === '1' && newv === '2');
      }
    }).expose('wc-attr-changed-shadowed', {
      shadow: { mode: 'open' },
      props: {
        testing: { initial: 1 }
      }
    });
    
    return new Promise(resolve => {
      const c = document.createElement('wc-attr-changed-shadowed');
      c.__done = result => resolve(result);
      document.body.append(c);
      c.setAttribute('testing', '2');
      setTimeout(() => resolve(false), 200);
    });
  });  
});
