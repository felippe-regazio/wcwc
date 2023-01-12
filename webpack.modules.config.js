const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const SRC_FOLDER = path.resolve(__dirname, 'src');

const MODULES_LIST = ['tsx', 'ts'].reduce((list, ext) => {
  return list.concat(glob.sync(path.resolve(SRC_FOLDER, '**', `*.${ext}`)));
}, []);

module.exports = (_env, argv) => {
  const { mode } = argv;

  return MODULES_LIST.map((m) => {
    const { name, dir } = path.parse(m);
    const dest_dir = path.relative(SRC_FOLDER, dir);
    
    const M_CONFIG = {
      mode,
      entry: {
        [name]: m,
      },
      resolve: {
        symlinks: true,
        extensions: ['.ts', '.tsx', '.js']
      },
      plugins: [
        new webpack.DllReferencePlugin({
          manifest: path.resolve(__dirname, 'lib', 'shared', 'shared-manifest.json')
        })
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
        filename: `[name].js`,
        chunkFilename: `${name}.[chunkhash].js`,
        path: path.resolve(__dirname, 'lib', dest_dir),
        globalObject: 'this',
        library: {
          type: 'umd',
        }
      },
      optimization: {
        splitChunks: {
          cacheGroups: {
            commons: {
              name: "commons",
              chunks: "initial",
              minChunks: 2,
              minSize: 0
            }
          }
        },
        chunkIds: "deterministic"
      }
    }

    if (mode === 'development') {
      M_CONFIG.devtool = 'source-map';
    }
    
    return M_CONFIG;
  });
}