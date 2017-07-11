var path = require('path');
module.exports = {
  entry: "./main.js",
  output: {
    filename: "./bundle.js"
  },
  devtool: 'source-map',
  resolve: {
    extensions:  ['.js']
  }
};
