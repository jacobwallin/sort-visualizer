const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  devServer: {
    contentBase: "./dist",
  },
  plugins: [
    // creates index.html file from template
    // automatically adds script tag with hashed js bundle file
    new HtmlWebpackPlugin({
      template: "./src/template.html",
      filename: "./index.html",
    }),
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
});
