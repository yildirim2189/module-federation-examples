const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: "./src/index",
  mode: "development",
  target: 'web',
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
    port: 3002,
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
  module: {},
  plugins: [
    new ModuleFederationPlugin({
      name: "libs",
      library: {type: 'global'},
      filename: "remoteEntry.js",
      exposes: {
        "./react": "react",
        "./react-dom": "react-dom",
        "./react-router-dom": "react-router-dom",
      },
    }),
  ],
};
