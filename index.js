const path = require('path')

module.exports = (pluginOptions = {}) => (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      // normalize componentsRoot path
      pluginOptions.componentsRoot = path.resolve(
        config.context,
        pluginOptions.componentsRoot
          ? pluginOptions.componentsRoot
          : 'components/*'
      )

      config.module.rules.push({
        test: /__swingset_components/,
        use: [
          {
            loader: path.join(__dirname, 'components-loader.js'),
            options: { pluginOptions, webpackConfig: config },
          },
        ],
      })

      // Don't clobber previous plugins' webpack functions
      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    },
  })
}
