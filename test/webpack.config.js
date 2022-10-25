const path = require("path")

module.exports = {
  mode: "development",
  entry: {
    "index": "./longUrl.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "test.[name].js",
    libraryTarget: "commonjs",
  },
  module: {
    rules: [{ test: /\.js$/, use: "babel-loader", exclude: /node_modules/ }],
  },
  stats: {
    colors: true,
    warnings: false,
  },
  target: "node",
  externals: [/k6(\/.*)?/],
  devtool: "source-map",
}