<template>
    <div class="container w-75 mx-auto">
        <div class="column-header py-4 row border-bottom">
            <div class="col-3">
                <img class="rounded-circle rounded-circle border border-light w-50" :src="currentUser && currentUser.avatar && currentUser.avatar.url">
            </div>
            <div class="col-9">
                <h2 class="pt-2">{{currentUser && currentUser.title}}</h2>
                <p class="text-muted">{{currentUser && currentUser.description}}</p>
            </div>
        </div>
        <article v-for="item of articleList" :key="item._id" class="card mt-4 shadow-sm text-left">
            <div class="card-body">
                <h4 class="my-3">
                    <router-link :to="`/article/detail/${item._id}`">{{ item.title }}</router-link>
                </h4>
                <div class="row my-3 align-items-center">
                    <div v-if="item.image" class="col-4 article-img align-items-center">
                        <img :src="item.image.url" :alt="item.title" class="rounded-lg" />
                    </div>
                    <p :class="['text-muted', item.image ? 'col-8' : '']">{{ item.excerpt }}</p>
                </div>
                <div class="text-muted">{{ item.createdAt }}</div>
            </div>
        </article>
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
        const userInfo = computed(() => store.state.userInfo)
        const currentUser = store.state.columnList.find((item: any) => item._id === route.params.id)

        const articleList = computed(() => store.state.columnDetail)
        onBeforeMount(() => {
            store.dispatch('getArticleList', {
                column: route.params.id,
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
.text-left{
    text-align: left;
    a{
        text-decoration: none;
        color: black;
        &:hover{
            color: rgb(13,158,254);
        }
    }
}
.article-img{
    height: 8em;
    overflow: hidden;
    img {
        max-width: 100%;
        max-height: 100%;
    }
}
</style>
