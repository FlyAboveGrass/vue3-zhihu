<template>
    <div class="container">
        <div class="column-header my-4 row">
            <div class="col-4">
                <img class="rounded-circle rounded-circle border border-light w-25 mt-3 mb-2" :src="currentUser.avatar && currentUser.avatar.url">
            </div>
            <div class="col-8">
                <h4>{{userInfo.name}}</h4>
                <p>11111111111</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import {useStore} from 'vuex'
export default defineComponent ({
    props: {
    },
    setup() {
        const store = useStore()
        const route = useRoute()
        const page = {
            currentPage: 1,
            pageSize: 5
        }
        console.log('file: column-detail.vue ~ line 25 ~ setup ~ route', route);
        const userInfo = computed(() => store.state.userInfo)
        const currentUser = store.state.columnList.find((item: any) => item._id === route.params.id)
        console.log('store.state.columnList', store.state.columnList)
        console.log('file: column-detail.vue ~ line 32 ~ setup ~ currentUser', currentUser);

        const articleList = computed(() => store.state.columnDetail)
        onBeforeMount(() => {
            store.dispatch('getArticleList', {
                columnId: route.params.id,
                currentPage: page.currentPage,
                pageSize: page.pageSize
            })
        })
        return {
            userInfo,
            currentUser,
            articleList
        }
    }
})
</script>

<style scoped lang="less">

</style>
