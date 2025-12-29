const HtmlWebpackPlugin = require("html-webpack-plugin");
const {ModuleFederationPlugin} = require("webpack").container;
const path = require("path");
const { merge } = require('webpack-merge');

const mfConfig = require('./mf.config.dev.js');
const commonConfig = require('./webpack.common.js');

const prodConfig  = {
  mode: "production",
  devtool: 'source-map',
  output: {
    publicPath: "auto",
  },
  plugins: [
    new ModuleFederationPlugin(mfConfig),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', './public/index.html'),
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);


