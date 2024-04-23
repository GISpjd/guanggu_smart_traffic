import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  // server: {
  //   proxy: {
  //     '/geoserver': {
  //       target: 'http://localhost:8080', // GeoServer的地址
  //       changeOrigin: true, // 必须设置为true，这样代理服务器才会修改请求头中的origin
  //       rewrite: path => path.replace(/^\/geoserver/, '') // 重写URL，去掉/geoserver
  //     }
  //   }
  // },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
