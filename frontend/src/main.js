import 'ol/ol.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

export const prototype = app.config.globalProperties

app.use(createPinia())
app.use(router)

app.mount('#app')