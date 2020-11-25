import { onMounted, onUnmounted, ref, Ref } from 'vue'

const isClickOutside = (elemenRef: Ref<null | HTMLElement>) => {
    const isOutside = ref(true)
    const  handler = (e: MouseEvent) => {
        if (elemenRef.value) {
            // 1、contains方法  2、e.target是一个事件目标，必须使用类型断言转变成 HTMLElement
            if (elemenRef.value.contains(e.target as HTMLElement)) {
                isOutside.value = false
            } else {
                isOutside.value = true
            }
        }
    }
    // 挂载的时候将事件绑定到全局， 解除挂载的时候也要解绑
    onMounted(() => {
        document.addEventListener('click', handler)
    })
    onUnmounted(() => {
        document.removeEventListener('click', handler)
    })
    return isOutside
}

export default isClickOutside
