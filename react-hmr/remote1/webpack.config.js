const { ModuleFederationPlugin } = require("webpack").container;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");
const path = require("path");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  entry: "./src/index",
  mode: "development",
  devtool: "source-map",
  target: 'web',
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
      type: 'module',
    },
  },
  externalsType: 'module',
  experiments:{outputModule:true},
  devServer: {
    hot: true,
    static: path.join(__dirname, "dist"),
    port: 3001,
    liveReload: false,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
          plugins: [require.resolve("react-refresh/babel")],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "remote1",
      filename: "remoteEntry.js",
      library:{type:'module'},
      exposes: {
        "./Button": "./src/Button",
        "./Heading": "./src/Heading",
      },
      remoteType:"module",
      remotes: {
        libs: `promise new Promise(resolve => {
      const script = document.createElement('script')
      script.src = "http://localhost:3002/remoteEntry.js"
      script.type = "module"
      // inject this script with the src set to the versioned remoteEntry.js
      document.head.appendChild(script);
    })`,
      },
    }),
    // new ExternalTemplateRemotesPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      chunks: ["main"],
      scriptLoading: 'module'
    }),
    new ReactRefreshWebpackPlugin({
      exclude: [/node_modules/, /bootstrap\.js$/],
    }),
  ],
};
