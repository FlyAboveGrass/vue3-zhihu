<template>
  <global-header></global-header>
  
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import './assets/css/reset.css' // 引入reset.css初始化样式
import 'bootstrap/dist/css/bootstrap.min.css' // 引入bootstrap样式
import GlobalHeader from '@/components/GlobalHeader.vue'

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader
  },
  setup () {
    
    
    return {
      
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
