const path = require('path')
const glob = require("glob");
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const resolve = (dir) => {
  return path.resolve(__dirname, `../${dir}`)
}

const getHtmlConfig = function (name, chunks) {
  return {
      template: `./src/pages/${name}/index.html`,
      filename: `${name}.html`,
      inject: true,
      hash: true, //开启hash  ?[hash]
      chunks: chunks,
      minify: process.env.NODE_ENV === "development" ? false : {
          removeComments: true, //移除HTML中的注释
          collapseWhitespace: true, //折叠空白区域 也就是压缩代码
          removeAttributeQuotes: true, //去除属性引用
      },
  };
};

const getEntry = () => {
  let entry = {};
    //读取src目录所有page入口
    glob.sync('./src/pages/**/*.js')
        .forEach(function (name) {
            let start = name.indexOf('src/') + 4,
                end = name.length - 3;
            let eArr = [];
            let n = name.slice(start, end);
            n = n.slice(0, n.lastIndexOf('/')); //保存各个组件的入口 
            n = n.split('/')[1];
            eArr.push(name);
            entry[n] = eArr;
        });
    return entry;
}

module.exports = {
  entry: getEntry(),
  output: {
    filename: '[name].js',
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
          // {
          //   loader: 'sass-resources-loader',
          //   options:{
          //     resources: resolve('src/assets/styles/variables.less')
          //   }
          // }
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
    new CleanWebpackPlugin(),
  ]
}

//配置页面
const entryObj = getEntry();
const htmlArray = [];
Object.keys(entryObj).forEach(element => {
    htmlArray.push({
        _html: element,
        title: '',
        chunks: [element]
    })
})
//自动生成html模板
htmlArray.forEach((element) => {
  module.exports.plugins.push(new HtmlWebpackPlugin(getHtmlConfig(element._html, element.chunks)));
})
