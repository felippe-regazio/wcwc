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
  origin: HTMLElement
}

type StaticStyle = string | '*.scss';
