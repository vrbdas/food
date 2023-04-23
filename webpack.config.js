'use strict';

const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/js/script.js',
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/src/js`,
  },
  watch: true,

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: 'ie 11',
                debug: false,
                corejs: 3.30,
                useBuiltIns: 'usage',
              }],
            ],
          },
        },
      },
    ],
  },

};
