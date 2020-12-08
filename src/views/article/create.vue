<template>
    <div class="create">
            <h4 class="py-5">写文章</h4>
            <v-upload @upload-success="handleUploadedImg"></v-upload>
            <form >
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
        const handleUploadedImg = (file: IUploadProps) => {
            if(!file._id) {
                $message('上传图片不存在')
                return 
            }
            form.imageId = file._id
        }
        return {
            form,
            handleUploadedImg
        }
    }
})
</script>

<style scoped lang="less">
    .create{
        width: 85%;
        margin: 0px auto;
    }
</style>
