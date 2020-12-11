import { createApp } from 'vue'
import Message from './message.vue'

type MessageType = 'success' | 'danger' | 'warning' | 'info'

const $message = (message: string, type?: MessageType, timeout = 2000) => {
    const messageInstance = createApp(Message, {
        message,
        type
    })

    const div = document.createElement('div')
    document.body.appendChild(div)
    // id要和Message中teleport指向的id一致啊
    div.id = 'zhihuMessage'
    messageInstance.mount(div)
    setTimeout(() => {
        messageInstance.unmount(div)
        document.body.removeChild(div)
    }, timeout)
}

export default $message 