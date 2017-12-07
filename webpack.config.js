const path = require('path')
const nodeExternals = require('webpack-node-externals')

const packageJson = require('./package.json')

module.exports = {
  entry: path.join(__dirname, packageJson.srcPath, 'index.js'),
  output: {
    filename: 'index.js',
    path: path.join(__dirname, packageJson.buildPath)
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  externals: [nodeExternals()]
}
