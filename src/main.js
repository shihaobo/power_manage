// 一、创建Vue根实例
import Vue from 'vue'

import '@/assets/styles/index.less' // global css

import App from './App.vue'

// 二、挂载App组件
new Vue({
  render: h => h(App)
}).$mount('#app')