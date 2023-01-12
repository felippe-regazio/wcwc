export declare class Component extends HTMLElement {
    protected shadow?: ShadowRootInit;
    connectedCallback(): void;
    protected root(): this | ShadowRoot | null;
    protected render(): void;
    static expose(tagname: string): void;
    protected template(): void;
}
export * from 'nano-jsx';
