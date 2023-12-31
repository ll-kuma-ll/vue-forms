<script setup lang="ts">
import { computed } from 'vue'
import { v4 as uuid } from 'uuid'
import ReadonlyList from './ReadonlyList.vue';

/*
 |-------------------------------------------------
 | ラジオ・チェックボックス入力コンポーネント
 |-------------------------------------------------
 */
interface Choice {
    value: number | string | null
    label: string
    id?: string
}
interface Props {
    modelValue: string | number | string[] | number[] | null
    choices: Choice[]
    disabled?: boolean
    invalid?: string
    inline?: boolean
    readonly?: boolean
    plaintext?: boolean
}
const props = withDefaults(defineProps<Props>(), {
    disabled: false,
    inline: true,
    readonly: false,
    plaintext: false
})
const emit = defineEmits<{
    (e: 'update:modelValue', value: string | number | string[] | number[] | null): void
}>()

/** 入力値 */
const value = computed({
    get: () => props.modelValue,
    set: (value) => {
        emit('update:modelValue', value)
    }
})

/** input type属性値 */
const attrType = computed(() => Array.isArray(props.modelValue) ? 'checkbox' : 'radio')

/** inputクラス属性値 */
const attrClassInput = computed(() => ({
    'form-check-input': true,
    'is-invalid': !!props.invalid,
}))

/** レイアウトクラス属性値 */
const attrClassLayout = computed(() => ({
    'form-check': true,
    'form-check-inline': props.inline,
}))

/** ID生成 */
const ids = computed(
    () => props.choices.map(
        (choice: Choice) => choice.id ?? uuid()
    )
)
</script>

<template>
    <template v-if="!(readonly && plaintext)">
        <div v-for="(choice, idx) in choices" :key="idx" :class="attrClassLayout" data-testid="form-input-check">
            <input v-model="value" :type="attrType" :value="choice.value" :class="attrClassInput" :disabled="disabled" :readonly="readonly" :id="ids[idx]">
            <label class="form-check-label" :for="ids[idx]">{{ choice.label }}</label>
        </div>
    </template>
    <ReadonlyList :model-value="modelValue" :choices="choices" :inline="inline" />
</template>