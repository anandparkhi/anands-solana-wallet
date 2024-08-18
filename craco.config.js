const path = require('path');
const webpack = require('webpack'); 

module.exports = {
    webpack: {
        configure: (webpackConfig) => {
            webpackConfig.resolve.fallback = {
                "fs": require.resolve("browserify-fs"), 
                "crypto": require.resolve("crypto-browserify"),
                "stream": require.resolve("stream-browserify"),
                "assert": require.resolve("assert"),
                "http": require.resolve("stream-http"),
                "https": require.resolve("https-browserify"),
                "os": require.resolve("os-browserify/browser"),
                "url": require.resolve("url"),
                "buffer": require.resolve("buffer"),
                "path": require.resolve("path-browserify"),
                "process": require.resolve("process/browser"),
                "util": require.resolve("util"),
                "zlib": require.resolve("browserify-zlib"),
            };

            // Add ProvidePlugin to provide polyfills
            webpackConfig.plugins = (webpackConfig.plugins || []).concat([
                new webpack.ProvidePlugin({
                    Buffer: ['buffer', 'Buffer'], 
                    process: 'process/browser',  
                }),
            ]);

            return webpackConfig;
        },
    },
};
