module.exports = {
  chainWebpack: (config) => {
    config.plugins.delete('prefetch')
  },
  outputDir: 'docs',
  publicPath: '/snbl/'
}
