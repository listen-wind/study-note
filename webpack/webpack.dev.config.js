const path = require('path');
const merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.config.js');

module.exports = merge(CommonConfig, {

  mode: 'development',

  // 打包之后各个文件合并到一块，如果有问题不好定位
  // 开启之后会生成map文件，如果有报错会映射到源文件，方便定位
  devtool: 'inline-source-map',

  devServer: {
    contentBase: path.join(__dirname, "../public"),
    hot: true,
  },

  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, '../dist'),
  },

  // 统计信息（控制台输出文本）
  stats: {
    assets: false, // 输出文件集合
    entrypoints: false,
  },

  plugins: []
})