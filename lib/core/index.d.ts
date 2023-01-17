export declare const WC_REGISTERED_STYLES: {
    [tagName: string]: string;
};
export declare class WC extends HTMLElement {
    protected shadow?: ShadowRootInit;
    protected styles?: '*.scss'[];
    connectedCallback(): void;
    protected root(): this | ShadowRoot | null;
    protected addStyle(): Promise<void>;
    protected render(): Promise<void>;
    static expose(tagname: string): void;
    protected template(): string;
}
export * from 'nano-jsx';
