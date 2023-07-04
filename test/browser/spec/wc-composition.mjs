import { Tester } from '../tester/index.mjs';

const $t = new Tester();

$t.it('Check component composition', () => {
  $t.assert('By append', () => {
    (class WCLevelA extends WC {
      render() { return this.props.children };
    }).expose('wc-append-level-a');
  
    (class WCLevelB extends WC {
      render() { return this.props.children };
    }).expose('wc-append-level-b');
  
    (class WCLevelC extends WC {
      static styles = [`
        wc-append-level-c {
          border: solid 1px #bbb;
          display: block;
          padding: 16px;
          max-width: 300px;
          border-radius: 8px;
          margin: 16px 0;
        }
      `];
  
      render() { return 'Checking component composition' };
    }).expose('wc-append-level-c');  
  
    const a = document.createElement('wc-append-level-a');
    const b = document.createElement('wc-append-level-b');
    const c = document.createElement('wc-append-level-c');
  
    a.append(b);
    b.append(c);
    $t.assert(a);

    const result = a.firstChild === b && b.firstChild === c;
    a.remove();
    return result;
  });

  $t.assert('By props.children', () => {
    class WCLevelA extends WC {
      render() { return this.props.children };
    }
  
    class WCLevelB extends WC {
      render() { return this.props.children };
    }
    
    class WCLevelC extends WC {
      static styles = [`
        wc-children-level-c {
          border: solid 1px #bbb;
          display: block;
          padding: 16px;
          max-width: 300px;
          border-radius: 8px;
          margin: 16px 0;
        }
      `];
  
      render() { return this.props.children };
    }
    
    WCLevelA.expose('wc-children-level-a');
    WCLevelB.expose('wc-children-level-b');
    WCLevelC.expose('wc-children-level-c');    
    
    const div = Object.assign(document.createElement('div'), {
      innerHTML: `
        <wc-children-level-a>
          <wc-children-level-b> 
            <wc-children-level-c>Checking component composition</wc-children-level-c>  
          </wc-children-level-b>
        </wc-children-level-a>
      `
    });

    $t.assert(div);

    const result = (
      div.firstElementChild.tagName.toLowerCase() === 'wc-children-level-a' && 
      div.firstElementChild.firstElementChild.tagName.toLowerCase() === 'wc-children-level-b' && 
      div.firstElementChild.firstElementChild.firstElementChild.tagName.toLowerCase() === 'wc-children-level-c'
    );

    div.remove();
    return result;
  });  

  $t.assert('Props Children vs Element Children', () => {
    const expectedContent = 'Element initial HTML was overwrited by render';

    (class wcPropsVsChildren extends WC {
      render() { return expectedContent };
    }).expose('wc-props-vs-children');

    const $wcPropsVsChildren = Object.assign(document.createElement('wc-props-vs-children'), {
      innerHTML: 'Initial InnerHTML'
    });

    $t.assert($wcPropsVsChildren);
    const result = $wcPropsVsChildren.textContent === expectedContent;
    $wcPropsVsChildren.remove();

    return result;
  });
});
