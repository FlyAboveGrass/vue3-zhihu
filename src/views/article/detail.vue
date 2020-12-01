<template>
    <article class="container">
        <nav aria-label="breadcrumb" class="my-4">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><router-link tag="a" to="/" href="#" class="text-decoration-none">首页</router-link></li>
                <li class="breadcrumb-item"><a href="#" class="text-decoration-none">专栏文章</a></li>
                <li class="breadcrumb-item active" aria-current="page">a'a'a{{}}</li>
            </ol>
        </nav>
        <img :src="image" alt="" class="">
        <h1 class="my-3">{{detail && detail.title}}</h1>
        <div class="row py-2 border-bottom border-top">
            <div class="col-6 d-flex align-items-center user-info">
                <img :src="user.avatar.url" alt="" class="rounded-circle img-thumbnail mx-4">
                <div class="user text-left">
                    <h5>{{detail ? detail.author.nickName : ''}}</h5>
                    <p>{{detail? detail.author.description : ''}}</p>
                </div>
            </div>
            <span class="col-5 text-muted col text-right font-italic d-flex align-items-center justify-content-end">
                发表于： {{detail? detail.createdAt : ''}}
            </span>
        </div>
    </article>
</template>

<script lang="ts">
import store from '@/store/store'
import { getArticle } from '@/api/article'
import { IArticleDetail } from '@/interface/article'
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
export default defineComponent ({
    props: {
    },
    setup() {
        const route = useRoute()
        const detail = ref<IArticleDetail>()

        const user = computed(() => {
            if(!detail.value || !detail.value.image) {
                return {
                    avatar: {
                        url: ''
                    },
                    description: '',
                    nickName: ''
                }
            }
            return detail.value.author
        })
        const image = computed(() => {
            if(!detail.value || !detail.value.image) {
                return ''
            }
            return detail.value.image.url
        })

        onMounted(async () => {
            detail.value = await getArticle(route.params.id as string)
            console.log('file: detail.vue ~ line 30 ~ onMounted ~ detail.value', detail.value);
        })
        return {
            image,
            user,
            detail
        }
    }
})
</script>

<style scoped lang="less">
    .user-info{
        img {
            width: 80px;
            height: 80px;
        }
    }
</style>
