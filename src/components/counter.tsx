import { h, Fragment, WC } from '../core';
import style from './style.scss';

class MyComponent extends WC {
  protected shadow?: ShadowRootInit | undefined;
  protected styles: '*.scss'[] = [ style ];
  
  protected state: any = {
    count: 0
  };

  template() {
    return (
      <>
        <h1>{this.state.count}</h1>
        <button onClick={this.inc}>+ Inc</button>
        <button onClick={this.dec}>- Dec</button>
      </>
    )
  }

  inc() {
    this.state.count++
  }

  dec() {
    this.state.count--;
  }
}

MyComponent.expose('my-custom-element');