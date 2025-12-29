const dependencies = require("../package.json").dependencies;

const sharedDependencies = {};
Object.keys(dependencies).forEach((dep) => {
  sharedDependencies[dep] = {
    singleton: true,
    requiredVersion: dependencies[dep],
  };
});

module.exports = {
  name: "host",
  filename: "remoteEntry.js",
  remotes: {
    cart: "cart@http://localhost:3002/remoteEntry.js",
  },
  shared: {
    ...sharedDependencies,
    // ...deps,
    // react: {
    //   singleton: true,
    //   requiredVersion: deps.react,
    // },
    // "react-dom": {
    //   singleton: true,
    //   requiredVersion: deps["react-dom"],
    // },
  },
};
