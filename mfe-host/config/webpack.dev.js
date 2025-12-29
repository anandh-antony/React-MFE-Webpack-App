const HtmlWebpackPlugin = require("html-webpack-plugin");
const {ModuleFederationPlugin} = require("webpack").container;
const path = require("path");
const { merge } = require('webpack-merge');

const mfConfig = require('./mf.config.dev.js');
const commonConfig = require('./webpack.common.js');

const devConfig = {
  mode: "development",
  devtool: 'cheap-module-source-map',
  output: {
    publicPath: 'http://localhost:3001/',
  },
  devServer: {
    static: path.join(__dirname, "..", "dist"),
    port: 3001,
    open: true,
  },
  plugins: [
    new ModuleFederationPlugin(mfConfig),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', './public/index.html'),
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);

