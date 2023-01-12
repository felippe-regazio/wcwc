import { h, Fragment, Component } from '../core';

class MyComponent extends Component {
  shadow: ShadowRootInit = { mode: 'open' };

  template() {
    return (
      <Fragment>
        <h1>Hello World</h1>
        <my-custom-element-again></my-custom-element-again>
      </Fragment>
    )
  }
}

MyComponent.expose('my-custom-element');