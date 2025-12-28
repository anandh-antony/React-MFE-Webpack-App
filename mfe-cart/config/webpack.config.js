const HtmlWebpackPlugin = require("html-webpack-plugin");
const {ModuleFederationPlugin} = require("webpack").container;
// const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");
const path = require("path");

const mfConfig = require('./mf.config.dev.js');
const commonConfig = require('./webpack.common.js');

module.exports = {
  ...commonConfig,
  mode: "development",
  devServer: {
    static: path.join(__dirname, "..", "dist"),
    port: 3002,
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

