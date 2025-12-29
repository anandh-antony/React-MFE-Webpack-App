const HtmlWebpackPlugin = require("html-webpack-plugin");
const {ModuleFederationPlugin} = require("webpack").container;
const path = require("path");

const mfConfig = require('./mf.config.dev.js');
const commonConfig = require('./webpack.common.js');

module.exports = {
  ...commonConfig,
  mode: "development",
  devtool: 'cheap-module-source-map',
  devServer: {
    static: path.join(__dirname, "..", "dist"),
    port: 3001,
    open: true,
  },
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

