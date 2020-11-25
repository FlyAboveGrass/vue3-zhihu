<template>
<global-header :user="currentUser"></global-header>
  <form>
    <validate-input :label="email.label" :rules="email.rules" :type="email.type"></validate-input>
    <validate-input label="密码" :rules="email.rules" type="password"></validate-input>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input type="password" class="form-control" id="exampleInputPassword1">
    </div>
    <div class="form-group form-check">
      <input type="checkbox" class="form-check-input" id="exampleCheck1">
      <label class="form-check-label" for="exampleCheck1">Check me out</label>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>

  <br><br><br><br><br>
  <div class="container-fluid px-10 py-10">
    <column-list :list="list"></column-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import './assets/css/reset.css' // 引入reset.css初始化样式
import 'bootstrap/dist/css/bootstrap.min.css' // 引入bootstrap样式
import  { IColumnProps } from '@/interface/column.ts'
import ColumnList from '@/components/ColumnList.vue'
import { IUserProps } from '@/interface/user.ts'
import GlobalHeader from '@/components/GlobalHeader.vue'
import ValidateInput from '@/components/validateInput.vue'

const currentUser: IUserProps = {
  _id: '1',
  isLogin: true,
  name: '杨家家'
}
export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    ColumnList,
    ValidateInput
  },
  setup () {
    const email = reactive({
      label: '邮箱',
      type: 'text',
      rules: [
        { type: 'required', message: '邮箱必输'},
        { type: 'email', message: '邮箱格式不正确' }
      ]
    })
    const emailInput = reactive({
      value: '',
      error: false,
      message: ''
    })
    const validateEmail = () => {
      const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-z0-9_-]+(\.[a-zA-Z0-9-_]+)+$/
      if (emailInput.value.trim() === '') {
        emailInput.error = true
        emailInput.message = '邮箱地址不能为空'
        return false
      }
      if (!emailReg.test(emailInput.value)) {
        emailInput.error = true
        emailInput.message = '邮箱地址格式不正确'
        return false
      }
      emailInput.error = false
      emailInput.message = ''
      return true
    }
    const list: Array<IColumnProps> = [
      { _id: '1', title: 'aaa', description: 'delights' },
      { _id: '2', title: 'aaa', description: 'delights' },
      { _id: '3', title: 'aaa', description: 'delights' },
      { _id: '4', title: 'aaa', description: 'delights' }
    ]
    return {
      email,
      emailInput,
      validateEmail,
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
