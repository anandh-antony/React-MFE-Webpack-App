
module.exports = {
  name: "host",
  remotes: {
    cart: "cart@http://localhost:3002/remoteEntry.js",
  },
  shared: {'react': {singleton: true}, "react-dom": {singleton: true}},
};
