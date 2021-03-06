const path = require( 'path' );

module.exports = {
    
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.join( __dirname, 'public' ),
        filename: 'bundle.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join( __dirname, 'public' ),
        compress: true,
        port: 5000,
        open: true,
    },
    module: {
        rules: [ {

            test: /\.js[x]{0,1}$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        
        }, {
            test: /\.s[ac]ss$/i,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader',
            ],
        } ]
    }
};