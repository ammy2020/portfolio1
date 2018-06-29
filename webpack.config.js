// webpack v4
const path = require('path');
module.exports = {
    mode: 'development',
    entry: {
        main: './app/assets/scripts/App.js'
    },
    output: {
        path: path.resolve(__dirname, './app/temp/scripts'),
        filename: 'App.js'
    },
    module: {
        rules:
        [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    }
};