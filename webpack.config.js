const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const config = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.js'
    ]
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
  },
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.png$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/img/'
          }
        }],
        exclude: /node_modules/
      }
    ]
  },
  stats: 'errors-only',
  plugins: [
    new CopyPlugin(
      {
        patterns: [
          { from: 'src/assets', to: 'assets' },
        ]
      },
    ),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    }),
    new LodashModuleReplacementPlugin,
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    new MiniCssExtractPlugin(),
    new CssMinimizerPlugin(),
  ]
};

module.exports = config;
