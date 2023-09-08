<script setup lang="ts">
import { computed } from 'vue';
import FormInputCheck from '../Forms/FormInputCheck.vue';
import SlotLayoutForm from '../Slots/SlotLayoutForm.vue';

/*
 |------------------------------------------------------
 |    ラジオ・チェックボックス入力欄コンポーネント
 |------------------------------------------------------
 */
interface Choice {
    value: number | string | null
    label: string
    id?: string
}
interface Props {
    modelValue: string | number | string[] | number[] | null
    choices: Choice[]
    label: string
    disabled?: boolean
    invalid?: string
    inline?: boolean
    required?: boolean
    text?: string
    horizontal?: { label: number, input: number }
    readonly?: boolean
    plaintext?: boolean
}
const props = withDefaults(defineProps<Props>(), {
    disabled: false,
    inline: true,
    required: false,
})
const emit = defineEmits<{
    (e: 'update:modelValue', value): void
}>()

/** 入力値 */
const value = computed({
    get: () => props.modelValue,
    set: (value) => {
        emit('update:modelValue', value)
    }
})
</script>

<template>
    <SlotLayoutForm :required="required" :invalid="invalid" :text="text" :horizontal="horizontal">
        <template #label>{{ label }}</template>
        <FormInputCheck
            v-model="value"
            :choices="choices"
            :disabled="disabled"
            :invalid="invalid"
            :inline="inline"
            :readonly="readonly"
            :plaintext="plaintext"
        />
    </SlotLayoutForm>
</template>