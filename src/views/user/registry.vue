<template>
    <div class="register-container p-3 w-330">
        <v-form @form-submit="formSubmit">
            <form-item label="邮箱地址">
                <validate-input
                v-model="form.email"
                :rules="form.emailRules"
                placeholder="请输入邮箱地址"
                />
            </form-item>
            <form-item label="用户昵称">
                <validate-input
                v-model="form.nickName"
                :rules="form.nickNameRules"
                placeholder="请输入昵称"
                />
            </form-item>
            <form-item label="用户密码">
                <validate-input
                type="password"
                v-model="form.password"
                :rules="form.passwordRules"
                placeholder="请输入用户密码"
                />
            </form-item>
            <form-item label="确认密码">
                <validate-input
                type="password"
                v-model="form.confirmPassword"
                :rules="form.confirmPasswordRules"
                placeholder="请再次输入密码"
                />
                <div class="form-text">
                <router-link to="/login">已经有账户？去登录！</router-link>
                </div>
            </form-item>
            <template #submit>
                <button type="submit" class="btn btn-primary btn-block btn-large">注册新用户</button>
            </template>
        </v-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import VForm from '@/components/form/validate-form.vue'
import FormItem from '@/components/form/validate-form.vue'
import { RuleProp } from '@/interface/form'
import ValidateInput from '@/components/form/validateInput.vue'
import $message from '@/components/message/createMessage'
import { userRegister } from '@/api/user'

export default defineComponent({
    name: 'Register',
    components: {
        VForm,
        FormItem,
        ValidateInput
    },
    setup() {
        const router = useRouter()
        const form = reactive<{
            email: string;
            nickName: string;
            password: string;
            confirmPassword: string;
            emailRules: RuleProp[];
            nickNameRules: RuleProp[];
            passwordRules: RuleProp[];
            confirmPasswordRules: RuleProp[];
        }>({
            email: '',
            nickName: '',
            password: '',
            confirmPassword: '',
            emailRules: [
                {
                    type: 'required',
                    message: '请输入邮箱地址'
                },
                {
                    type: 'email',
                    message: '请输入正确的邮箱地址'
                }
            ],
            nickNameRules: [
                {
                    type: 'required',
                    message: '请输入用户昵称'
                }
            ],
            passwordRules: [
                {
                    type: 'required',
                    message: '请输入用户密码'
                }
            ],
            confirmPasswordRules: [
                {
                    type: 'required',
                    message: '请输入确认密码'
                },
                {
                    type: 'custom',
                    validator: (): boolean => {
                        return form.password === form.confirmPassword
                    },
                    message: '两次输入的密码不相同'
                }
            ]
        })

        const formSubmit = async (isValid: boolean) => {
            if (isValid) {
                await userRegister({
                    email: form.email,
                    password: form.password,
                    nickName: form.nickName
                })
                $message('注册成功')
                router.push('/login')
            }
        }

        return {
            form,
            formSubmit
        }
    }
})
</script>

<style lang="scss" scoped></style>
