var path = require("path");
const ModuleFederationPlugin = require("webpack").container
  .ModuleFederationPlugin;
const DashboardPlugin = require("@module-federation/dashboard-plugin");

var serverConfig = {
  entry: ["@babel/polyfill", path.resolve(__dirname, "server.js")],
  target: "node",
  output: {
    path: path.resolve(__dirname, "public/server"),
    filename: "server.js",
    publicPath: "/",
  },
  externals: ["enhanced-resolve"],
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|GeneralJS|Global)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "website1",
      library: { type: "commonjs-module", name: "website1" },
      filename: "container.js",
      remotes: {
        website2: path.resolve(
          __dirname,
          "../remoteServer/public/server/container.js"
        ),
      },
      //shared: ["react", "react-dom"],
    }),
      new DashboardPlugin({
        publishVersion: require("../package.json").version,
        filename: "dashboard.json",
        dashboardURL: "http://localhost:3000/api/update",
        versionChangeWebhook: "http://cnn.com/",
        metadata: {
          clientUrl: "http://localhost:3004",
          source: {
            url:
              "https://github.com/module-federation/module-federation-examples/tree/master/server-side-render-only/hostServer",
          },
          remote: "http://localhost:3005/remoteEntry.js",
        },
      }),
  ],
};

module.exports = [serverConfig];
