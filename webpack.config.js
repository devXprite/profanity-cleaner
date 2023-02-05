const path = require('path');

module.exports = {
    entry: {
        "profanity-cleaner" : path.resolve(__dirname, 'src/index.js'),
        "profanity-cleaner.min" : path.resolve(__dirname, 'src/index.js')
    },
    devtool: "source-map",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        globalObject: 'this',
        library: {
            name: 'profanityCleaner',
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