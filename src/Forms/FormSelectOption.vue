<script setup lang="ts">
import { computed } from 'vue'
import ReadonlyList from './ReadonlyList.vue';

/*
 |-----------------------------------------
 |    プルダウン選択入力コンポーネント
 |-----------------------------------------
 */
interface Props {
    modelValue: string | number | string[] | number[] | null
    choices: { value: number | string | null, label: string }[]
    disabled?: boolean
    size?: -1 | 0 | 1
    invalid?: string
    readonly?: boolean
    plaintext?: boolean
}
const props = withDefaults(defineProps<Props>(), {
    disabled: false,
    readonly: false,
    plaintext: false,
})
const emit = defineEmits<{
    (e: 'update:modelValue', value: string | number | string[] | number[] | null): void
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
    'form-control-sm': props.size == -1,
    'form-control-lg': props.size == 1,
    'is-invalid': !!props.invalid,
}))
</script>

<template>
    <select
        v-if="!(readonly && plaintext)"
        v-model="value"
        :multiple="multiple"
        :class="attrClassSelect"
        :disabled="disabled"
        :aria-readonly="readonly"
        data-testid="form-select"
    >
        <option v-for="(choice, idx) in choices" :key="idx" :value="choice.value">
            {{ choice.label }}
        </option>
    </select>
    <ReadonlyList v-else :model-value="modelValue" :choices="choices" />
</template>