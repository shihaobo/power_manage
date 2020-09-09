<template>
  <div class="ssss">
    <h1>Todolist</h1>
    <input type="text" v-model="content">
    <button @click="addTodo">添加3</button>
    <ul>
      <li v-for="(item,index) in todoData" :key="index">{{item}}</li>
    </ul>
  </div>
</template>

<script>
import img from './assets/styles/test.css'
export default {
  name: 'App',
  data(){
    return{
      todoData:['todo1','todo2','todo3'],
      content:''
    }
  },
  methods:{
    addTodo(){
      if(this.content === '') return
      this.todoData.push(this.content)
      this.content = ''
    }
  }
}
</script>

<style lang="less" scoped>
h1 {
  color: green;
}
ul{
  li:nth-child(odd){
    color: blue;
  }
}
</style>