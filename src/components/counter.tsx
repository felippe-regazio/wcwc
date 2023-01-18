import { h, Fragment, WC } from '../core';
import style from './style.scss';

class MyComponent extends WC {
  protected $shadow: ShadowRootInit = { mode: 'open' };
  protected $styles: '*.scss'[] = [ style ];
  
  protected $store: { count: number } = {
    count: 0
  };

  template() {
    return (
      <>
        <h1>{this.$store.count}</h1>

        <button onClick={() => this.inc()}>+ Inc</button>
        <button onClick={() => this.dec()}>- Dec</button>

        <div>
          <p>a</p>

          <span>
            <p>b</p>
          </span>
        </div>
      </>
    )
  }

  inc() {
    this.$store.count++
  }

  dec() {
    this.$store.count--;
  }
}

MyComponent.expose('my-custom-element');