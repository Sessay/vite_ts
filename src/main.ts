import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router/index.ts'
import 'element-plus/dist/index.css'
import './styles/index.scss'
import * as ElIconModules from '@element-plus/icons'

const app = createApp(App)
app.use(router).mount('#app')

Object.keys(ElIconModules).forEach(iconName => {
  app.component(iconName, ElIconModules[iconName])
})
