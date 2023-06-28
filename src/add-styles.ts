/**
 * This function takes a .scss imported file (array style) or a String
 * and adds to the page as a <style> script. First it will extract the
 * style string, then will check if this style were already added. If 
 * not, will add the style. Elements with shadow dom will have the inner
 * styles always appended.
 * 
 * @param options: addStyleOptions
 * @returns Promise<boolean>
 */
export async function addStyles(options: addStylesOptions): Promise<boolean> {
  return new Promise((resolve, reject) => {
    try {
      const { origin, styles, dataId } = options;
      
      const styleContent = (styles || [])
        .map((s: StaticStyle) => s.toString())
        .join(' ')
        .trim();

      if (typeof window === 'undefined' || !styleContent) {
        return resolve(true);
      }
      
      const root = (origin.shadowRoot || origin).getRootNode() as Document|ShadowRoot;
      const shadowed = root instanceof ShadowRoot;

      if (!shadowed && root?.head?.querySelector(`style[data-id=${dataId}]`)) {
        return resolve(true);
      }
      
      const style = Object.assign(document.createElement('style'), {
        textContent: styleContent
      });
  
      style.dataset.id = dataId;
      const target = shadowed ? root : (root as any)?.head;
      target.append(style);

      return resolve(true);
    } catch(error) {
      console.error(error);
      return reject(false);
    }
  })
}
