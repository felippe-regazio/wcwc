module.exports = function (jsx, h, Fragment, msg = '') {
  try {
    console.log(msg);
  
    if (!h) {
      error('Module "jsx" must export an { h } function');
    }
  
    if (!Fragment) {
      error('Module "jsx" must export an { Fragment } function');
    }
  
    if (!jsx.h) {
      error('The { jsx } exported member from src/jsx.ts must contain the { h } function');
    }
  
    if (!jsx.Fragment) {
      error('The { jsx } exported member from src/jsx.ts must contain the { Fragment } function');
    }
  
    console.log('Done.\n')
  } catch (error) {
    console.error(error);
  }
}