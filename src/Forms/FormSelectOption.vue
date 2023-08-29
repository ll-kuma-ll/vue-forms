<script setup lang="ts">
import { computed } from 'vue'

/*
 |-----------------------------------------
 |    プルダウン選択入力コンポーネント
 |-----------------------------------------
 */
interface Props {
    modelValue: string | number | string[] | number[] | null
    choices: { value: number | string | null, label: string }[]
    disabled?: boolean
    invalid?: string
}
const props = withDefaults(defineProps<Props>(), {
    disabled: false,
})
const emit = defineEmits<{
    (e: 'update:modelValue', value): void
}>()

/** 入力値 */
const value = computed({
    get: () => props.modelValue,
    set: (value) => {
        emit('update:modelValue', value)
    },
})

/** 複数選択フラグ */
const multiple = computed(() => Array.isArray(props.modelValue))

/** 選択フォームクラス属性値 */
const attrClassSelect = computed(() => ({
    'form-control': true,
    'is-invalid': !!props.invalid,
}))
</script>

<template>
    <select
        v-model="value"
        :multiple="multiple"
        :class="attrClassSelect"
        :disabled="disabled"
        data-testid="form-select"
    >
        <option v-for="(choice, idx) in choices" :key="idx" :value="choice.value">
            {{ choice.label }}
        </option>
    </select>
</template>