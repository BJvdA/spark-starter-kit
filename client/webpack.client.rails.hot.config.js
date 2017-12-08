// Run with Rails server like this:
// rails s
// cd client && babel-node server-rails-hot.js
// Note that Foreman (Procfile.dev) has also been configured to take care of this.

const path = require('path')
const webpack = require('webpack')

const config = require('./webpack.client.base.config')

const hotRailsPort = process.env.HOT_RAILS_PORT || 3500

config.entry.app.push(
  'webpack-dev-server/client?http://localhost:' + hotRailsPort,
  'webpack/hot/only-dev-server'
)

config.entry.vendor.push(
  'es5-shim/es5-shim',
  'es5-shim/es5-sham',
  'jquery-ujs',
  'bootstrap-loader'
)

config.output = {
  filename: '[name]-bundle.js',
  path: path.join(__dirname, 'public'),
  publicPath: `http://localhost:${hotRailsPort}/`,
}

config.module.rules.push(
  {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    query: {
      plugins: [
        [
          'react-transform',
          {
            transforms: [
              {
                transform: 'react-transform-hmr',
                imports: ['react'],
                locals: ['module'],
              },
            ],
          },
        ],
      ],
    },
  },
  {
    test: /\.css$/,
    use: [
      {loader: 'style-loader'},
      {loader: 'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]'},
      {
        loader: 'postcss-loader',
        options: {
          plugins: (loader) => [
            require('autoprefixer')()
          ]
        }
      }
    ],
  },
  {
    test: /\.scss$/,
    use: [
      {loader: 'style-loader'},
      {loader: 'css-loader?modules&sourceMap&importLoaders=3&localIdentName=[name]__[local]__[hash:base64:5]'},
      {
        loader: 'postcss-loader',
        options: {
          plugins: (loader) => [
            require('autoprefixer')()
          ]
        }
      },
      {loader: 'sass-loader?sourceMap'},
      {
        loader: 'sass-resources-loader',
        options: {
          resources: ['./css/app-variables.scss']
        }
      },
    ],
  }
)

config.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
)

config.devtool = 'eval-source-map'

console.log('Webpack dev build for Rails') // eslint-disable-line no-console

module.exports = config
