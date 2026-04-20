import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles.css'

// 应用启动入口：注册路由并加载全局样式，然后挂载到页面根节点。
createApp(App).use(router).mount('#app')
