import { h, WC, Fragment } from '..';
import style from './style.scss';

class Counter extends WC {
  static styles = [ style ];
  static attrs = [ 'start' ];

  data: { count: number } = this.$({
    count: this.props.start
  });

  render() {
    console.log(this.props);
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