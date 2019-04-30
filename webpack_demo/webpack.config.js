
const path = require('path') // 引入node.js方法
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 引入html-webpack-plugin配置文件
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 引入clean-webpack-plugin清除文件
// const webpack = require('webpack') // 引入webpack
module.exports={  // 文件暴露
  // mode: 'development', // 环境配置
  // 入口文件的配置項
  entry: {
    entry: './src/entry.js',
    entry2: './src/entry2.js'
  },
  // 出口文件的配置項
  output: {
    path: path.resolve(__dirname, 'dist'), // 使用node.js方法获取dist文件的绝对路径
    filename: '[name].js'
  },
  // 模快：例如解讀CSS，圖片如何转换，压缩
  module: {
    rules: [
      {
        test: /\.css$/, // 以css结尾的文件
        use: ['style-loader', 'css-loader']
        // loader: ['style-loader', 'css-loader']  // 同上
        // use: [  // 同上
        //   {loader: 'style-loader'},
        //   {loader: 'css-loader'}
        // ]
      }
    ]
  },
  // 插件，用于生产模板和各项功能。
  plugins: [
    // 开启热跟新（当前版本不用开启热跟新）
    // new webpack.HotModuleReplacementPlugin(),
    // 配置HtmlWebpackPlugin
    new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: true, // 压缩空白
        removeAttributeQuotes: true // 删除属性双引号
      },
      filename: 'index.html', // 生成多个页面
      chunks:['entry'], // 多页面分别引入自己的js
      hash: true, // 生成链接消除缓存
      title: 'rourou webpack1',  // 页面标题
      template: './src/index.html'  // 模板地址
    }),
    new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: true, // 压缩空白
        removeAttributeQuotes: true // 删除属性双引号
      },
      filename: 'index2.html', // 生成多个页面
      chunks:['entry2'], // 多页面分别引入自己的js
      hash: true, // 生成链接消除缓存
      title: 'rourou webpack2',  // 页面标题
      template: './src/index2.html'  // 模板地址
    }),
    // 生成打包文件清除已有文件
    new CleanWebpackPlugin()
  ],
  // 配置webpack开发服务功能。
  devServer: {
    // 设置服务器访问的基本目录
    contentBase: path.resolve(__dirname, 'dist'),
    // 服务器IP地址， rourou
    host: 'localhost',
    // 设置端口
    port: 8088,
    // 自动打开浏览器
    open: true,
    // 热更新
    hot: true
  }
}