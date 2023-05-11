const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ProvidePlugin } = require('webpack');
const path = require('path');
const data = {};
data.works = require('./src/data/works-list.json');
const pugs = [
  {
    template: 'templates/index',
    filename: 'index',
    inject: true
  },
  {
    template: 'templates/about',
    filename: 'about',
    inject: true
  },
  {
    template: 'templates/works',
    filename: 'works',
    inject: true
  },
  {
    template: 'templates/service',
    filename: 'service',
    inject: true
  },
  {
    template: 'templates/contact',
    filename: 'contact',
    inject: true
  }
];

const plugins = [
  new MiniCssExtractPlugin({
    filename: 'css/app.css'
  }),
  new ProvidePlugin({
    THREE: 'three'
  })
];

pugs.forEach( pug => {
  plugins.push(
    new HtmlWebpackPlugin({
      scriptLoading: false,
      template: './src/' + pug.template + '.pug',
      filename: pug.filename + '.html',
      inject: pug.inject ? 'head' : null,
      data: data
    }),
  )
});

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
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|woff2?|ttf|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: `[name].[ext]`,
              outputPath: 'assets/images'
            }
          },
        ],
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
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader' },
          'postcss-loader', // ./postcss.config.js
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              // sassOptions: {
              //   fiber: Fiber,
              // },
            }
          }
        ]
      },
    ]
  },
  plugins: plugins
}
