// Common client-side webpack configuration used by webpack.hot.config and webpack.rails.config.

const webpack = require('webpack')
const path = require('path')
const autoprefixer = require('autoprefixer')

const devBuild = process.env.NODE_ENV !== 'production'
const nodeEnv = devBuild ? 'development' : 'production'

module.exports = {

  // the project dir
  context: __dirname,
  entry: {

    // See use of 'vendor' in the CommonsChunkPlugin inclusion below.
    vendor: [
      'babel-polyfill',
      'jquery',
      'react',
      'react-dom'
    ],

    // This will contain the app entry points defined by webpack.hot.config and webpack.rails.config
    app: [
      './js/startup/clientGlobals'
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      actions: path.join(process.cwd(), 'js', 'actions'),
      components: path.join(process.cwd(), 'js', 'components'),
      constants: path.join(process.cwd(), 'js', 'constants'),
      containers: path.join(process.cwd(), 'js', 'containers'),
      img: path.join(process.cwd(), '', 'img'),
      libs: path.join(process.cwd(), 'js', 'libs'),
      providers: path.join(process.cwd(), 'js', 'providers'),
      reducers: path.join(process.cwd(), 'js', 'reducers'),
      store: path.join(process.cwd(), 'js', 'store'),
      routes: path.join(process.cwd(), 'js', 'routes'),
      layouts: path.join(process.cwd(), 'js', 'layouts'),
      pages: path.join(process.cwd(), 'js', 'pages')
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv)
      }
    }),

    // https://webpack.github.io/docs/list-of-plugins.html#2-explicit-vendor-chunk
    new webpack.optimize.CommonsChunkPlugin({

      // This name 'vendor' ties into the entry definition
      name: 'vendor',

      // We don't want the default vendor.js name
      filename: 'vendor-bundle.js',

      // Passing Infinity just creates the commons chunk, but moves no modules into it.
      // In other words, we only put what's in the vendor entry definition in vendor-bundle.js
      minChunks: Infinity
    })
  ],
  module: {
    rules: [
      { test: /\.(woff2?)$/, loader: 'url-loader?limit=10000' },
      { test: /\.(ttf|eot)$/, loader: 'file-loader' },
      { test: /\.(jpe?g|png|gif|svg|ico)$/, loader: 'url-loader?limit=10000' },

      // React is necessary for the client rendering
      { test: require.resolve('react'), loader: 'expose-loader?React' },
      { test: require.resolve('react-dom'), loader: 'expose-loader?ReactDOM' },
      { test: require.resolve('jquery-ujs'), loader: 'imports-loader?jQuery=jquery' },
      { test: require.resolve('jquery'), loader: 'expose-loader?jQuery' },
      { test: require.resolve('jquery'), loader: 'expose-loader?$' },

      // Use one of these to serve jQuery for Bootstrap scripts:

      // Bootstrap 3
      { test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports-loader?jQuery=jquery' },

      // Bootstrap 4
      //{ test: /bootstrap\/dist\/js\/umd\//, loader: 'imports-loader?jQuery=jquery' }
    ]
  },

  // Place here all postCSS plugins here, so postcss-loader will apply them
  //postcss: [autoprefixer],

  // Place here all SASS files with variables, mixins etc.
  // And sass-resources-loader will load them in every CSS Module (SASS file) for you
  // (so don't need to @import them explicitly)
  // https://github.com/shakacode/sass-resources-loader
  //sassResources: ['./css/app-variables.scss']

}
