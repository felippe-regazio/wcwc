export declare const WC_REGISTERED_STYLES: {
    [tagName: string]: string;
};
export declare class WC extends HTMLElement {
    private __template;
    protected $shadow?: ShadowRootInit;
    protected $styles?: '*.scss'[];
    protected $store: unknown;
    connectedCallback(): void;
    protected root(): this | ShadowRoot | null;
    protected render(): Promise<void>;
    private domDiff;
    private addStyles;
    protected reactiveStore(data?: {}): any;
    static expose(tagname: string): void;
    protected template(): string;
}
export * from 's-js';
export * from 'nano-jsx';
