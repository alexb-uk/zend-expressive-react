/*
    ./webpack.config.js
*/
const path = require("path");

const BUILD_DIR = path.resolve(__dirname, "public/js");
const APP_DIR = path.resolve(__dirname, "src/App/js");

module.exports = {
  entry: {
      reactApp: APP_DIR + "/reactApp.jsx",
      tictactoeApp: APP_DIR + "/tictactoe.jsx",
  },
  externals: {
    "react/addons": true,
    "react/lib/ExecutionEnvironment": true,
    "react/lib/ReactContext": true,
    "react-addons-test-utils": "react-dom",
  },
  output: {
    path: BUILD_DIR,
    filename: "[name].js"
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: "babel-loader", exclude: /node_modules/ },
      { test: /\.jsx$/, loader: "babel-loader", exclude: /node_modules/ }
    ]
  }
};
