const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const BannerPlugin = require('webpack/lib/BannerPlugin');
const { merge } = require('webpack-merge');

const {ModuleFederationPlugin} = require("webpack").container;
const path = require("path");

const mfConfig = require('./mf.config.dev.js');
const commonConfig = require('./webpack.common.js');
const timestamp = Date.now();

const prodConfig  = {
  mode: "production",
  devtool: 'source-map',
  output: {
    filename: '[name].bundle.js',
    chunkFilename: `[name].[contenthash:8]${timestamp}.chunk.js`,
  },
  optimization: {
      
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
              parse: {
                ecma: 8,
              },
              compress: {
                ecma: 5,
                warnings: false,
                comparisons: false,
                inline: 2,
                pure_funcs: ['console.log'],
              },
              mangle: {
                safari10: true,
              },
              keep_classnames: false,
              keep_fnames: false,
              output: {
                ecma: 5,
                comments: /^\**! © .* Ltd/i,
                ascii_only: true,
              },
            },
          }),
      new BannerPlugin(`© ${new Date(timestamp).getFullYear()} Ltd - ${new Date(timestamp)}`),
      new MiniCssExtractPlugin(),
          
    ],
  },
  plugins: [
    new ModuleFederationPlugin(mfConfig),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', './public/index.html'),
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);


