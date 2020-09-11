<template>
  <div>
    <MainHeader />
  </div>
</template>

<script>

import MainHeader from './components/MainHeader.vue'

export default {
  name: 'App',
  components: {
    MainHeader,
  },
  data () {
    return {
      todoData: ['todo1', 'todo2', 'todo3'],
      content: ''
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>

</style>