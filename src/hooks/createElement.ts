import { onUnmounted } from 'vue';

export default function createElement(tag: string, id?: string, appendTo?: HTMLElement){
    const node = document.createElement(tag);
    node.id = id || (new Date).toLocaleString();
    (appendTo || document.body).appendChild(node);

    onUnmounted(() => {
        (appendTo || document.body).removeChild(node);
    })
}