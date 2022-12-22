const path = require('path');

module.exports = {
    entry: {
        "badwords-filter" : path.resolve(__dirname, 'src/index.js'),
        "badwords-filter.min" : path.resolve(__dirname, 'src/index.js')
    },
    devtool: "source-map",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        globalObject: 'this',
        library: {
            name: 'badwordsFilter',
            type: 'umd',
        },
    },
    module: {
        rules: [
          {
            test: /\.(js)$/,
            exclude: /node_modules/,
            use: ['babel-loader'],
          },
        ],
      },
      mode: 'production',
};