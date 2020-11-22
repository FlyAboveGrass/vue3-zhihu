<template>
  <div class="dropdown">
    <button @click="showMenuItem()" class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      {{title}}
    </button>
    <ul class="dropdown-menu" :class="{ 'show': dropItemVisible }" aria-labelledby="dropdownMenuButton">
      <slot></slot>
    </ul>
  </div>
</template>

<script>
  import { defineComponent, ref } from 'vue'
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
      const showMenuItem = () => {
        dropItemVisible.value = !dropItemVisible.value
      }
      return {
        dropItemVisible,
        showMenuItem
      }
    }
  })
</script>

<style scoped>
  .dropdown-menu{
    min-width: 5rem;
  }
</style>
