<template>
    <div class="create">
            <h4 class="py-5">写文章</h4>

            <form>
                <div class="form-group row py-4">
                    <label class="col-sm-1 col-form-label">标题:</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" placeholder="请输入文章标题">
                    </div>
                    <div class="col-sm-2 offset-sm-1">
                        <button class="btn btn-primary px-4">发表</button>
                    </div>
                </div>
                <div class="form-group row py-4">
                    <h4 class="py-3">文章内容:</h4>
                    <textarea rows="10" class="form-control" aria-describedby="emailHelp"></textarea>
                </div>
            </form>
    </div>
</template>

<script lang="div.titlts">
import { defineComponent } from 'vue'
export default defineComponent ({
    props: {
    },
    components: {
        
    },
    setup() {
        return {
            
        }
    }
})
</script>

<style scoped lang="less">
    .create{
        width: 85%;
        margin: 0px auto;
    }
</style>
