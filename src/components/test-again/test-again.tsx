import { h } from 'nano-jsx/lib/core'
import { Component } from '../../core'

class MyComponent extends Component {
  hello: string = 'world again';

  template() {
    return (
      <div>
        <h1>Hello {this.hello}</h1>
        <button onclick={() => (this.hello = 'noooo')}>Hello</button> 
      </div>
    )
  }
}

MyComponent.expose('my-custom-element-again');