import s from './style.scss';
import { h, Fragment, WC } from '../core';

class MyComponent extends WC {
  styles = [ s ];
  $count = 0;

  template() {
    return (
      <>
        <h1>{this.$count}</h1>
        <button onClick={this.inc}>+ Inc</button>
        <button onClick={this.dec}>- Dec</button>
      </>
    )
  }

  inc() {
    this.$count++
  }

  dec() {
    this.$count--;
  }
}

MyComponent.expose('my-custom-element');