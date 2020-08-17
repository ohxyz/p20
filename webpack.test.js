const path = require( 'path' );

module.exports = {
    
    mode: 'development',
    entry: './test/app/index.js',
    output: {
        path: path.join( __dirname, 'test' ),
        filename: 'bundle.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join( __dirname, 'test' ),
        compress: true,
        port: 5010,
        open: true
    },
    module: {
        rules: [ 
            {
                test: /\.js[x]{0,1}$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            }
        ]
    }
};