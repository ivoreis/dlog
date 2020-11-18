const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/
})

const webpackConfig = (config, _options) => {
  return config
}

const config = {
  poweredByHeader: false,
  webpack: webpackConfig,
  trailingSlash: false,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en'
  },
  images: {
    domains: ['images.unsplash.com'],
  },
  pageExtensions: ['tsx', 'mdx'],
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public',
    runtimeCaching
  }
}

module.exports = withPlugins([
  [withPWA],
  [
    withMDX,
    { extension: /\.mdx?$/}
  ]
], config)
