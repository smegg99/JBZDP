export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true, vscode: {}, },
  ssr: true,
  typescript: {
    strict: true,
  },
  css: ['vuetify/styles', '@/assets/styles/main.scss'],
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    define: {
      'process.env.DEBUG': false
    }
  }
})
