<template>
  <div class="header">
    <global-header></global-header>
  </div>
  <div class="content">
    <router-view></router-view>
  </div>
  <div class="footer">
    <v-footer></v-footer>
  </div>

  <v-spinner :isLoading="isLoading"></v-spinner>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue'
import './assets/css/reset.css' // 引入reset.css初始化样式
import 'bootstrap/dist/css/bootstrap.css' // 引入bootstrap样式
import GlobalHeader from '@/components/GlobalHeader.vue'
import VFooter from '@/components/footer/footer.vue'
import VSpinner from '@/components/spinner/spinner.vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    VFooter,
    VSpinner
  },
  setup () {
    const store = useStore()

    const isLoading = computed(() => {
      return store.state.isLoading
    })
    
    return {
      isLoading
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

.header{
  height: 3.5rem;
}
.content{
  width: 100vw;
  min-height: calc(100vh - 9rem);
}
.footer{
  height: 4.5rem;
  margin-top: 1rem
}
</style>
