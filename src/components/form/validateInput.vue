<template>
    <div class="form-group mb-4 row">
        <label class="col-sm-3 col-form-label text-left text-indent-1">{{label}}:</label>
        <!-- 外部传入的属性将通过 $attrs 默认的传递到input -->
        <div :class="labelPosition === 'left' ? 'col-sm-9' : 'col-sm-12'">
            <input v-if="type !== 'textarea'" :type="type" v-bind="$attrs" class="form-control" :class="[inputRef.error ? 'is-invalid' : '']" v-model="inputRef.value" @blur="validateInput">
            <textarea v-if="type == 'textarea'" :type="type" v-bind="$attrs" class="form-control" :class="[inputRef.error ? 'is-invalid' : '']" v-model="inputRef.value" @blur="validateInput" />
            <div v-if="inputRef.error" class="invalid-feedback">{{inputRef.message}}</div>
        </div>
    </div>
</template>

<script lang="ts">
import { reactive, defineComponent, PropType, onMounted, computed } from 'vue'
import {emitter, validateFunc} from './validate-form.vue'
import { RuleProp } from '@/interface/form'

const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-z0-9_-]+(\.[a-zA-Z0-9-_]+)+$/

export default defineComponent ({
    data () {
        return {
        }
    },
    inheritAttrs: false, // 从父组件获取的attr将不会默认绑定到这个组件的根元素
    props: {
        type: {
            requied: false,
            type: String,
            default: 'text'
        },
        label: {
            requied: true,
            type: String
        },
        modelValue: {
            requied: true,
            type: String
        },
        labelPosition: {
            type: String as PropType<'top' | 'left'>,
            required: false,
            default: 'left'
        },
        rules: Array as PropType<RuleProp[]>
    },
    setup (props, context) {
        const inputRef = reactive({
            value: computed({
                get: () => props.modelValue || '', 
                set: val => {
                    context.emit('update:modelValue', val)
                }
            }),
            error: false,
            message: ''
        })
        const validateInput: validateFunc = () => {
            if (!props.rules) {
                return true
            }
            const Access = props.rules.every((rule) => {  // 是否验证成功
                let validate = true
                switch (rule.type) {
                    case 'required':
                        validate = inputRef.value.trim() !== ''
                        break
                    case 'email':
                        validate = emailReg.test(inputRef.value)
                        break
                    case 'custom':
                        validate = rule.validator ? rule.validator() : false
                }
                if (!validate) {
                    inputRef.message = rule.message
                }
                return validate
            })
            inputRef.error = !Access
            return Access
        }
        onMounted(() => {
            emitter.emit('input-ready', validateInput)
        })
        return {
            inputRef,
            validateInput
        }
    }
})
</script>

<style scoped lang="less">
.text-indent-1 {
    text-indent: 1em;
}
.invalid-feedback{
    display: block;
    text-align: left;
}
</style>
