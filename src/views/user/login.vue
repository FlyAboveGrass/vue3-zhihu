<template>
    <!-- 父子组件传值 -->
    <validate-form @form-submit="validateForm">
        <template #default>
            <validate-input :label="email.label" :rules="email.rules" :type="email.type" placeholder="请输入邮箱"></validate-input>
            <validate-input label="密码" :rules="email.rules" type="password"  placeholder="请输入密码"></validate-input>
        </template>
        <template v-slot:submit>
            <button type="submit" class="btn btn-primary">确定</button>
        </template>
    </validate-form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import ValidateInput from '@/components/form/validateInput.vue'
import ValidateForm from '@/components/form/validate-form.vue'

export default defineComponent ({
    props: {
    },
    components: {
        ValidateInput,
        ValidateForm
    },
    setup() {
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
        return {
            email,
            validateForm
        }
    }
})
</script>

<style scoped lang="less">

</style>
