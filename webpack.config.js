const path = require('path');
const autoprefixer = require('autoprefixer');
const plugins = require('./webpack/plugins');
const includesLoader = require('./webpack/includesLoader');

const SRC_DIR = path.resolve(__dirname, 'src');
const DIST_DIR = path.resolve(__dirname, 'dist');

let config = (env, argv) => {
    let isProd = argv.mode === 'production';

    return {
        entry: {
            app: SRC_DIR + `/js/dev.app.js`,
        },
        output: {
            path: DIST_DIR,
            filename: 'js/main.js'
        },

        resolveLoader: {
            modules: ['node_modules', './webpack/']
        },

        resolve: {
            modules: [
                "node_modules",
                "src/img"
            ]
        },

        module: {
            rules: [
                {
                    test: /\.js$/,
                    include: SRC_DIR,
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                },
                {
                    test: /\.(scss|css)$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                name: 'css/main.css'
                            }
                        },
                        {
                            loader: 'extract-loader',
                            options: {
                                publicPath: '../'
                            }
                        },
                        {
                            loader: "css-loader",
                            options: {
                                minimize: isProd
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [autoprefixer('last 2 versions', 'ie 10')]
                                }
                            }
                        },
                        "sass-loader"
                    ]
                },
                {
                    test: /\.pug$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].html'
                            }
                        },
                        {
                            loader: 'pug-html-loader',
                            options: {
                                pretty: true
                            }
                        },
                        {
                            loader: 'includesLoader',
                            options: {
                                pathToIncludes: SRC_DIR + '/includes'
                            }
                        }
                    ]
                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    include: [ SRC_DIR + '/img' ],
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'img/[name].[ext]'
                            }
                        }
                    ]
                }
            ]
        },

        plugins: plugins(isProd, SRC_DIR, DIST_DIR),

        devServer: {
            disableHostCheck: true,
            host: '0.0.0.0'
        }
    }
};

module.exports = config;