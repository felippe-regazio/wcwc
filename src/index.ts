import { Component } from 'nano-jsx';
import { defineAsCustomElements } from './expose';
import { h } from 'nano-jsx/lib/core';
import { Fragment } from 'nano-jsx/lib/fragment';

export class WC extends Component {
  static h: typeof h = h;
  static f: typeof Fragment = Fragment;

  static styles?: '*.scss'[];
  static attrs?: string[];

  $(v: object): any {
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
      this,    // nano component
      tagname, // custom element name
      shadow   // shadow dom mode (optional)
    );
  }
}

export const wcwc = { WC }