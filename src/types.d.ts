type ComponentConfig = {
  shadow?: ShadowRootInit,
  props?: ComponentConfigProps
}

type ComponentConfigProps = { 
  [key: string|symbol|number]: ComponentConfigPropValue
};

type ComponentConfigPropValue = { 
  default: unknown, 
  css?: boolean|string
};