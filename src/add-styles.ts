export async function addStyles(options: addStylesOptions): Promise<boolean> {
  return new Promise((resolve, reject) => {
    try {
      const { origin, styles, tagname } = options;
      const styleContent = ((styles || []).map((s: '*.scss') => s.toString()).join('')).trim();

      if (!origin.isConnected || typeof window === 'undefined' || !styleContent) {
        return resolve(true);
      }
      
      const root = origin.getRootNode() as Document|ShadowRoot;
      const shadowed = root instanceof ShadowRoot;

      if (!shadowed && root?.head?.querySelector(`style[data-wc-name=${tagname}]`)) {
        return resolve(true);
      }
      
      const style = Object.assign(document.createElement('style'), {
        textContent: styleContent
      });
  
      style.dataset.tagname = tagname;
      const target = shadowed ? root : (root as any)?.head;
      target.append(style);

      return resolve(true);
    } catch(error) {
      console.error(error);
      return reject(false);
    }
  })
}