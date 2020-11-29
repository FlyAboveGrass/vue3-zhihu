<template>
    <div class="row mx-5">
      <div class="col-4 px-4 py-4" v-for="item of columnList" :key="item._id">
        <div class="card shadow-sm">
          <div class="card-body">
            <img class="rounded-circle rounded-circle border border-light w-25 mt-3 mb-2" :src="item.avatar.url" alt="">
            <h2 class="row-1 description">{{item.title}}</h2>
            <p class="description">{{item.description}}</p>
            <router-link :to="`/column/${item._id}`" class="btn btn-primary">进入专栏</router-link>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import  { IColumnProps } from '@/interface/column.ts'

export default defineComponent({
    name: 'ColumnList',
    props: {
        list: {
            type: Array as PropType<IColumnProps[]>, // type: Array<IColumnProps>,
            required: true
        }
    },
    setup (props) {
      const columnList =  computed(() => {
        console.log('props.list', props.list)
        return props.list.map((item) => {
          if (!item.avatar) {
            item.avatar = {
              url: require('@/assets/imgs/avatar.jpg')
            }
          }
          return item
        })
      })
      return {
        columnList
      }
    }
})
</script>

<style scoped lang="less">
  .description {
    height: 4em;
    line-height: 2em;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; // （行数）
    -webkit-box-orient: vertical;
  }
  .row-1{
    height: auto;
    -webkit-line-clamp: 1; // （行数）
  }
</style>
