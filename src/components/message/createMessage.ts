import { createApp } from 'vue'
import Message from './message.vue'

export default function $message(message: string, type?: string, timeout = 2000) {
    console.log('file: createMessage.ts ~ line 20 ~ $message ~ message', message);
    const messageInstance = createApp(Message, {
        message,
        type
    })

    const messageBox = document.createElement('div')
    document.body.appendChild(messageBox)
    messageInstance.mount(messageBox)

    setTimeout(()=>{
        messageInstance.unmount(messageBox)
        document.body.removeChild(messageBox)
    }, timeout)

}
