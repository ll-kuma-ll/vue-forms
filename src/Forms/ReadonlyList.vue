<script setup lang="ts">
import { computed } from 'vue';
import FormInputText from './FormInputText.vue';

/*
 |-----------------------------------------------------------
 |    読み取り専用プレーンテキスト表示コンポーネント
 |-----------------------------------------------------------
 */
interface Props {
    modelValue: string | number | string[] | number[] | null
    choices: {
        value: string | number | null
        label: string
    }[]
    inline?: boolean
}
const props = withDefaults(defineProps<Props>(), {
    inline: true,
})

/** 複数選択項目か判定フラグ */
const isMultiple = computed(() => Array.isArray(props.modelValue))

/** 表示値 */
const value = computed(() => {
    const value = isMultiple.value
        ? props.choices
            .filter(choice => (props.modelValue as string[] | number[]).indexOf(choice.value as never) >= 0)
            .map(choice => choice.label)
        : props.choices.find(choice => choice.value == props.modelValue)?.label

    return value !== undefined ? value : null
})

/** 一覧クラス属性値 */
const attrClassList = computed(() => ({
    'list-inline': props.inline,
}))

/** 一覧アイテムクラス属性値 */
const attrClassListItem = computed(() => ({
    'list-inline-item': props.inline,
}))
</script>

<template>
    <ul v-if="isMultiple" :class="attrClassList" data-testid="readonly-list">
        <li v-for="(label, idx) in value" :key="idx" :class="attrClassListItem">{{ label }}</li>
    </ul>
    <FormInputText v-else :model-value="(value as string)" :readonly="true" :plaintext="true"/>
</template>