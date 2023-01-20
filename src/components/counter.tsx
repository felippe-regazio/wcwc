import { h, WC, Fragment } from '../core';
import style from './style.scss';

class Counter extends WC {
  static styles = [ style ];

  data: { count: number } = this.$({
    count: 0
  });

  render() {
    return (
      <>
        <h1>{this.data.count}</h1>

        <button onclick={() => this.data.count--}>
          Dec
        </button>
        
        <button onclick={() => this.data.count++}>
          Inc
        </button>

        { this.props.children }      
      </>
    )
  }
}

Counter.expose('my-custom-element');