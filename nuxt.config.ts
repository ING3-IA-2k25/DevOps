// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  components: [
    {
        path: '~/components',
        pathPrefix: false,
    },
  ],
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
  ],
  nitro: { 
    plugins: ['~/server/plugins/mongodb.ts'],
  },
  runtimeConfig: {
    mongodbURI: process.env.MONGODB_URI
  },
  tailwindcss: {
    cssPath: ['~/assets/css/main.sass', { injectPosition: 'first' }],
    configPath: '~/tailwind.config.ts',
  },
})