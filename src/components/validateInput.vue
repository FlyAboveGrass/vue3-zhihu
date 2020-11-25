<template>
    <div class="form-group">
        <label>{{label}}</label>
        <input :type="type" :placeholder="placeholder" class="form-control" :class="[inputRef.error ? 'is-invalid' : 'is-valid']" v-model="inputRef.value" @blur="validateInput">
        <div v-if="inputRef.error" class="invalid-feedback">{{inputRef.message}}</div>
    </div>
</template>

<script lang="ts">
import { reactive, defineComponent, PropType } from 'vue'

const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-z0-9_-]+(\.[a-zA-Z0-9-_]+)+$/
export interface RuleProp {
    type: 'required' | 'email' | 'number';
    message: string;
}
export default defineComponent ({
    data () {
        return {
        }
    },
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
            requied: false,
            type: String,
            default: ''
        },
        placeholder: {
            requied: false,
            type: String
        },
        rules: Array as PropType<RuleProp[]>
    },
    methods: {

    },
    setup (props) {
        const inputRef = reactive({
            value: props.modelValue,
            error: false,
            message: ''
        })
        const validateInput = () => {
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
                }
                if (!validate) {
                    inputRef.message = rule.message
                }
                return validate
            })
            inputRef.error = !Access
            console.log('error ,message', inputRef.error, inputRef.message)
            return Access
        }
        return {
            inputRef,
            validateInput
        }
    }
})
</script>

<style scoped lang="less">

</style>
