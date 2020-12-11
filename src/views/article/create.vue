<template>
    <div class="create">
            <h4 class="py-5">写文章</h4>
            <v-upload
                class="w-100"
                :beforeUpload="beforeUpload"
                @upload-success="handleUploadedImg"
            >
                <template #default>
                    <div class="card bg-light d-flex justify-content-center align-items-center  header-img">点击上传头图</div>
                </template>
                <template #loading>
                    <div class="card bg-light d-flex justify-content-center align-items-center  header-img">
                        <div class="spinner-border text-secondary" style="width: 2em;height: 2em;" role="status">
                            <span class="sr-only"></span>
                        </div>
                    </div>
                </template>
                <template #success="data"> 
                    <!-- 这个用法很有用呦 -->
                    <div class="card bg-light d-flex justify-content-center align-items-center  header-img">
                        <img :src="data.uploadedData && data.uploadedData.url" alt="" srcset="">
                    </div>
                </template>
                <template #error>
                    <div class="card bg-light d-flex justify-content-center align-items-center  header-img">上传失败，点击再次上传</div>
                </template>
            </v-upload>
            
            <validate-form ref="articleRef" @form-submit="submitArticle">
                <template #default>
                    <div class="form-group row py-4">
                        <div class="col-sm-8">
                            <validate-input v-model="form.title" :rules="form.titleRules" label="文章标题"></validate-input>
                        </div>
                        <div class="col-sm-2 offset-sm-2">
                            <button @click="triggerSubmitArticle" type="button"  class="btn btn-primary px-4">发表</button>
                        </div>
                    </div>
                    
                    <validate-input v-model="form.content" type="textarea" rows="10" :rules="form.contentRules" label="文章内容" labelPosition="top"></validate-input>
                </template>
                <template #submit>

                </template>
            </validate-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import VUpload from '@/components/upload/upload.vue'
import { IUploadProps } from '@/interface/article'
import $message from '@/components/message/createMessage'
import ValidateForm from '@/components/form/validate-form.vue'
import ValidateInput from '@/components/form/validateInput.vue'
import { RuleProp } from '@/interface/form'
import { CheckFunction } from '@/components/upload/upload.vue'
import checkUploadFile from '@/components/upload/uploadCheck.ts'
import { addArticle } from '@/api/article'
import { useStore } from 'vuex'
import { IUserProps } from '@/interface/user'
import { useRouter } from 'vue-router'
export default defineComponent ({
    props: {
    },
    components: {
        VUpload,
        ValidateForm,
        ValidateInput
    },
    setup(props, context) {
        const store = useStore()
        const router = useRouter()
        const user: IUserProps = store.state.userInfo
        const form = reactive<{
            title: string;
            content: string;
            imageId: string;
            titleRules: RuleProp[];
            contentRules: RuleProp[];
        }>({
            title: '',
            content: '',
            imageId: '',
            titleRules: [{ type: 'required', message: '文章标题不能为空' }],
            contentRules: [{ type: 'required', message: '文章详情不能为空' }]
        })
        const beforeUpload: CheckFunction = (file: File) => {
            return checkUploadFile(file, {
                size: 1,
                format: ['image/jepg', 'image/png', 'image/jpg']
            })
        }
        const handleUploadedImg = (file: IUploadProps) => {
            if(!file._id) {
                $message('上传图片不存在')
                return 
            }
            form.imageId = file._id
        }
        const submitArticle = async (valid: boolean) => {
            if(!valid) {
                $message('表单验证有误，请重新验证')
                return ;
            }
            try {
                const addArticleResult = await addArticle({
                    title: form.title,
                    content: form.content,
                    column: user.column,
                    author: user._id
                })
                $message('文章添加成功', 'success')
                router.push({
                    path: `/article/detail/${store.state.userInfo.column}`
                })
            } catch(e) {
                $message(e.toString(), 'danger')
            }
            
        }

        const articleRef = ref<any>(null)
        const triggerSubmitArticle = () => {
            // 手动触发里面的事件
            articleRef.value.submitForm()
        }

        return {
            form,
            handleUploadedImg,
            beforeUpload,
            submitArticle,
            articleRef,
            triggerSubmitArticle
        }
    }
})
</script>

<style scoped lang="less">
    .create{
        width: 85%;
        margin: 0px auto;
        .header-img{
            min-height: 18vh;
            font-size: 1.4em;
            cursor: pointer;
        }
    }
</style>
