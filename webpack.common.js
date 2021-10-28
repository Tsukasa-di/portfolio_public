const path = require('path');
const works = require('./src/contents/works/list.json');
const Fiber = require('fibers');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ProvidePlugin } = require('webpack');

const pugs = [
  {
    template: 'template/index',
    filename: 'index',
    inject: true
  },
  {
    template: 'template/about/index',
    filename: 'about/index',
    inject: true
  },
  {
    template: 'template/works/index',
    filename: 'works/index',
    inject: true
  },
  {
    template: 'template/opening/index',
    filename: 'opening/index',
    inject: true
  }
];

const plugins = [
  new MiniCssExtractPlugin({
    filename: 'css/app.css'
  }),
  new ProvidePlugin({
    THREE: 'three'
  }),
];

pugs.forEach( pug => {
  plugins.push(
    new HtmlWebpackPlugin({
      template: './src/' + pug.template + '.pug',
      filename: pug.filename + '.html',
      inject: pug.inject ? 'body' : null,
      data: {
        works: works
      }
    })
  )
})

module.exports = {
  entry: {
    app: './src/js/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // { loader: 'style-loader' },
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader' },
          'postcss-loader', // ./postcss.config.js
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                fiber: Fiber,
              },
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|woff2?|ttf|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: `[name].[ext]`,
              outputPath: 'common/images',
              publicPath: 'common/images'
            }
          },
        ],
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-loader',
            options: {
              pretty: true
            }
          }
        ]
      }
    ]
  },
  plugins: plugins,
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      // minRemainingSize: 0,
      // minChunks: 1,
      // maxAsyncRequests: 30,
      // maxInitialRequests: 30,
      // enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          // priority: -10,
          name: './venders',
          // reuseExistingChunk: true,
        },
        default: false
      },
    },
  },
}
