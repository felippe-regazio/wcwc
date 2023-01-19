import { h, Fragment, WC } from '../core';
import style from './style.scss';

class MyComponent extends WC {
  protected $shadow?: ShadowRootInit = { mode: 'open' };
  $style = [ style ];

  $props: any = this.$attrs({
    start: 0
  });

  $store: { count: (()=>number)|number } = {
    count: () => this.$props.start
  };

  $template() {
    return (
      <>
        <p>Started at: {this.$props.start}</p>

        <p class={`hello world`} onclick={console.log}>
          { this.$store.count }
        </p>

        {this.$store.count === 2 &&
          <p>ZERO</p>
        }

        <button onclick={() => this.inc()}>+ Inc</button>
        <button onclick={() => this.dec()}>- Dec</button>
        <hr />
        {this.$children}
      </>
    )
  };

  inc() {
    (this.$store.count as number)++
  };

  dec() {
    (this.$store.count as number)--;
  };
}

MyComponent.expose('my-custom-element');