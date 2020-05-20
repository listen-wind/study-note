const path = require('path');
const merge = require('webpack-merge');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 将css单独打包成文件
const BundleAnalyzer = require('webpack-bundle-analyzer'); // 打包分析

const CommonConfig = require('./webpack.common.config.js');

module.exports = merge(CommonConfig, {

  mode: 'production',

  output: {
    filename: 'js/[name].[contentHash].js',
    chunkFilename: 'js/[name].[contentHash].js', // 按需加载模块的输出名称
    path: path.resolve(__dirname, '../dist'),
  },

  plugins: [

    // 清理构建文件夹
    new CleanWebpackPlugin(),

    // 生成css独立文件
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'css/[name].[contentHash].css',
      chunkFilename: 'css/[id].css',
    }),

    // 打包分析
    // new BundleAnalyzer.BundleAnalyzerPlugin()
  ]
})