<template>
<global-header :user="currentUser"></global-header>
  <div class="container-fluid px-10 py-10">
    <column-list :list="list"></column-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import './assets/css/reset.css' // 引入reset.css初始化样式
import 'bootstrap/dist/css/bootstrap.min.css' // 引入bootstrap样式
import  { IColumnProps } from '@/interface/column.ts'
import ColumnList from '@/components/ColumnList.vue'
import { IUserProps } from '@/interface/user.ts'
import GlobalHeader from '@/components/GlobalHeader.vue'

const currentUser: IUserProps = {
  _id: '1',
  isLogin: true,
  name: '杨家家'
}
export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    ColumnList
  },
  setup () {
    const list: Array<IColumnProps> = [
      { _id: '1', title: 'aaa', description: 'delights' },
      { _id: '2', title: 'aaa', description: 'delights' },
      { _id: '3', title: 'aaa', description: 'delights' },
      { _id: '4', title: 'aaa', description: 'delights' }
    ]
    return {
      currentUser,
      list
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
