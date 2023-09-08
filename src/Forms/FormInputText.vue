<script setup lang="ts">
import { computed } from 'vue'

/*
 |-------------------------------------
 |    1行文字列入力コンポーネント
 |-------------------------------------
 */
interface Props {
    modelValue: string | number | null
    type?: 'color' | 'date' | 'datetime-local' | 'email' | 'month' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url' | 'week'
    placeholder?: string
    disabled?: boolean
    invalid?: string
    readonly?: boolean
    plaintext?: boolean
}
const props = withDefaults(defineProps<Props>(), {
    type: 'text',
    disabled: false,
    readonly: false,
    plaintext: false,
})
const emit = defineEmits<{
    (e: 'update:modelValue', value: string | number | null): void
}>()

/** 入力値 */
const value = computed({
    get: () => props.modelValue,
    set: (value) => {
        emit('update:modelValue', value)
    }
})

/** クラス属性値 */
const attrClass = computed(() => ({
    'form-control': !(props.plaintext && props.readonly),
    'form-control-plaintext': props.plaintext && props.readonly,
    'form-control-color': props.type == 'color',
    'is-invalid': typeof props.invalid == 'string' && props.invalid.length > 0,
}))
</script>

<template>
    <input
        v-model="value"
        :type="type"
        :class="attrClass"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        data-testid="form-input-text"
    >
</template>