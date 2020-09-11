const path = require('path')
const webpack = require('webpack')

const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')

const devConfig = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    open: true,
    overlay: true,
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
}

module.exports = merge(baseConfig, devConfig)