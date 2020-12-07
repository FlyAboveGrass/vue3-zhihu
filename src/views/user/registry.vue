<template>
    <div class="rigistry-box">
        <div class="logo">
            <img :src="logo" alt="">
        </div>
        <div class="rigistry">
            <v-form @form-submit="formSubmit">
            <template #default>
                <validate-input v-model="form.email" :label="form.emailLabel" :rules="form.emailRules" placeholder="请输入邮箱地址"/>
                <validate-input v-model="form.nickName" :label="form.nickNameLabel" :rules="form.nickNameRules" placeholder="请输入昵称"/>
                <validate-input v-model="form.password" :label="form.passwordLabel" :rules="form.passwordRules" placeholder="请输入密码"/>
                <validate-input v-model="form.confirmPassword" :label="form.confirmPasswordLabel" :rules="form.confirmPasswordRules" placeholder="请确认密码"/>
            </template>
            <template #submit>
                <button type="submit" class="btn btn-primary btn-block btn-large">注册新用户</button>
            </template>
        </v-form>
        </div>
        <div class="validate-bottom">
            <div class="org">
                <img :src="org" alt="" srcset="">
                <a href="#">注册账号</a>
            </div>
            <div class="download">
                <img :src="zhi" alt="" srcset="">
                <a href="#">下载知乎App</a>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import VForm from '@/components/form/validate-form.vue'
import { RuleProp } from '@/interface/form'
import ValidateInput from '@/components/form/validateInput.vue'
import $message from '@/components/message/createMessage'
import { userRegister } from '@/api/user'

export default defineComponent({
    name: 'Register',
    components: {
        VForm,
        ValidateInput
    },
    setup() {
        const logo = require('@/assets/imgs/logo.png')
        const org = require('@/assets/imgs/org.png')
        const zhi = require('@/assets/imgs/zhi.png')
        const router = useRouter()
        const form = reactive<{
            email: string;
            nickName: string;
            password: string;
            confirmPassword: string;
            emailLabel: string;
            nickNameLabel: string;
            passwordLabel: string;
            confirmPasswordLabel: string;
            emailRules: RuleProp[];
            nickNameRules: RuleProp[];
            passwordRules: RuleProp[];
            confirmPasswordRules: RuleProp[];
        }>({
            email: '',
            nickName: '',
            password: '',
            confirmPassword: '',
            emailLabel: '邮箱',
            nickNameLabel: '昵称',
            passwordLabel: '密码',
            confirmPasswordLabel: '确认密码',
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
                const result = await userRegister({
                    email: form.email,
                    password: form.password,
                    nickName: form.nickName
                })
                console.log('registry result', result);
                $message('注册成功')
                // router.push('/login')    
            }
        }

        return {
            form,
            formSubmit,
            logo,org,zhi
        }
    }
})
</script>

<style lang="less" scoped>
.rigistry-box {
    width: 100vw;
    height: calc(100vh - 3.5rem);
    background-color: rgb(184,229,248);
    background-image: url('../../assets/imgs/bg.png');
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .logo{
        margin: 10px 0px 80px;
        img{
            width: 6rem;
        }
    }
    .rigistry {
        background-color: #fff;
        width: 46vw;
        height: 50vh;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 1rem 3rem;
    }
    .validate-bottom{
        background-color: rgb(246,246,246);
        width: 46vw;
        display: flex;
        justify-content: space-around;
        padding: 12px 0px;
        div{
            color: rgb(0,132,254);
            a{
                text-decoration: none;
            }
            img{
                margin: 0 4px;
                width: 1.7rem;
            }
        }
    }
}
</style>
