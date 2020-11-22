<template>
    <div class="row mx-5">
      <div class="col-4 px-5 py-4" v-for="item of columnList" :key="item._id">
        <div class="card">
          <div class="card-body">
            <img :src="item.avatar.url" alt="">
            <h2>{{item.title}}</h2>
            <p>{{item.description}}</p>
            <button class="btn btn-primary">进入专栏</button>
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
              url: require('@/assets/logo.png')
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

</style>
