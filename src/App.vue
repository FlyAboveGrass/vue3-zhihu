<template>
<global-header :user="currentUser"></global-header>
  // 父子组件传值
  <validate-form @form-submit="validateForm">
    <template #default>
      <validate-input :label="email.label" :rules="email.rules" :type="email.type" placeholder="请输入邮箱"></validate-input>
      <validate-input label="密码" :rules="email.rules" type="password"  placeholder="请输入密码"></validate-input>
    </template>
    <template v-slot:submit>
      <button type="submit" class="btn btn-primary">确定</button>
    </template>
  </validate-form>
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
import ValidateInput from '@/components/form/validateInput.vue'
import ValidateForm from '@/components/form/validate-form.vue'

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
    ValidateInput,
    ValidateForm
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
    const validateForm = (result = false) => {
      console.log('validate', result)
    }
    const list: Array<IColumnProps> = [
      { _id: '1', title: 'aaa', description: 'delights' },
      { _id: '2', title: 'aaa', description: 'delights' },
      { _id: '3', title: 'aaa', description: 'delights' },
      { _id: '4', title: 'aaa', description: 'delights' }
    ]
    return {
      email,
      validateForm,
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
