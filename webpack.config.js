const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (_env, argv) => {
  const { mode } = argv;

  const config = {
    mode,
    target: 'web',
    entry: {
      jsx: path.resolve('src', 'jsx.ts'),
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
      globalObject: 'globalThis',
      library: {
        type: 'umd'
      }
    }
  }

  if (mode === 'production') {
    config.optimization = {
      minimize: true,
      minimizer: [ new TerserPlugin() ]    
    }
  }

  if (mode === 'development') {
    Object.assign(config, {
      devtool: 'inline-source-map',
      
      devServer: {
        port: 9000,
        static: {
          directory: path.join(__dirname, 'test', 'browser'),
        }
      }    
    });
  }
  
  return config;
}