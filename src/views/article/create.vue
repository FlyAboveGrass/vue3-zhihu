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
            <form>
                <div class="form-group row py-4">
                    <label class="col-sm-1 col-form-label">标题:</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" placeholder="请输入文章标题">
                    </div>
                    <div class="col-sm-2 offset-sm-1">
                        <button class="btn btn-primary px-4">发表</button>
                    </div>
                </div>
                <div class="form-group row py-4">
                    <h4 class="py-3">文章内容:</h4>
                    <textarea :rows="10" class="form-control" aria-describedby="emailHelp"></textarea>
                </div>
            </form>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import VUpload from '@/components/upload/upload.vue'
import { IUploadProps } from '@/interface/article'
import $message from '@/components/message/createMessage'
import { RuleProp } from '@/interface/form'
import { CheckFunction } from '@/components/upload/upload.vue'
export default defineComponent ({
    props: {
    },
    components: {
        VUpload
    },
    setup() {
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
            console.log('file: create.vue ~ line 74 ~ beforeUpload ~ file', file);
            if(file.size > 1 * 1024 * 1024) {
                $message('照片大小不能超过1M', 'danger')
                return false
            }
            return true
        }
        const handleUploadedImg = (file: IUploadProps) => {
            if(!file._id) {
                $message('上传图片不存在')
                return 
            }
            form.imageId = file._id
        }

        return {
            form,
            handleUploadedImg,
            beforeUpload
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
