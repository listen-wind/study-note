const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 将css单独打包成文件

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {

  entry: {
    app: './src/main.js'
  },

  // 统计信息（控制台输出文本）
  stats: {
    modules: false, // built modules
    children: false, // child 
    chunks: false,
    chunkModules: false,
    version: false,
    timings: false,
    hash: false,
    builtAt: false,
  },

  // 配置模块如何解析(路径，扩展名....)
  resolve: {
    // 创建路径别名，可以简化模块引用路径
    alias: {
      "@": path.resolve(__dirname, '../src/'),
    },
    // 自动解析确定的扩展
    extensions: ['.js', '.vue', '.json'],
  },

  // 性能（控制打包资源文件和入口文件的大小....）
  performance: {
    hints: false,
    maxEntrypointSize: 500 * 1000, // 最大入口文件
    maxAssetSize: 300 * 1000, // 最大打包文件
  },

  optimization: {
    splitChunks: {
      /**
       * 三个选项
       * 
       * "initial"
       * "async" --- only on-demand chunks
       * "all" --- all chunks （recommend）
       */
      chunks: "all",
      minSize: 30 * 100,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '.',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
  },

  /**
   * loader
   * 
   * 1. 返回一个函数，内容包括处理文件之后返回的内容
   * 2. 多个loader，执行顺序是从最后一个链式向第一个执行·
   * 3. 链式调用时，上一个执行结果返回给下一个loader
   */
  module: {
    rules: [{
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.scss$/,
        use: [{
            loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader', // 将css文件转化为require文件
          },
          {
            loader: 'sass-loader', // 将sass/scss文件转化为css
          }
        ]
      },
      {
        test: /\.css$/,
        use: [{
            loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          },
          'css-loader'
        ]
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/i,
        loader: 'url-loader',
        options: {
          name: devMode ? '[path][name].[ext]' : '[contenthash].[ext]',
          outputPath: 'assets/images',
          limit: 1024,
          // url-loader 默认使用的是es6的import， vue使用的require
          // 所以设置为false与vue保持一致
          esModule: false,
        }
      }
    ]
  },

  plugins: [

    // 设置全局变量，变量需要使用 JSON.stringify 转化，不能直接写字符串
    // 与通过npm设置全局变量的区别
    // DefinePlugin 定义的是入口文件下业务代码中的变量
    // Npm 定义的全局变量主要用来在配置文件中使用
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.VERSION': JSON.stringify('1.0.1'),
    }),

    // 生成html文件
    new HtmlWebpackPlugin({
      filename: 'index.html', // 生成的文件名
      template: './public/index.html', // 指定打包压缩的文件
      minify: {
        removeComments: true, // 清除注释
        collapseWhitespace: true // 清理空格
      }
    }),

    // make sure to include the plugin for the magic
    new VueLoaderPlugin(),
  ]
}