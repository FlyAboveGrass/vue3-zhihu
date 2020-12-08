<template>
    <div class="upload-container">
        <div class="upload-content" @click="triggerUpload()">
            <slot name="default" v-if="status === 'ready'">
                <button type="button" class="btn btn-primary">上传头图</button>
            </slot>
            <slot name="loading" v-if="status === 'loading'">
                <button type="button" class="btn btn-primary">正在上传</button>
            </slot>
            <slot name="success" v-if="status === 'success'">
                <button type="button" class="btn btn-primary">上传成功</button>
            </slot>
            <slot name="error" v-if="status === 'error'">
                <button type="button" class="btn btn-primary">上传失败</button>
            </slot>
        </div>
        <input type="file" ref="fileInput" class="d-none" @change="uploadChange($event)">
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import $message from '../message/createMessage'
import { uploadFile } from '@/api/article'    
type UploadStatus = 'ready' | 'loading' | 'success' | 'error' 
type CheckFunction = (file: File) => boolean
export default defineComponent ({
    props: {
        // 可以再上传时进行一些检查操作
        beforeUpload: {
            type: Function as PropType<CheckFunction>
        },
    },
    emits: ['upload-success', 'upload-error'],
    setup(props, context) {
        const fileInput = ref<null | HTMLElement>(null)
        const status = ref<UploadStatus>('ready')
        const triggerUpload = () => {
            fileInput.value && fileInput.value.click()
        }
        const uploadChange = async (event: Event) => {
            // 要把event转化成html元素
            const currentTarget = event.target as HTMLInputElement
            
            if(!currentTarget.files || currentTarget.files.length === 0) {
                $message('请先选择文件')
                return 
            }
            // 浅拷贝变成一个数组
            const files = Array.from(currentTarget.files)
            if (props.beforeUpload) {
                const result = props.beforeUpload(files[0])
                if (!result) return
            }
            // 文件上传有两种方式，1、 input + action  2、FormData
            const fileData = new FormData()
            fileData.append('file', currentTarget.files[0]);
            status.value = 'loading'
            
            try{
                const uploadResult = await uploadFile(fileData)
                status.value = 'success'
                console.log('uploadResult', uploadResult)
                context.emit('upload-success', uploadResult)
            } catch(e){
                status.value = 'error'
                $message('上传失败')
                context.emit('upload-error', e)
            } finally{
                if (fileInput.value) {
                    // fileInput.value.value = ''
                }
            }
        }
        return {
            fileInput,
            triggerUpload,
            status,
            uploadChange
        }
    }
})
</script>

<style scoped lang="less">

</style>