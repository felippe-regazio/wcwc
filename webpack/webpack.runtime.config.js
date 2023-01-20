const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const NANOJSX_DEPS = fs.readdirSync(path.resolve(__dirname, 'node_modules', 'nano-jsx', 'lib'))
  .filter(item => item.endsWith('.js'))
  .map(item => `nano-jsx/lib/${item}`);

module.exports = [
  {
    entry: [ 
      'nano-jsx',
      ...NANOJSX_DEPS
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /(node_modules)/,
          use: {  loader: 'ts-loader' }
        }
      ]
    },
    output: {
      library: 'runtime',
      filename: 'runtime.js',
      libraryTarget: 'umd',
      path: path.resolve(__dirname, 'lib', 'runtime')
    },
    plugins: [
      new webpack.DllPlugin({
        name: 'runtime',
        path: path.resolve(__dirname, 'lib', 'runtime', 'runtime-manifest.json')
      })

      // consumer:
      // new webpack.DllReferencePlugin({
      //   manifest: path.resolve(__dirname, 'lib', 'runtime', 'runtime-manifest.json')
      // })      
    ]
  }
];