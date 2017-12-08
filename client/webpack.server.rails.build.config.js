// Common webpack configuration for server bundle

const webpack = require('webpack')
const path = require('path')

const devBuild = process.env.NODE_ENV !== 'production'
const nodeEnv = devBuild ? 'development' : 'production'

module.exports = {

  // the project dir
  context: __dirname,
  entry: [
    'react',
    'react-dom/server',
    './js/startup/serverGlobals'
  ],
  output: {
    filename: 'server-bundle.js',
    path: __dirname + '/../app/assets/webpack'
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
    })
  ],
  module: {
    rules: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.css$/,
        use: [
          {loader: 'css-loader/locals?modules&sourceMap&importLoaders=0&localIdentName=[name]__[local]__[hash:base64:5]'}
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {loader: 'css-loader/locals?modules&sourceMap&importLoaders=2&localIdentName=[name]__[local]__[hash:base64:5]'},
          {loader: 'sass-loader?sourceMap'},
          {
            loader: 'sass-resources-loader',
            options: {
              resources: ['./css/app-variables.scss']
            }
          }
        ]
      },
      { test: /\.(woff2?|svg)$/, loader: 'url-loader?limit=10000' },
      { test: /\.(ttf|eot)$/, loader: 'file-loader' },
      { test: /\.(jpe?g|png|gif|svg|ico)$/, loader: 'url-loader?limit=10000' },

      // React is necessary for the client rendering:
      { test: require.resolve('react'), loader: 'expose-loader?React' },
      { test: require.resolve('react-dom/server'), loader: 'expose-loader?ReactDOMServer' }
    ]
  },

  //sassResources: ['./css/app-variables.scss']

}
