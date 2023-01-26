const path = require('path');
const glob = require('glob');

module.exports = ({ src, dest } = {}) => (_env, argv) => {
  const cwd = process.cwd();
  const { mode } = argv;

  if (!src) src = path.resolve(cwd, 'components');
  if (!dest) dest = path.resolve(cwd, 'lib');

  const MODULES_LIST = ['tsx', 'ts'].reduce((list, ext) => {
    return list
      .concat(glob.sync(path.resolve(src, '**', `*.${ext}`)))
      .filter(item => !item.endsWith('.d.ts'));
  }, []);  

  return MODULES_LIST.map((m) => {
    const { name, dir } = path.parse(m);
    const dest_dir = path.relative(src, dir);
    
    const M_CONFIG = {
      mode,
      target: 'web',
      entry: {
        [name]: m,
      },
      resolve: {
        symlinks: true,
        extensions: ['.ts', '.tsx', '.js']
      },
      module: {
        rules: [          
          {
            test: /\.s[ac]ss$/i,
            use: [
              { 
                loader: 'css-loader', 
                options: {
                  url: false,                  
                  importLoaders: 1,
                  sourceMap: mode === 'development'
                },
              },
              { 
                loader: 'sass-loader'
              },
            ],
          },
          {
            test: /\.tsx?$/,
            exclude: /(node_modules)/,
            use: {  loader: 'ts-loader' }
          },
        ]
      },
      output: {
        filename: '[name].js',
        chunkFilename: `${name}.[chunkhash].js`,
        path: path.resolve(__dirname, dest, dest_dir),
        globalObject: 'globalThis',
        library: {
          type: 'umd',
        }
      },
      optimization: {
        splitChunks: {
          chunks: 'async'
        }
      },
      externals: 'wcwc'
    }

    if (mode === 'development') {
      M_CONFIG.devtool = 'source-map';
    }
    
    return M_CONFIG;
  });
}