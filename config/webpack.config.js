const webpack = require('webpack');
console.log('The custom config is used');
module.exports = {
    plugins: [
        new webpack.ProvidePlugin({
            'window.SQL': 'sql.js/js/sql.js'
        }),
        new webpack.NormalModuleReplacementPlugin(/typeorm$/, function (result) {
            result.request = result.request.replace(/typeorm/, "typeorm/browser");
        })
    ],
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    optimization: {
        minimize: false
    }
};