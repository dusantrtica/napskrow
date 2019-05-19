const path = require("path");
const ROOT = path.resolve(__dirname, "src");

/**
 * Webpack Plugins
 */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const LoaderOptionsPlugin = require("webpack/lib/LoaderOptionsPlugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  context: ROOT,

  module: {
    rules: [
      { test: /\.js$/, loader: "babel-loader", exclude: /node_modules/ },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"],
          publicPath: "../"
        })
      },

      {
        test: /\.(jpg|png|gif)$/,
        use: "file-loader"
      },

      {
        test: /\.(svg|woff|woff2|eot|ttf)$/,
        use: "file-loader?outputPath=fonts/"
      },

      {
        test: /.html$/,
        exclude: /index.html$/,
        use: "html-loader"
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "AngularJS - Webpack",
      template: "./index.html",
      inject: true
    }),
    new ExtractTextPlugin("css/style.css")
  ],

  entry: "./app.js"
};
