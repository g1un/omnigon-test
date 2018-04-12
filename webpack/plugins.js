const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

let plugins = (isProd, src, dist) => {
    let SRC_DIR = src;
    let DIST_DIR = dist;

    //common for dev and prod plugins
    let pluginsArr = [
        new CopyWebpackPlugin([
            {
                from: SRC_DIR + '/img/',
                to: DIST_DIR + '/img/'
            }
        ]),
        new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i,
            disable: !isProd,
            optipng: {
                optimizationLevel: 3
            }
        })
    ];

    return pluginsArr;
};

module.exports = plugins;