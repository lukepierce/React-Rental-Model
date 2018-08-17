const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/public/index.html',
  filename: 'index.html',
  inject: 'body'
});


module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'bundle.js'
  },
  plugins: [HTMLWebpackPluginConfig],
  devServer: {
    inline:true,
    contentBase: './dist',
    port: 3333
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [ path.join(__dirname, "/src"),
                  /node_modules\/react-plotly/],
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [
          'css-loader'
        ]
      },
      {
        test: /\.svg$/,
        loader: 'raw-loader'
      }

    ]
  }
}
