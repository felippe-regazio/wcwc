export declare const WC_REGISTERED_STYLES: {
    [tagName: string]: string;
};
export declare class WC extends HTMLElement {
    protected $store?: unknown;
    protected $shadow?: ShadowRootInit;
    protected $style?: '*.scss'[];
    protected $children: ChildNode[];
    connectedCallback(): void;
    protected render(): void;
    protected root(): this | ShadowRoot | null;
    private addStyles;
    private createStore;
    protected $attrs(defaults?: unknown): unknown;
    static expose(tagname: string): void;
    protected $template(): string;
}
export * from 'nano-jsx';
