const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const NANOJSX_DEPS = fs.readdirSync(path.resolve(__dirname, 'node_modules', 'nano-jsx', 'lib'))
  .filter(item => item.endsWith('.js'))
  .map(item => `nano-jsx/lib/${item}`);

module.exports = [
  {
    entry: [ 'nano-jsx', ...NANOJSX_DEPS ],
    output: {
      library: 'shared',
      filename: 'shared.js',
      libraryTarget: 'umd',
      path: path.resolve(__dirname, 'lib', 'shared')
    },
    plugins: [
      new webpack.DllPlugin({
        name: 'shared',
        path: path.resolve(__dirname, 'lib', 'shared', 'shared-manifest.json')
      })
    ]
  }
];