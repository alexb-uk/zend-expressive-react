/*
    ./webpack.config.js
*/
const path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public/js');
var APP_DIR = path.resolve(__dirname, 'src/App/js');

module.exports = {
  entry: APP_DIR + '/reactApp.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'reactApp.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  }
};
