import path from 'path';

module.exports = {
    entry: './src/index.ts',
    mode   : 'production',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename : 'onvo.min.js',
        library  : {
            name : 'onvo',
            type : 'umd',
        },
    },
};

