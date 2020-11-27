const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

function resolve(dir) {
  return path.resolve(__dirname, `../${dir}`)
}

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: resolve('dist')
  },
  resolve: {
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          name: 'images/[path][name].[hash:7].[ext]',
          limit: 2048
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 3
            }
          },
          'postcss-loader',
          'less-loader',
          {
            loader: 'sass-resources-loader',
            options:{
              resources: resolve('src/assets/styles/variables.less')
            }
          }
        ]
      }
    ]
  },
  optimization:{ 
    usedExports: true, // Tree Shaking 模块按需引入
    splitChunks:{ //代码分割
      chunks: 'all'
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new CleanWebpackPlugin(),
  ]
}