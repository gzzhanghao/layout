module.exports = {
  entry: './src/index',
  output: {
    path: 'dist',
    filename: 'bundle.min.js',
    publicPath: '/dist/',
    library: 'Layout'
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
    'immutable': 'Immutable'
  },
  devtool: '#source-map',
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
}
