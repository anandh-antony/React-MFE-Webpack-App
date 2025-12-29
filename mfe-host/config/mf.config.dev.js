
module.exports = {
  name: "host",
  filename: 'remoteEntry.js',
  remotes: {
    cart: "cart@http://localhost:3002/remoteEntry.js",
  },
  shared: {'react': {singleton: true}, "react-dom": {singleton: true}},
};
