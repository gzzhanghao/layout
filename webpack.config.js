var path = require('path')

module.exports = {
  entry: './src/index',
  output: {
    path: 'dist',
    filename: 'bundle.min.js',
    publicPath: '/dist/'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react']
      }
    }, {
      test: /\.less$/,
      loaders: ['style-loader', 'css-loader', 'less-loader']
    }]
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'immutable': 'Immutable',
    'velement': 'VElement'
  },
  devtool: '#source-map',
  resolve: {
    root: path.join(__dirname, 'src'),
    extensions: ['', '.js', '.jsx']
  }
}
