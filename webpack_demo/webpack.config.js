
const path = require('path'); // 引入node.js方法
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 引入html-webpack-plugin配置文件
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 引入clean-webpack-plugin清除文件
// const webpack = require('webpack') // 引入webpack
const Uglify = require('uglifyjs-webpack-plugin'); //引入uglifyjs-webpack-plugin  压缩打包
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // 引入extract-text-webpack-plugin 分离css
const PurifyCssWebpack = require('purifycss-webpack'); // 引入purifycss-webpack消除冗余css代码
const glob = require('glob');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 分离css，同上（问题：无法配置背景图路径../,解决：limit: 5000000,改变字符长度）
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
        // use: ['style-loader', 'css-loader']
        // loader: ['style-loader', 'css-loader']  // 同上
        // use: [  // 同上
        //   {loader: 'style-loader'},
        //   {loader: 'css-loader'},
        //   {loader: 'postcss-loader'}
        // ]
        // 分离打包css文件配置
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader'],
          publicPath: '../'  // 解决css3背景图路径问题
        })
        // 同上
        // use: [
        //   MiniCssExtractPlugin.loader,
        //   'css-loader'
        // ]
      },
      {
        test: /\.(png|jpg|gif)$/,  // 图片文件配置
        use: [{
          loader: 'url-loader',
          // 图片大小大于50000字节，转为url格式
          options: {
            limit: 50000,
            outputPath: 'images'  // 图片打包出去的目录
          }
        }]
      },
      // {
      //   test: /\.less$/,  // 以less结尾文件配置
      //   use:['style-loader', 'css-loader', 'less-loader']
      // }
      {
        test: /\.less$/,  // 提取配置
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
      },
      // {
      //   test: /\.(sass|scss)$/, // 以sass|scss结尾文件配置
      //   use: ['style-loader', 'css-loader', 'sass-loader']
      // }
      {
        test: /\.(sass|scss)$/,  // 提取配置
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
      // {
      //   test: /\.(js|jsx)$/,
      //   use: ['babel-loader'],
      //   exclude: /node_modules/
      // }
    ]
  },
  // 开启调试模式（在生产环境下需要注释）
  // devtool:'source-map',
  // 插件，用于生产模板和各项功能。
  plugins: [
    // 打包压缩
    new Uglify(),
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
    new CleanWebpackPlugin(),
    // 将css文件打包至index.css内
    new ExtractTextPlugin('css/index.css'),
    // new MiniCssExtractPlugin({
    //   filename: 'css/index.css'
    // })
    // 消除冗余的css'代码
    new PurifyCssWebpack({
      paths: glob.sync(path.join(__dirname, 'src/*.html'))
    })
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