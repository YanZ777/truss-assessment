const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   mode: 'production',
   entry: './src/index.js',
   module: {
      rules: [
         { 
            test: /\.js$/, 
            exclude: /node_modules/,
            loader: "babel-loader",
         },
         {
            test: /\.(png|svg|jpg|gif)$/,
            include: path.resolve(__dirname, 'images'),
            exclude: /src/,
            use: [
               'file-loader',
            ],
         },
      ]
   },
   output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
   },
   plugins: [
      new HtmlWebpackPlugin({
        title: 'Planets Table',
        template: path.resolve(__dirname, 'public', 'template.html'),
      }),
   ],
   resolve: {
      extensions: [".js", ".jsx"]
   }
};