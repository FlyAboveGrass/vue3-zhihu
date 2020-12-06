<template>
    <div class="container-fluid px-10 py-10">
        <div class="add-article">
            <img :src="addArticlePng" alt="" srcset="">
            <h2>随心写作，自由表达</h2>
            <router-link tag="button" to="/create" class="btn btn-primary my-4">开始写文章</router-link>
        </div>

        <div class="column-list">
            <h4 class="font-weight-bold text-center mb-4">发现精彩</h4>
            <column-list :list="colList"></column-list>
            <button type="button" v-if="!loadAllCol" class="btn btn-primary my-3" @click="loadMore()">加载更多</button>
        </div>
        
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive } from 'vue'
import ColumnList from '@/components/ColumnList.vue'
import  { IColumnProps } from '@/interface/column.ts'
import store from '@/store/store'
import { useStore } from 'vuex'
import { PageProps } from '@/interface'
export default defineComponent ({
    props: {
    },
    components: {
        ColumnList
    },
    setup() {
        const store = useStore()
        const addArticlePng = require('@/assets/imgs/write.svg')

        const page: PageProps = {
            currentPage: 1,
            pageSize: 5
        }
        const colList = computed(() => store.state.columnList)
        const loadAllCol = computed(() => {
            return store.state.columnLength === colList.value.length
        })

        const loadMore = () => {
            page.currentPage ++;
            store.dispatch('loadMoreColumn', page)
        }

        onMounted(() => {
            store.dispatch('getColumnList', page)
        })
        return {
            addArticlePng,
            colList,
            loadMore,
            loadAllCol
        }
    }
})
</script>

<style scoped lang="less">
    .add-article {
        width: 50vw;
        margin: 0px auto;
        padding: 60px 0;
        img{
            width: 50%;
            margin: 25px auto;
        }
    }
    .column-list {
        .font-weight-bold {
            font-weight: 700;
        }
    }
</style>
