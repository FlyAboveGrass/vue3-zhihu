<template>
    <teleport to="#spinner">
        <div v-if="isLoading" class="spinner-container d-flex align-items-center justify-content-center" :style="{background: background}">
            <div class="spinner-border text-primary" role="status">
                <span class="sr-only"></span>
            </div>
            <p class="my-4 text-secondary small">{{ text || '拼命加载中....'}}</p>
        </div>
    </teleport>
</template>

<script lang="ts">
import { defineComponent, mergeProps, ref } from 'vue'
import createElement from '@/hooks/createElement'
export default defineComponent ({
    props: {
        isLoading: {
            type: Boolean,
            required: true
        },
        text: {
            type: String,
            required: false
        },
        background: {
            type: String,
            requied: false,
            default: 'rgba(255, 255, 255, .5)'
        }
    },
    setup() {
        createElement('div', 'spinner', document.body)
        return {
        }
    }
})
</script>

<style scoped lang="less">
.spinner-container{
    flex-direction: column;
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
}
</style>
