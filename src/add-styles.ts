export const REGISTERED_STYLE_URL: { [key: string]: string } = {};

export async function addStyles(options: addStylesOptions): Promise<boolean> {
  return new Promise((resolve, reject) => {
    try {
      const { origin, styles, tagname } = options;

      if (!origin.isConnected || typeof window === 'undefined' || !styles || !styles.length) {
        return resolve(true);
      }
      
      const root = origin.getRootNode() as Document|ShadowRoot;
      const shadowed = root instanceof ShadowRoot;

      if (!shadowed && root?.head?.querySelector(`link[data-wc-name=${tagname}]`)) {
        return resolve(true);
      }
  
      let styleObjectURL = REGISTERED_STYLE_URL[tagname];
  
      if (!styleObjectURL) {
        const styleText: string = (styles.map((s: '*.scss') => s.toString()).join('')).trim();
        const blob = new Blob([ styleText ], {type: 'text/css'});
        styleObjectURL = window.URL.createObjectURL(blob);
        REGISTERED_STYLE_URL[tagname] = styleObjectURL;
      }
  
      const link = Object.assign(document.createElement('link'), {
        rel: 'stylesheet',
        href: styleObjectURL
      });
  
      link.dataset.tagname = tagname;
      const target = shadowed ? root : (root as any)?.head;
      target.append(link);
      
      return resolve(true);
    } catch(error) {
      console.error(error);
      return reject(false);
    }
  })
}