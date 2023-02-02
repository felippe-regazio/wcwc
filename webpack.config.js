const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (_env, argv) => {
  const { mode } = argv;

  const config = {
    mode,
    target: 'web',
    entry: {
      index: path.resolve('src', 'index.ts')
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /(node_modules)/,
          use: {  
            loader: 'ts-loader'
          }
        },
      ]
    },
    output: {
      filename: `[name].js`,
      path: path.resolve(__dirname, 'lib'),
      library: {
        type: 'umd'
      }
    },
    optimization: {
      minimize: true,
      minimizer: [ new TerserPlugin() ]    
    }
  }

  if (mode === 'development') {
    config.devtool = 'inline-source-map';
  }
  
  return config;
}