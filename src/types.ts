type ExposeConfig = {
  shadow?: ShadowRootInit,
  props: unknown[]
}

type ComponentConfig = {
  shadow?: ShadowRootInit,
  props: ComponentConfigDefinedProps
}

type ComponentConfigDefinedProps = { 
  [key: string|symbol|number]: ComponentConfigPropValue
};

type ComponentConfigProps = { 
  [key: string|symbol|number]: ComponentConfigPropValue
};

type ComponentConfigPropValue = { 
  default: unknown, 
  css?: boolean|string
};

type addStylesOptions = {
  dataId: string, 
  styles: StaticStyle[], 
  origin: HTMLElement
}

type StaticStyle = string | '*.scss';
