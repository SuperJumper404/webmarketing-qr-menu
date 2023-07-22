// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    ssr: false,
    modules: [
      '@nuxtjs/tailwindcss',
    ],
    plugins: [{ src: "~/plugins/lottie-player.js", mode: "client" }],
    tailwindcss: {
      cssPath: '~/assets/css/tailwind.css',
      configPath: 'tailwind.config',
      exposeConfig: false,
      exposeLevel: 2,
      injectPosition: 'first',
      viewer: true,
    },
      runtimeConfig: {
        public:{
          url: process.env.BACKEND_URL , // Default value if BACKEND_URL is not defined in .env
          test:"Hrllos"
        }
      },
    
  })
