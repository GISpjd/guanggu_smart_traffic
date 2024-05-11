// import 'ol/ol.css';


import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import 'animate.css'

const app = createApp(App)

export const prototype = app.config.globalProperties

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')
