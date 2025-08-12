export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: true,
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/google-fonts',
    '@vite-pwa/nuxt'
  ],
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
    '~/assets/styles/main.scss',
    '~/assets/styles/components.scss'
  ],
  build: {
    transpile: ['vuetify', 'chart.js']
  },
  components: {
    global: true,
    dirs: ['~/components']
  },
  googleFonts: {
    families: {
      Inter: [300, 400, 500, 600, 700],
      'Playfair Display': [400, 700]
    }
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL || 'http://localhost:3001'
    }
  },
  typescript: {
    typeCheck: false
  },
  pwa: {
    registerType: 'autoUpdate',
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}']
    },
    manifest: {
      name: 'StratosAI Command Center',
      short_name: 'StratosAI',
      description: 'Premium AI-Powered Executive Dashboard',
      theme_color: '#0D47A1',
      background_color: '#0F172A',
      display: 'standalone',
      icons: [
        {
          src: 'icon-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        }
      ]
    }
  }
})