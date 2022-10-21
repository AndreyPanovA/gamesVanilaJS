const path = require('path');
const html = require("html-webpack-plugin")

module.exports = {
    context: path.resolve(__dirname, "src"), // указываю и теперь не нужно везде писать src
    mode: "development",
    entry: {
        main: './games/index.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        port: 4200
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ]
    },
    plugins: [
        new html({
            title: "games",
            template: "./index.html"
        })
    ]
};
