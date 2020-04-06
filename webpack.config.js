module.exports = {
  // WEBPACK CONFIG
  entry: './public/src/client.js',
  output: {
    path: `${__dirname}/public/dist`,
    filename: 'client.bundle.js',
  }
}