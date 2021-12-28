const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");
const path = require("path");
const LiveReloadPlugin = require("webpack-livereload-plugin");

module.exports = {
  entry: "./src/index",
  mode: "development",
  target: 'web',
  devtool: "source-map",
  optimization: {
    minimize: false,
  },
  output: {
    publicPath: "auto",
    clean: true,
    chunkFormat:"module",
    chunkLoading: 'import',
    environment: { module: true },
    library: {
      type: 'module'
    },
  },
  externalsType: 'module',
  experiments:{outputModule:true},
  devServer: {
    hot: false,
    static: path.join(__dirname, "dist"),
    port: 3000,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
    historyApiFallback: {
      index: "index.html",
    },
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "host",
      remoteType: 'module',
      library:{type:"module"},
      remotes: {
        remote1: "promise new Promise(res=>import('http://localhost:3001/remoteEntry.js').then(res))",
        libs: "promise new Promise(res=>import('http://localhost:3002/remoteEntry.js').then(console.log))",
      },
    }),
    new ExternalTemplateRemotesPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      scriptLoading: 'module'
    }),
    new LiveReloadPlugin({
      port: 35729,
    }),
  ],
};
