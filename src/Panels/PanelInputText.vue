<script setup lang="ts">
import { computed } from 'vue';
import SlotLayoutForm from '../Slots/SlotLayoutForm.vue'
import FormInputText from '../Forms/FormInputText.vue'

/*
 |-------------------------------------
 |    1行文字列入力欄コンポーネント
 |-------------------------------------
 */
interface Props {
    label: string
    modelValue: string | number | null
    type?: 'color' | 'date' | 'datetime-local' | 'email' | 'month' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url' | 'week'
    placeholder?: string
    disabled?: boolean
    size?: -1 | 0 | 1
    required?: boolean
    invalid?: string
    text?: string
    horizontal?: { label: number, input: number }
    readonly?: boolean
    plaintext?: boolean
}
const props = defineProps<Props>()
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
</script>

<template>
    <SlotLayoutForm :required="required" :invalid="invalid" :text="text" :horizontal="horizontal">
        <template #label>{{ label }}</template>
        <FormInputText
            v-model="value"
            :type="type"
            :placeholder="placeholder"
            :disabled="disabled"
            :size="size"
            :invalid="invalid"
            :readonly="readonly"
            :plaintext="plaintext"
        />
    </SlotLayoutForm>
</template>