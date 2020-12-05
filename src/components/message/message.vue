<template>
    <teleport to="#message">
        <div v-if="visible" class="alert alert-dismissible fade show message" :class="messageType" role="alert">
            <span>{{message}}</span>
            <button type="button" class="close border-0 bg-transparent float-right" data-dismiss="alert" aria-label="Close" @click="closeMessage()">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    </teleport>
</template>

<script lang="ts">
import createElement from '@/hooks/createElement'
import { computed, defineComponent, PropType, ref } from 'vue'

type MessageType = 'success' | 'danger' | 'warning' | 'info'
export default defineComponent ({
    props: {
        message: {
            type: String,
            required: true
        },
        type: {
            type: String as PropType<MessageType>,
            required: false,
            default: 'success'
        }
    },
    setup(props) {
        const messageContainer = createElement('div', 'message', document.body)
        const messageType = computed(() => {
            return 'alert-' + props.type
        })
        const visible = ref(true)
        const closeMessage = () => {
            visible.value = false
        }
        return {
            messageType,
            visible,
            closeMessage
        }
    }
})
</script>

<style scoped lang="less">
.message {
    position: fixed;
    top: 20px;
    min-width: 50vw;
    left: 50%;
    transform: translateX(-50%);
}
</style>
