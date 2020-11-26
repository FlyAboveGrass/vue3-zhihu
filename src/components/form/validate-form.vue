<template>
    <form>
        <slot name="default"></slot>
        <div class="submit" @click.prevent="submitForm">
            <slot name="submit">
                <button type="submit" class="btn btn-primary">确定</button>
            </slot>
        </div>
    </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'
export const emitter = mitt()
export type validateFunc = () => boolean // 指定一个函数类型

export default defineComponent ({
    props: {
    },
    emits: ['form-submit'], // 子组件给父组件传值
    setup(props, context) {
        const validateFunArr: Array<validateFunc>  = []
        const submitForm = () => {
            const valid = validateFunArr.map((fun) => fun()).every(result => result)
            context.emit('form-submit', valid) // 将校验结果传给父组件
        }
        const pushValidateFun = (fun?: validateFunc) => { // 为什么有问号的就可，没有就不行
            validateFunArr.push(fun as validateFunc)
            return
        }

        emitter.on('input-ready', pushValidateFun)
        onUnmounted(() => {
            emitter.off('input-ready', pushValidateFun)
        })
        return {
            submitForm
        }
    }
})
</script>

<style scoped lang="less">

</style>
