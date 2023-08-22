<script setup lang="ts">
import { computed } from 'vue';

/*
 |---------------------------------------
 |    複数行文字列入力コンポーネント
 |---------------------------------------
 */
interface Props {
    modelValue: string | null
    placeholder?: string
    disabled?: boolean
    invalid?: string
}
const props = withDefaults(defineProps<Props>(), {
    disabled: false,
})
const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
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
    'form-control': true,
    'is-invalid': typeof props.invalid == 'string' && props.invalid.length > 0,
}))
</script>

<template>
    <textarea
        v-model="value"
        :class="attrClass"
        :placeholder="placeholder"
        :disabled="disabled"
        data-testid="form-textarea"
    ></textarea>
</template>