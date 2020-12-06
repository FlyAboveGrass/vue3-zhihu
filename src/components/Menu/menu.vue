<template>
  <div class="dropdown" ref="dropdown">
    <button @click="showMenuItem()" class="btn btn-outline-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      {{title}}
    </button>
    <ul class="dropdown-menu" :class="{ 'show': !dropItemVisible }" aria-labelledby="dropdownMenuButton">
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, onMounted, ref, watch } from 'vue'
  import isClickOutside from '@/hooks/isClickOutside'
  export default defineComponent({
    name: 'menu',
    props: {
      title: {
        type: String,
        required: true
      }
    },
    setup () {
      const dropItemVisible = ref(false)
      // 名称定义好之后返回给外部，外部在使用的时候绑定会将ref编程外部的ref
      const dropdown = ref<null | HTMLElement>(null)
      const showMenuItem = () => {
        dropItemVisible.value = !dropItemVisible.value
      } 

      // 类似闭包的用法，是否外部点击的事件是在hooks中的isClickOutside中绑定的，然后将值返回出来给外部使用，
      // 外部就可以直接监听到这个值，并且不用理会方法的实现
      const toggleMenuItem = isClickOutside(dropdown)

      // watch只能检测值的变化，不变化的时候不会触发。但是应该每一个点击都要向外发出一个是否是外部点击的值，不管有没有变化
      watch(toggleMenuItem, () => {
        console.log('dfkhaskldjfhlksadjfh', toggleMenuItem);
        dropItemVisible.value =  toggleMenuItem.value
      })

      return {
        dropItemVisible,
        dropdown,
        showMenuItem,
        toggleMenuItem
      }
    }
  })
</script>

<style scoped>
  .dropdown-menu{
    min-width: 5rem;
  }
  .btn-outline-primary {
    color: #fff;
    border-color: #fff;
  }
</style>
