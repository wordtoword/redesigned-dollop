require('dotenv').config();
const { BASE_URL } = process.env;

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'sample-support-kuroco-en',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/dotenv'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/i18n',
  ],

    i18n: {
      strategy: 'prefix_and_default',
      // Define the language options
      locales: [
        { code: 'ja', file: 'ja.json' },
        { code: 'en', file: 'en.json' },
      ],
      // Set the default language
      defaultLocale: 'en',
      vueI18nLoader: true,
      lazy: true,
      // Specify the directory for the JSON file
      langDir: 'locales/',
    },

  axios: {
    baseURL: 'https://sample-b2b-service-en.g.kuroco-front.app',
    credentials: true,
    withCredentials: true
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }	
}
