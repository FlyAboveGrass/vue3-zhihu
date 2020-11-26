<template>
    <div class="container-fluid px-10 py-10">
        <column-list :list="list"></column-list>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ColumnList from '@/components/ColumnList.vue'
import  { IColumnProps } from '@/interface/column.ts'
export default defineComponent ({
    props: {
    },
    components: {
        ColumnList
    },
    setup() {
        const list: Array<IColumnProps> = [
            { _id: '1', title: 'aaa', description: 'delights' },
            { _id: '2', title: 'aaa', description: 'delights' },
            { _id: '3', title: 'aaa', description: 'delights' },
            { _id: '4', title: 'aaa', description: 'delights' }
        ]
        return {
            list
        }
    }
})
</script>

<style scoped lang="less">

</style>
