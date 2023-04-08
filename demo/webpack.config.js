/* eslint @typescript-eslint/no-var-requires: "off" */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    }
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: ['react', 'react-dom', 'ReactCountDownLatch'],
    umdNamedDefine: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/template.html'
    })
  ],
  watchOptions: { ignored: /node_modules/ }
};