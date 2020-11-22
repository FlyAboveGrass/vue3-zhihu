<template>
  <li class="dropdown-option" :class="{'disabled': disabled}">
    <slot></slot>
  </li>
</template>

<script>
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'dropdownItem',
    props: {
      disabled: {
        type: Boolean,
        default: false
      }
    }
  })
</script>

<style scoped>
</style>
