import { Component } from 'nano-jsx';
import { defineAsCustomElements } from './expose';

export class WC extends Component {
  static styles?: '*.scss'[];
  static attrs?: string[];

  $(v: unknown): any {
    const state = (data = {}, cb?: Function) => {
      return new Proxy(data, {
        get: (obj: any, prop: any) => {
          if (prop === '_isProxy') {
            return true;
          }
  
          if ((Array.isArray(obj[prop]) || typeof obj[prop] === 'object') && !obj[prop]._isProxy) {
            obj[prop] = state(obj[prop], cb);
          }
            
          return obj[prop];
        },
  
        set: (obj: any, prop: any, value: any) => {
          if (obj[prop] === value) {
            return true
          };
  
          obj[prop] = value;
          cb && cb();
          return true;
        },
  
        deleteProperty: (obj: any, prop: any) => {
          delete obj[prop];
          cb && cb();
          return true;
        }
      });
    };

    return state(v || {}, () => this.update());
  }

  public static expose(tagname: string, shadow?: ShadowRootInit) {
    defineAsCustomElements(
      this,     // nano component name
      tagname,  // custom element name
      shadow    // shadow dom mode (optional)
    );
  }
}

export * from 'nano-jsx';