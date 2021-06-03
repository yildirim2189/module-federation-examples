const path = require("path");
const {
  MergeRuntime,
  withModuleFederation,
} = require("@module-federation/nextjs-mf");

module.exports = {
  future: { webpack5: true },
  webpack: (config, options) => {
    const { buildId, dev, isServer, defaultLoaders, webpack } = options;

    const originalEntry = config.entry;
    if (!options.isServer) {
      config.entry = async () => {
        const eps = await originalEntry();
        const newEntrys = Object.entries(eps).reduce((acc, [key, value]) => {
          acc[key] = value;
          if (key === "polyfills") {
            acc[key] = {
              import: value,
              dependOn: "shared",
              filename: "static/chunks/react.js",
            };
          }
          return acc;
        }, {});
        newEntrys["shared"] = ["react", "react-dom"];

        return newEntrys;
        return eps;
      };
    }
    const mfConf = {
      mergeRuntime: true,
      name: "next1",
      library: {
        type: config.output.libraryTarget,
        name: "next1",
      },
      filename: "static/runtime/remoteEntry.js",
      exposes: {
        "./exposedTitle": "./components/exposedTitle",
      },
      shared: [
        {
          lodash: {
            singleton: true,
          },
        },
      ],

      remotes: {
        next2: isServer
          ? path.resolve(
              __dirname,
              "../next2/.next/server/chunks/static/runtime/remoteEntry.js"
            )
          : "next2",
      },
    };
    config.cache = false;

    if (!isServer) {
      config.output.publicPath = "http://localhost:3000/_next/";
    }

    withModuleFederation(config, options, mfConf);
    return config;
  },
  webpackDevMiddleware: (config) => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config;
  },
};
