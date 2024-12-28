// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:8080/api' // 公共的 API 基础 URL
    }
  },
  axios: {
    baseURL: 'http://localhost:8080/api' // 配置axios的baseURL
  }

})
