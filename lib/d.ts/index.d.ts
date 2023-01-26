import { Component } from 'nano-jsx';
import { h } from 'nano-jsx/lib/core';
import { Fragment } from 'nano-jsx/lib/fragment';
export declare class WC extends Component {
    static h: typeof h;
    static f: typeof Fragment;
    static styles?: '*.scss'[];
    static attrs?: string[];
    $(v: object): any;
    static expose(tagname: string, shadow?: ShadowRootInit): void;
}
export declare const wcwc: {
    WC: typeof WC;
};
//# sourceMappingURL=index.d.ts.map