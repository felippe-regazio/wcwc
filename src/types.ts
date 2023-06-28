type ComponentConfig = {
  shadow?: ShadowRootInit,
  props: ComponentConfigProps
}

type ComponentConfigProps = { 
  [key: string|symbol|number]: ComponentConfigPropValue
};

type ComponentConfigPropValue = { 
  initial: unknown, 
  css?: boolean|string
};

type addStylesOptions = {
  dataId: string, 
  styles: StaticStyle[], 
  origin: HTMLElement|ShadowRoot
}

type StaticStyle = string | '*.scss';
