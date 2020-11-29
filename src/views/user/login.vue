<template>
    <div class="login-box">
        <div class="logo">
            <img :src="logo" alt="">
        </div>
        <div class="login">
            <!-- 父子组件传值 -->
            <validate-form @form-submit="validateForm">
                <template #default>
                    <validate-input :label="email.label" :rules="email.rules" type="text" placeholder="请输入邮箱"></validate-input>
                    <validate-input label="密码" :rules="password.rules" type="password"  placeholder="请输入密码"></validate-input>
                </template>
                <template v-slot:submit>
                    <button type="submit" class="btn btn-primary btn-block btn-large mt-4">确定</button>
                </template>
            </validate-form>
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
import ValidateInput from '@/components/form/validateInput.vue'
import ValidateForm from '@/components/form/validate-form.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent ({
    props: {
    },
    components: {
        ValidateInput,
        ValidateForm
    },
    setup() {
        const logo = require('@/assets/imgs/logo.png')
        const org = require('@/assets/imgs/org.png')
        const zhi = require('@/assets/imgs/zhi.png')

        const router = useRouter()
        const store = useStore()
        const email = reactive({
            label: '邮箱',
            rules: [
                { type: 'required', message: '邮箱必输'},
                { type: 'email', message: '邮箱格式不正确' }
            ]
        })
        const password = reactive({
            label: '密码',
            rules: [
                { type: 'required', message: '邮箱必输'}
            ]
        })
        
        const validateForm = (result = false) => {
            console.log('validate', result)
            if (result) {
                router.push({ path: '/'});
                store.commit('login')
            }
        }
        return {
            email,
            password,
            validateForm,
            logo,org,zhi
        }
    }
})
</script>

<style scoped lang="less">
.login-box {
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
    .login {
        background-color: #fff;
        width: 36vw;
        height: 40vh;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 1rem 3rem;
    }
    .validate-bottom{
        background-color: rgb(246,246,246);
        width: 36vw;
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
