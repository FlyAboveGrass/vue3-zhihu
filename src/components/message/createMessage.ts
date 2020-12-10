import { createApp } from 'vue'
import Message from './message.vue'

type MessageType = 'success' | 'danger' | 'warning' | 'info'
export default function $message(message: string, type?: MessageType, timeout = 2000) {
    const messageInstance = createApp(Message, {
        message,
        type
    })

    const messageBox = document.createElement('div')
    document.body.appendChild(messageBox)
    messageInstance.mount(messageBox)
    console.log('aaa')
    setTimeout(() => {
        if(messageBox){
            console.log('messageBox', messageBox, messageInstance)
            messageInstance.unmount(messageBox)
            document.body.removeChild(messageBox)
        }
    }, timeout)
}
