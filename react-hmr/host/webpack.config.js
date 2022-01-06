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
        remote1: `promise new Promise(resolve => {
      const script = document.createElement('script')
      script.innerHTML = 'import * as theRemote from "http://localhost:3001/remoteEntry.js"; console.log(JSON.stringify({})); console.log(theRemote);'
      // script.src = "http://localhost:3001/remoteEntry.js"
      script.type = "module"
 
      // inject this script with the src set to the versioned remoteEntry.js
      document.head.appendChild(script);
    })`,
        libs: `promise new Promise(resolve => {
      const script = document.createElement('script')
      script.src = "http://localhost:3002/remoteEntry.js"
      script.type = "module"
      // inject this script with the src set to the versioned remoteEntry.js
      document.head.appendChild(script);
    })`,
        // remote1: "import('http://localhost:3001/remoteEntry.js')",
        // libs: "import('http://localhost:3002/remoteEntry.js')",
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
