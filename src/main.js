// 一、创建Vue根实例
import Vue from 'vue'
import App from './App.vue'

// 二、挂载App组件
new Vue({
  render: h => h(App)
}).$mount('#app')

const arr = [1, 3, 5].map(item => item + 1)
console.log(arr)